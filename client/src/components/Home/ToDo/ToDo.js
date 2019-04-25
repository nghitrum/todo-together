import React, { Component } from 'react';
import Share from './Share';
import { MARK_AS_DONE, MARK_AS_UNDONE, DELETE_TODO } from '../../GQL/Mutation';
import { GET_ALL_TODOES } from '../../GQL/Query';
import { Mutation } from 'react-apollo';

class ToDo extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="card mt-3 mb-3">
        <div className="card-body">
          <h5 className="card-title m-0">{item.title}</h5>
          <p className="card-text">{item.description}</p>
        </div>

        {item.sharedWith && item.sharedWith.length > 0 && (
          <div className="card-footer">
            <span>Shared with&#32;</span>
            {item.sharedWith.map((user, index) => {
              return <span key={user.id}>{user.email}&#32;</span>;
            })}
          </div>
        )}

        {item.user && this.props.own === false && (
          <div className="card-footer">
            <span>Created by&#32;</span>
            <span key={item.user.id}>{item.user.email}&#32;</span>
          </div>
        )}

        <div className="card-footer bg-white d-flex justify-content-between">
          <ul className="nav d-inline-flex">
            <button
              type="button"
              className="btn btn-info"
              data-toggle="modal"
              data-target={'#' + item.id}
            >
              Share
            </button>
            <Share todo={item} />
          </ul>
          <ul className="nav d-inline-flex">
            {!item.isDone && (
              <Mutation
                mutation={MARK_AS_DONE}
                update={(cache, { data: { updateToDoDone } }) => {
                  const { readAllToDoes } = cache.readQuery({
                    query: GET_ALL_TODOES
                  });

                  let objIndex = readAllToDoes.findIndex(
                    obj => obj.id === updateToDoDone.id
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
                    className="btn btn-success ml-1"
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
                    obj => obj.id === updateToDoUnDone.id
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
                    className="btn btn-warning ml-1"
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
            <Mutation
              mutation={DELETE_TODO}
              update={(cache, { data: { deleteToDo } }) => {
                const { readAllToDoes } = cache.readQuery({
                  query: GET_ALL_TODOES
                });

                let objIndex = readAllToDoes.findIndex(
                  obj => obj.id === deleteToDo.id
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
                  className="btn btn-danger ml-1"
                  onClick={e => {
                    e.preventDefault();
                    updateToDoDone({ variables: { id: item.id } });
                  }}
                >
                  Delete Todo
                </button>
              )}
            </Mutation>
          </ul>
        </div>
      </div>
    );
  }
}

export default ToDo;
