import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      startDate: '',
      endDate: '',
      warningMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ warningMessage: 'Field is required!' });
  }

  handleChange(event) {
    console.log('handleChange event.target.name', event.target.name);
    console.log('handleChange event.target.value', event.target.value);
    console.log('handleChange obj', {
      [event.target.name]: event.target.value
    });
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    console.log('b', this.state);
    event.preventDefault();
    this.props.history.push(`/search/${this.state.artistName}`);
    await this.setState({
      artistName: '',
      startDate: '',
      endDate: ''
    });
    console.log('a', this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="artistName">
            Artist Name:{' '}
            {!this.state.artistName && this.state.warningMessage && (
              <span className="warning">{this.state.warningMessage}</span>
            )}
          </label>
          <input
            onChange={this.handleChange}
            value={this.state.artistName}
            type="text"
            name="artistName"
          />
          <br />
          <label htmlFor="startDate">Start Date: </label>
          <input
            onChange={this.handleChange}
            value={this.state.startDate}
            type="text"
            name="startDate"
          />
          <br />
          <label htmlFor="endDate">End Date: </label>
          <input
            onChange={this.handleChange}
            value={this.state.endDate}
            type="text"
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
