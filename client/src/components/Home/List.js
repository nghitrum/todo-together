import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { GET_ALL_TODOES } from '../GQL/Query';
import { MARK_AS_DONE, MARK_AS_UNDONE, DELETE_TODO } from '../GQL/Mutation';

const List = () => (
  <Query query={GET_ALL_TODOES}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <div className="list-group">
            {data.readAllToDoes.map(item => (
              <div
                key={item.id}
                className="list-group-item list-group-item-action p-3 mb-3 rounded"
              >
                <div className="row">
                  <div className="col">
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

                  <div className="col">
                    <Mutation
                      mutation={DELETE_TODO}
                      update={(cache, { data: { deleteToDo } }) => {
                        const { readAllToDoes } = cache.readQuery({
                          query: GET_ALL_TODOES
                        });

                        let objIndex = readAllToDoes.findIndex(
                          obj => obj.id == deleteToDo.id
                        );
                        readAllToDoes.splice(objIndex, 1);

                        cache.writeQuery({
                          query: GET_ALL_TODOES,
                          data: { readAllToDoes }
                        });
                      }}
                    >
                      {(updateToDoDone, { data }) => (
                        <button
                          type="button"
                          className="btn btn-danger float-right ml-3"
                          onClick={e => {
                            e.preventDefault();
                            updateToDoDone({ variables: { id: item.id } });
                          }}
                        >
                          Delete Todo
                        </button>
                      )}
                    </Mutation>

                    {!item.isDone && (
                      <Mutation
                        mutation={MARK_AS_DONE}
                        update={(cache, { data: { updateToDoDone } }) => {
                          const { readAllToDoes } = cache.readQuery({
                            query: GET_ALL_TODOES
                          });

                          let objIndex = readAllToDoes.findIndex(
                            obj => obj.id == updateToDoDone.id
                          );
                          readAllToDoes[objIndex].isDone = true;

                          cache.writeQuery({
                            query: GET_ALL_TODOES,
                            data: { readAllToDoes }
                          });
                        }}
                      >
                        {(updateToDoDone, { data }) => (
                          <button
                            type="button"
                            className="btn btn-success float-right"
                            onClick={e => {
                              e.preventDefault();
                              updateToDoDone({ variables: { id: item.id } });
                            }}
                          >
                            Mark as done
                          </button>
                        )}
                      </Mutation>
                    )}
                    {item.isDone && (
                      <Mutation
                        mutation={MARK_AS_UNDONE}
                        update={(cache, { data: { updateToDoUnDone } }) => {
                          const { readAllToDoes } = cache.readQuery({
                            query: GET_ALL_TODOES
                          });

                          let objIndex = readAllToDoes.findIndex(
                            obj => obj.id == updateToDoUnDone.id
                          );
                          readAllToDoes[objIndex].isDone = false;

                          cache.writeQuery({
                            query: GET_ALL_TODOES,
                            data: { readAllToDoes }
                          });
                        }}
                      >
                        {(updateToDoDone, { data }) => (
                          <button
                            type="button"
                            className="btn btn-warning float-right"
                            onClick={e => {
                              e.preventDefault();
                              updateToDoDone({ variables: { id: item.id } });
                            }}
                          >
                            Mark as undone
                          </button>
                        )}
                      </Mutation>
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
