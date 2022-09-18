# amplify-graphql-process-image-transformer #

## Description ##

Add image processing pipeline to your Amplify GraphQL API. For example resize a profile picture to a thumbnail size in order to improve your page load times.

## @processImage ##

This AWS Amplify directive allows you to process images that have been uploaded to your project's S3 bucket. The directive can only be used to resize images for now. The new image is create in the same S3 bucket, with the same key as the original image under a new folder with the name of the original image and new name and new dimensions (ex `<key>/resize/thumbnail.png`).

### Definition ###
```graphql
directive @processImage(bucket:String! actions:[AWSJSON!]! ) on FIELD_DEFINITION
```

## Installation ##

```bash
npm install --save @amplifiers/amplify-graphql-process-image-transformer
```

## Import ##
`/amplify/backend/api/<API_NAME>/transform.conf.json`
```json
{
  "transformers": [
    "@amplifiers/amplify-graphql-process-image-transformer"
  ]
}
```

## Usage ##

Append the `@processImage` directive to a field in your GraphQL schema. The `@processImage` directive takes a `bucket` string and `actions` array.

`bucket` field specifies the S3 bucket where the images are stored.

`actions` field specifies the actions to be performed on the image. The actions are defined as an array of objects. Each object has the following fields:
- `type` is the type of action to be performed. Currently only `resize` is supported. The images will be resized to fit inside the dimensions specified in the `width` and `height` fields.
- `width` is the width of the image in pixels.
- `height` is the height of the image in pixels.
- `name` is the name of the transformed image. Can be any string. ex: thumbnail, small, medium, etc

The field must be of type `AWSURL`. And supported image extensions are `["png", "jpeg", "jpg", "webp", "tiff", "tif"]`.

## Example: ##
First define the model in your schema:

```graphql
type Product @model {
  id: ID!
  name: String!
  description: String
  image: AWSURL!
    @processImage(
      bucket: "<your_bucket>"
      actions: [
        { type: "resize", name: "thumbnail", width: 100, height: 100 }
        { type: "resize", name: "medium", width: 500, height: 500 }
      ]
    )
}
```
Next upload the image and update the model with the image url. 
```js
    //upload image to S3 bucket and get the url
    const imageLocation = await uploadFileToBucket(file, "album", "public");
    // create a new product model
    const newProduct = await API.graphql({
        query: mutations.createProduct,
        variables: {
            input: {
                name: "test",
                description: "test",
                image: imageLocation,
            },
        },
    });
```

And once the images are processed, they will be available from the following urls:

Original:
`https://<your_bucket>.s3.amazonaws.com/public/album/c1170aeb-2235-475d-9795-541fb6e3a9a1.jpeg`

Thumbnail:
`https://<your_bucket>.s3.amazonaws.com/public/album/c1170aeb-2235-475d-9795-541fb6e3a9a1.jpeg/resize/thumbnail.jpeg`

Medium:
`https://<your_bucket>.s3.amazonaws.com/public/album/c1170aeb-2235-475d-9795-541fb6e3a9a1.jpeg/resize/medium.jpeg`

For full example see the [example](https://github.com/olliethedev/amplifiers/tree/master/examples/process-image-example) folder.

## Architecture ##

![alt text](https://github.com/olliethedev/amplifiers/blob/master/read-me-image-processing-diagram.png)

## Development and Contributions ##
Contributions are more than welcome! Please feel free to open an issue or a pull request.
Developer docs are [here](https://github.com/olliethedev/amplifiers)

## License ##
[MIT License](https://github.com/olliethedev/amplifiers/blob/master/LICENSE)