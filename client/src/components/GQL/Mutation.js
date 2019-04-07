import gql from 'graphql-tag';

const ADD_TODO = gql`
  mutation addToDo($title: String!, $description: String) {
    createToDo(title: $title, description: $description) {
      id
      title
      description
      isDone
      label {
        id
        name
      }
      color {
        name
        colorCode
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

export { ADD_TODO, MARK_AS_DONE, MARK_AS_UNDONE, DELETE_TODO };
