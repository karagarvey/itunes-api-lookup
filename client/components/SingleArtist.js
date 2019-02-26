import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SingleArtist extends Component {
  constructor(props) {
    super(props);
    this.artistName = '';
    this.startDate = '';
    this.endDate = '';
  }

  componentDidMount() {
    const { results } = axios.get(
      `https://itunes.apple.com/search?term=${this.artistName}`
    );
  }

  handleChange() {}

  handleSubmit() {}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="firstName">Artist Name: </label>
          <input
            onChange={this.handleChange}
            value={this.artistName}
            type="text"
            name="artistName"
          />
          <br />
          <label htmlFor="startDate">Start Date: </label>
          <input
            onChange={this.handleChange}
            value={this.startDate}
            type="text"
            name="startDate"
          />
          <br />
          <label htmlFor="endDate">End Date: </label>
          <input
            onChange={this.handleChange}
            value={this.endDate}
            type="text"
            name="endDate"
          />
          <br />
          <span>
            <button type="submit">Search!</button>
          </span>
        </div>
      </form>
    );
  }
}

export default SingleArtist;
