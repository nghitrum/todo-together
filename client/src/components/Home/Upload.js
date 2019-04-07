import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { ADD_TODO } from '../GQL/Mutation';
import { GET_ALL_TODOES } from '../GQL/Query';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTitle: '',
      inputDescription: ''
    };
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

  render() {
    return (
      <Mutation
        mutation={ADD_TODO}
        update={(cache, { data: { createToDo } }) => {
          const { readAllToDoes } = cache.readQuery({ query: GET_ALL_TODOES });
          cache.writeQuery({
            query: GET_ALL_TODOES,
            data: { readAllToDoes: readAllToDoes.reverse().concat([createToDo]).reverse() }
          });
        }}
      >
        {createToDo => (
          <form
            onSubmit={e => {
              e.preventDefault();
              createToDo({
                variables: {
                  title: this.state.inputTitle,
                  description: this.state.inputDescription
                }
              });
            }}
          >
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Add a ToDo</label>
              <input
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
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default Upload;
