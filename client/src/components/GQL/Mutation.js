import gql from 'graphql-tag';

const AUTHENTICATE = gql`
  mutation authenticate($idToken: String!) {
    authenticate(idToken: $idToken) {
      id
      email
      name
    }
  }
`;

const ADD_TODO = gql`
  mutation addToDo($title: String!, $description: String) {
    createToDo(title: $title, description: $description) {
      id
      title
      description
      isDone
      user {
        id
        email
      }
      sharedWith {
        id
        email
      }
    }
  }
`;

const MARK_AS_DONE = gql`
  mutation markAsDone($id: ID!) {
    updateToDoDone(id: $id) {
      id
    }
  }
`;

const MARK_AS_UNDONE = gql`
  mutation markAsUnDone($id: ID!) {
    updateToDoUnDone(id: $id) {
      id
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteToDo($id: ID!) {
    deleteToDo(id: $id) {
      id
    }
  }
`;

const SHARE_TODO = gql`
  mutation shareToDo($todoId: ID!, $userId: ID!) {
    shareToDo(todoId: $todoId, userId: $userId) {
      id
      sharedWith {
        id
        email
      }
    }
  }
`;

export {
  AUTHENTICATE,
  ADD_TODO,
  MARK_AS_DONE,
  MARK_AS_UNDONE,
  DELETE_TODO,
  SHARE_TODO
};
