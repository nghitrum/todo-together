import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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

const MARK_AS_DONE = gql`
  mutation markAsDone($id: ID!) {
    updateToDoDone(id: $id) {
      id
    }
  }
`;

const List = () => (
  <Query query={GET_ALL_TODOES}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <h1>Here is your todoes</h1>
          <div className="list-group">
            {data.readAllToDoes.map(item => (
              <div
                key={item.id}
                className="list-group-item list-group-item-action mb-3 rounded"
              >
                <div className="row">
                  <div className="col-9">
                    <a
                      className="list-group-item-action"
                      data-toggle="collapse"
                      href={'#' + item.id}
                      role="button"
                      aria-expanded="false"
                      aria-controls={item.id}
                    >
                      {item.title}
                    </a>
                  </div>

                  <div className="col-3">
                    {!item.isDone && (
                      <Mutation
                        mutation={MARK_AS_DONE}
                        refetchQueries={[{ query: GET_ALL_TODOES }]}
                      >
                        {(updateToDoDone, { data }) => (
                          <button
                            type="button"
                            className="btn btn-success float-right"
                            onClick={e => {
                              e.preventDefault();
                              updateToDoDone({ variables: { id: item.id } });
                              console.log(data);
                            }}
                          >
                            Mark as done
                          </button>
                        )}
                      </Mutation>
                    )}
                    {item.isDone && (
                      <button
                        type="button"
                        className="close"
                        aria-label="Close"
                      >
                        <i className="fas fa-check" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="collapse mt-3" id={item.id}>
                  <div className="card card-body">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }}
  </Query>
);

export default List;
