var aws = require("aws-sdk");
const sharp = require("sharp");

const s3 = new aws.S3({ apiVersion: "2006-03-01" });

/** @type {{ [sourceArn:string]: {fieldName:string; args:{ bucket: string; actions: [{ type:string; name:string; width:number; height:number;}] } } } | undefined} */
const tableDataMap = process.env.API_FIELD_DATA_MAP;

const ALLOWED_IMAGE_FORMATS = ["png", "jpeg", "jpg", "webp", "tiff", "tif"];
const LAMBDA_TIMEOUT = parseInt(process.env.LAMBDA_TIMEOUT) * 1000;
const BUCKET_DOMAIN = ".s3.us-east-1.amazonaws.com/";

const RENDER_CONFIG = {
  fit: sharp?.fit?.inside,
  kernel: sharp?.kernel?.cubic, //change this to change performance at the cost of quality
};

//lambda entry point
exports.handler = async (event, context) => {
  console.log("event: ", event);
  console.log("env: ", process.env);
  console.info(JSON.stringify(event, null, 4));

  try {
    await Promise.race([timeoutError(LAMBDA_TIMEOUT), processEvent(event)]);
    console.log("Processed event.");
  } catch (ex) {
    console.log("error: ", ex);
    //todo: write timeout error to status.json
  }

  return event;
};

// processes every record in the db event
async function processEvent(event) {
  /** @type {{ [sourceArn:string]: {fieldName:string; args:{ bucket: string; actions: [{ type:string; name:string; width:number; height:number;}] } } } | undefined} */
  const parsedTableDataMap = JSON.parse(tableDataMap);
  for (const Record of event.Records) {
    const tableEventSource = Record.eventSourceARN.split("/stream/")[0]; //[1] is timestamp
    const tableData = parsedTableDataMap[tableEventSource];
    if (tableData) {
      await processRecord(Record, tableData);
    }
  }
}

//processes every action in the record
async function processRecord(Record, tableData) {
  const unmarshalledNew = aws.DynamoDB.Converter.unmarshall(
    Record.dynamodb.NewImage
  );
  const unmarshalledOld = aws.DynamoDB.Converter.unmarshall(
    Record.dynamodb.OldImage
  );

  const { fieldName, args } = tableData;
  const { bucket: destinationBucket, actions } = args;

  const sourceImageURL = unmarshalledNew[fieldName];

  //if the image url is the same, or missing, don't process
  if ((sourceImageURL === unmarshalledOld[fieldName]) || !sourceImageURL) {
    return;
  }

  const {
    key: sourceKey,
    imageName: sourceImageName,
    bucket: sourceBucket,
  } = getFileComponents(sourceImageURL);

  console.log("Processing file:", { sourceKey, sourceImageName, sourceBucket });
  const statusDestinationKey = `${sourceKey}/status.json`;
  console.log("statusDestinationKey: ", statusDestinationKey);
  await writeStatus(destinationBucket, statusDestinationKey, args, false);
  for (const action of actions) {
    await processAction(
      action,
      sourceBucket,
      sourceKey,
      sourceImageName,
      destinationBucket
    );
  }
  await writeStatus(destinationBucket, statusDestinationKey, args, true);
}

// tracks status of processing, and uploads processed images to s3
async function processAction(
  action,
  sourceBucket,
  sourceKey,
  sourceImageName,
  destinationBucket
) {
  const { type, name, width, height } = action;
  console.log(
    `Processing action ${type}, name: ${name}, w:${width}, h:${height}`
  );
  const timerTag = `Timing ${type} ${sourceImageName} to ${name}`;
  console.time(timerTag);
  const file = await getFile(sourceBucket, sourceKey);
  switch (type) {
    case "resize": {
      const resizedImage = await resize(file.Body, { width, height });
      console.log("Writing resized image...");
      const processedFileName = `${name}.${getExtension(sourceImageName)}`;
      const newDestinationKey = `${sourceKey}/${type}/${processedFileName}`; //ex: public/original.png/resize/thumbnail.png
      const writeResult = await writeImage(
        resizedImage,
        destinationBucket,
        newDestinationKey
      );
      console.timeEnd(timerTag);
      console.log("Write result: ", writeResult);
      break;
    }
    default: {
      console.timeEnd(timerTag);
      console.warn(`Action type ${type} not supported`);
    }
  }
}

// parses the url into bucket, key, and image name
function getFileComponents(url) {
  if (url.indexOf(BUCKET_DOMAIN) === -1) {
    throw new Error(`url:${url} is not valid`);
  }
  const key = decodeURIComponent(url.split("amazonaws.com/")[1]);
  const imageName = url.substring(url.lastIndexOf("/") + 1);
  const bucket = url.substring(
    url.indexOf("https://") + "https://".length,
    url.indexOf(BUCKET_DOMAIN)
  );
  return { key, imageName, bucket };
}

// downloads the file from s3
async function getFile(bucket, key) {
  console.log(`Getting file from bucket ${bucket} with key ${key}`);
  const params = {
    Bucket: bucket,
    Key: key,
  };
  return s3.getObject(params).promise();
}

// resizes the image using sharp
async function resize(buffer, size) {
  const { width, height } = size;
  const { format } = await sharp(buffer).metadata();
  if (!ALLOWED_IMAGE_FORMATS.includes(format)) {
    throw new Error("Unsupported image format");
  }

  const resizedImage = await sharp(buffer, {}).resize(
    width,
    height,
    RENDER_CONFIG
  );
  return resizedImage.toBuffer();
}

// uploads the image to s3
async function writeImage(imageBuffer, bucket, key) {
  console.log(`Writing image to bucket ${bucket} with key ${key}`);
  const destparams = {
    Bucket: bucket,
    Key: key,
    // ACL: "public-read",
    Body: imageBuffer,
    ContentType: "image/png",
  };

  return s3.putObject(destparams).promise();
}

// extracts file extension from image name, or returns full name
const getExtension = (filename) => {
  const parts = filename.split(".");
  return parts[parts.length - 1];
};

// writes the status of the processing to s3
async function writeStatus(bucket, key, payload, finished) {
  const destparams = {
    Bucket: bucket,
    Key: key,
    Body: JSON.stringify(
      {
        bucket: payload.bucket,
        time: new Date().toISOString(),
        timeStamp: new Date().getTime(),
        actions: payload.actions.map((action) => ({
          ...action,
          status: finished ? "success" : "pending",
        })),
      },
      null,
      2
    ),
    ContentType: "application/json",
  };

  return s3.putObject(destparams).promise();
}

// timeout promise that rejects after a certain amount of time
function timeoutError(timeLimit) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        reject(
          new Error(
            `Unable to complete process in time. Limit ${timeLimit} seconds.`
          )
        ),
      timeLimit
    );
  });
}
