import { Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

const ALLOWED_IMAGE_FORMATS = ["png", "jpeg", "jpg", "webp", "tiff", "tif"];

export const uploadFileToBucket = async (file, path, type) => {
  const fileExtension = getFileExtension(file.name).toLowerCase();
  if (!isValidImage(file.name)) {
    throw new Error("Invalid image format");
  } else {
    const fileNameFinal = `${uuidv4()}.${fileExtension}`;
    const fullPath = `${path}/${fileNameFinal}`;
    const bucketResp = await Storage.put(fullPath, file, {
      level: type,
    });
    return (await Storage.get(bucketResp.key, { level: type })).split("?")[0]; // split returns only the first part of the url, omitting the signature part
  }
};

export const getS3Key = (url) => {
  const splitUrl = url.split("/").slice(4).join("/");
  console.log("splitUrl: ", splitUrl);
  return splitUrl;
};

export const isValidImage = (fileName) => {
  const fileExtension = getFileExtension(fileName);
  return ALLOWED_IMAGE_FORMATS.includes(fileExtension);
};

export const getFileExtension = (fileName) => {
  return fileName.slice(
    (Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1
  );
};

export const getUrlForImage = (url, type, name) => {
  const imageExtension = getFileExtension(url);
  return `${url}/${type}/${name}.${imageExtension}`;
};
