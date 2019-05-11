import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { GET_ONE_TODO } from '../../GQL/Query';
import { UPDATE_TODO } from '../../GQL/Mutation';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTitle: props.todo.title,
      inputDescription: props.todo.description
    };
    this.closeModal = React.createRef();
  }

  updateInputTitle(evt) {
    this.setState({
      inputTitle: evt.target.value
    });
  }

  updateInputDescription(evt) {
    this.setState({
      inputDescription: evt.target.value
    });
  }

  clearState() {
    this.setState({
      inputTitle: ''
    });
    this.setState({
      inputDescription: ''
    });
  }

  handleOnClickUpdate = () => {
    this.closeModal.current.click();
  };

  render() {
    const { todo } = this.props;
    return (
      <div
        className="modal fade"
        id={'edit-' + todo.id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={'#edit-' + todo.id + 'Label'}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <Mutation mutation={UPDATE_TODO}>
            {updateToDo => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  updateToDo({
                    variables: {
                      id: todo.id,
                      title: this.state.inputTitle,
                      description: this.state.inputDescription,
                      isDone: todo.isDone
                    }
                  });
                  this.clearState();
                }}
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id={todo.id + 'Label'}>
                      Edit this TODO
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
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Add a ToDo
                      </label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Pick up laundry"
                        value={this.state.inputTitle}
                        onChange={evt => this.updateInputTitle(evt)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        Some description
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={this.state.inputDescription}
                        onChange={evt => this.updateInputDescription(evt)}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.handleOnClickUpdate}
                    >
                      Update
                    </button>
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
              </form>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default Edit;
