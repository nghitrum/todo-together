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
    }
  }
`;

export { GET_ALL_TODOES };