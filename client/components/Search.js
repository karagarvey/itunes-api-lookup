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

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    console.log('in handleSubmit');
    event.preventDefault();
    console.log('this.validator.allValid()', this.validator.allValid());
    if (this.validator.allValid()) {
      console.log('all valid', this.props.history);
      if (!this.startDate) {
        this.props.history.push(
          `/search/${this.state.artistName}/after/1300-01-01/before/${
            this.state.endDate
          }`
        );
      } else {
        this.props.history.push(
          `/search/${this.state.artistName}/after/${
            this.state.startDate
          }/before/${this.state.endDate}`
        );
      }

      await this.setState({
        artistName: '',
        startDate: '',
        endDate: ''
      });
      this.validator.messagesShown = false;
    } else {
      console.log('this.validator.allValid()2', this.validator.allValid());
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
