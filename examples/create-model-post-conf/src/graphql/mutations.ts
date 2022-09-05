/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      todos {
        items {
          id
          name
          description
          createdAt
          updatedAt
          userTodosId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      todos {
        items {
          id
          name
          description
          createdAt
          updatedAt
          userTodosId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      todos {
        items {
          id
          name
          description
          createdAt
          updatedAt
          userTodosId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
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
      owner
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
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
      owner
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
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
      owner
    }
  }
`;
