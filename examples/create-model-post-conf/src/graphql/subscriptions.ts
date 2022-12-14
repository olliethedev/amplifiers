/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($id: String) {
    onCreateUser(id: $id) {
      id
      firstName
      lastName
      email
      todos {
        items {
          id
          name
          description
          owner
          createdAt
          updatedAt
          userTodosId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($id: String) {
    onUpdateUser(id: $id) {
      id
      firstName
      lastName
      email
      todos {
        items {
          id
          name
          description
          owner
          createdAt
          updatedAt
          userTodosId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($id: String) {
    onDeleteUser(id: $id) {
      id
      firstName
      lastName
      email
      todos {
        items {
          id
          name
          description
          owner
          createdAt
          updatedAt
          userTodosId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String) {
    onCreateTodo(owner: $owner) {
      id
      name
      description
      owner
      user {
        id
        firstName
        lastName
        email
        todos {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userTodosId
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String) {
    onUpdateTodo(owner: $owner) {
      id
      name
      description
      owner
      user {
        id
        firstName
        lastName
        email
        todos {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userTodosId
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String) {
    onDeleteTodo(owner: $owner) {
      id
      name
      description
      owner
      user {
        id
        firstName
        lastName
        email
        todos {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      userTodosId
    }
  }
`;
