import React, { useEffect, useState } from "react";
import { Amplify, Storage, API } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import { getS3Key, getUrlForImage, uploadFileToBucket } from "./utils";

import "@aws-amplify/ui-react/styles.css";
import "./App.css";

Amplify.configure(awsconfig);

function App() {
  const [file, setFile] = useState(null);
  const [newProduct, setNewProduct] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const fileInputListener = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  // uploads image to S3 bucket and creates a new product model
  const saveProduct = () => {
    const call = async () => {
      if (!file) {
        alert("Please select a file");
      } else {
        //upload image to S3 bucket and get the url
        const imageLocation = await uploadFileToBucket(file, "album", "public");
        console.log("imageLocation: ", imageLocation);
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
        console.log("newProduct: ", newProduct);
        if (newProduct.data.createProduct) {
          //update the state
          setNewProduct(newProduct.data.createProduct);
        } else {
          alert("Something went wrong. Please try again.");
        }
      }
    };
    call();
  };

  return (
    <div className="App">
      <Authenticator>
        {({ signOut, user }) => (
          <header className="App-header">
            <h5>1: Pick image:</h5>
            {file && (
              <img
                width={250}
                src={file ? URL.createObjectURL(file) : null}
                alt="preview"
              />
            )}
            <input type="file" accept="image/*" onChange={fileInputListener} />

            {file && (<>
              <h5>2: Upload to bucket and update model:</h5>
              <button onClick={saveProduct}>Upload</button>
            </>)}

            {newProduct && (
              <>
                <h5>3: Load Results</h5>
                <button onClick={() => setRefresh(refresh + 1)}>Refresh</button>
                <div>Thumbnail:</div>
                <S3Image
                  src={getUrlForImage(newProduct.image, "resize", "thumbnail")}
                  alt={`preview thumb ${refresh}`}
                  refresh={refresh}
                />
                <br />
                <div>Medium:</div>
                <S3Image
                  src={getUrlForImage(newProduct.image, "resize", "medium")}
                  alt={`preview medium ${refresh}`}
                  refresh={refresh}
                />
                <br />
                <div>Original:</div>
                <S3Image src={newProduct.image} alt="preview original" />
                <br />
              </>
            )}
          </header>
        )}
      </Authenticator>
    </div>
  );
}

const S3Image = ({ src, refresh, ...props }) => {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    const call = async () => {
      console.log("src: ", src);
      const imageKey = await getS3Key(src, "public");
      const url = await Storage.get(imageKey);
      console.log("url: ", url);
      setUrl(url);
    };
    call();
  }, [src, refresh]);
  return <img src={url} {...props} alt={props.alt} />;
};

export default App;
