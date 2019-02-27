import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
    console.log('this.state22', this.state);
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
