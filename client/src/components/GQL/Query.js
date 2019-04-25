import gql from 'graphql-tag';

const GET_ALL_TODOES = gql`
  {
    readAllToDoes {
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

const GET_ALL_TODOES_SHARED_WITH_ME = gql`
  {
    readAllToDoesSharedWithMe {
      id
      title
      description
      isDone
      user {
        id
        email
      }
    }
  }
`;

const GET_ALL_USERS_EXCEPT_ME = gql`
  {
    readAllUsersExceptMe {
      id
      name
      email
    }
  }
`;

export {
  GET_ALL_TODOES,
  GET_ALL_USERS_EXCEPT_ME,
  GET_ALL_TODOES_SHARED_WITH_ME
};
