import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

class Search extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      artistName: '',
      startDate: '',
      endDate: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  queryStringFromObject(obj) {
    const objKeys = Object.keys(obj);
    let queryString = '?';
    for (let i = 0; i < objKeys.length; i++) {
      let key = objKeys[i];
      if (i === 0 && obj[key]) {
        queryString += `${key}=${obj[key]}`;
      } else if (obj[key]) {
        queryString += `&${key}=${obj[key]}`;
      }
    }
    return queryString;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validator.allValid()) {
      this.props.history.push(
        `/search${this.queryStringFromObject(this.state)}`
      );
      this.setState({
        artistName: '',
        startDate: '',
        endDate: ''
      });
      this.validator.messagesShown = false;
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="artistName">Artist Name:</label>
          <input
            onChange={this.handleChange}
            value={this.state.artistName}
            type="text"
            name="artistName"
          />
          {this.validator.message(
            'artistName',
            this.state.artistName,
            'required|alpha_num_space'
          )}

          <br />
          <label htmlFor="startDate">After: </label>
          <input
            onChange={this.handleChange}
            value={this.state.startDate}
            type="date"
            name="startDate"
          />
          <br />
          <label htmlFor="endDate">Before: </label>
          <input
            onChange={this.handleChange}
            value={this.state.endDate}
            type="date"
            name="endDate"
          />
          <br />
          <span>
            <div>
              <button type="submit">Search</button>
            </div>
          </span>
        </div>
      </form>
    );
  }
}

export default withRouter(Search);
