import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { GET_ALL_USERS_EXCEPT_ME, GET_ALL_TODOES } from '../../GQL/Query';
import { SHARE_TODO } from '../../GQL/Mutation';

class Share extends Component {
  constructor(props) {
    super(props);
    this.closeModal = React.createRef();
  }
  
  handleOnClickUpdate = () => {
    this.closeModal.current.click();
  };

  render() {
    const { todo } = this.props;
    return (
      <div
        className="modal fade"
        id={'share-' + todo.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={'#share-' + todo.id + 'Label'}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={todo.id + 'Label'}>
                Share this ToDo with
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="list-group">
                <Query query={GET_ALL_USERS_EXCEPT_ME}>
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                      <div className="list-group">
                        {data.readAllUsersExceptMe.map(user => (
                          <Mutation
                            mutation={SHARE_TODO}
                            update={(cache, { data: { shareToDo } }) => {
                              let { readAllToDoes } = cache.readQuery({
                                query: GET_ALL_TODOES
                              });

                              cache.writeQuery({
                                query: GET_ALL_TODOES,
                                data: {
                                  readAllToDoes: readAllToDoes
                                }
                              });
                            }}
                            key={user.id}
                          >
                            {(shareToDo, { data }) => (
                              <button
                                className="list-group-item list-group-item-action"
                                onClick={e => {
                                  e.preventDefault();
                                  shareToDo({
                                    variables: {
                                      todoId: todo.id,
                                      userId: user.id
                                    }
                                  });
                                  this.handleOnClickUpdate();
                                }}
                              >
                                {user.email}
                              </button>
                            )}
                          </Mutation>
                        ))}
                      </div>
                    );
                  }}
                </Query>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={this.closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Share;
