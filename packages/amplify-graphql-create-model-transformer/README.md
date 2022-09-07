# Create Model Transformer #

This directive is mainly intended to be used for creating a new user model on Cognito Post Confirmation event, significantly speeding up the development of your AWS Amplify projects. 

The `@createModel` GraphQL directive creates a new model on cognito trigger event (ex. Cognito Post Confirmation) initializing the model from the event's fields.

### Definition ###

```graphql
directive @createModel( trigger:String="postConfirmation", fieldMap: [FieldMap]) on OBJECT
input FieldMap {
    cognitoField: String!
    modelField: String!
}
```

## Installation ##

```bash
npm install --save @amplifiers/amplify-graphql-create-model-transformer
```

## Import ##
`/amplify/backend/api/<API_NAME>/transform.conf.json`
```json
{
  "transformers": [
    "@amplifiers/amplify-graphql-create-model-transformer"
  ]
}
```

## Usage ##
Mase sure your project has [authorization](https://docs.amplify.aws/cli/auth/overview/) added.

Append directive to target model and specify the trigger event and the field mapping.
Trigger is optional and the default value is `postConfirmation`.
The values are mapped from the cognito event field to the model fields. Custom fields are also supported ex: `{modelField:"age", cognitoField:'custom:age'}`.

```graphql
type User
  @model
  @auth(
    rules: [
      { allow: public, operations: [read] }
      { allow: owner, operations: [read, update], ownerField: "id" }
    ]
  )
  @createModel(
    fieldMap: [
      { modelField: "id", cognitoField: "sub" }
      { modelField: "firstName", cognitoField: "given_name" }
      { modelField: "lastName", cognitoField: "family_name" }
      { modelField: "email", cognitoField: "email" }
    ]
  ) {
  id: ID!
  firstName: String
  lastName: String
  email: AWSEmail
  todos: [Todo] @hasMany
}

type Todo
  @model
  @auth(rules: [{ allow: owner, ownerField: "owner" }])
  @createModel(
    fieldMap: [
      { modelField: "owner", cognitoField: "sub" }
      { modelField: "userTodosId", cognitoField: "sub" }
    ]
  ) {
  id: ID!
  name: String! @default(value: "My first Todo")
  description: String! @default(value: "Enter text here...")

  owner: String
  user: User @belongsTo
}
```

In the example above we create a new `User` and `Todo` models after user finishes the sign up flow in the front end. An important thing to note is that the User `id` field is also the record owner, and the value is set from the cognito `sub` field.  In this example our sign up page has extra attributes `signUpAttributes={["family_name", "given_name"]}` :

![alt text](/read-me-sign-up.png)

All possible cognito fields: `"username", "email", "phone_number", "birthdate", "email", "family_name", "given_name", "middle_name", "name", "nickname", "phone_number", "preferred_username", "profile", "website", "confirmation_code", "password", "confirm_password", "address", "gender", "locale", "picture", "updated_at", "zoneinfo"`


Deploy the project and test it with a new user.

NOTE: Right now you will need to manually link the lambda function to the cognito trigger event, by going to Cognito -> Manage User Pools -> Select the pool -> Triggers -> Post confirmation -> select `amplify-{shortpojectname}-CreateModelTransformer-{id}`

In the future we are looking to make this automatic.

![alt text](/read-me-trigger.png)

## Development ##
Dev docs are [here](https://github.com/olliethedev/amplifiers)