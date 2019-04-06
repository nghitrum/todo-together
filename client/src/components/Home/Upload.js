import React, { Component } from 'react';

class Upload extends Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlInput1">Add a ToDo</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Pick up laundry"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Some description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

export default Upload;
