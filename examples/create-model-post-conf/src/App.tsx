import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from "@aws-amplify/ui-react";
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Register to see User model created in the backend.
        </p>
        <Authenticator signUpAttributes={["birthdate", "email", "family_name", "given_name", "middle_name", "name", "nickname", "phone_number", "preferred_username", "profile", "website"]}>
            {({ signOut, user }) => (
              <div>
                <img src={logo} className="App-logo" alt="logo" />
                Todo: get USER model
              </div>
            )}
        </Authenticator>
      </header>
    </div>
  );
}

export default App;
