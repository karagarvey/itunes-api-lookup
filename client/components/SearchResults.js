import React, { Component } from 'react';
import { SingleSong, Spinner } from '../components';
import axios from 'axios';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  objectFromQueryString(queryString) {
    const queryTerms = queryString.slice(1).split('&');
    const queryStrObject = {};
    for (let term of queryTerms) {
      if (term) {
        const [key, value] = term.split('=');
        queryStrObject[key] = value;
      }
    }
    return queryStrObject;
  }

  async iTunesQuery() {
    const { artistName, startDate, endDate } = this.objectFromQueryString(
      this.props.location.search
    );

    if (!artistName) {
      return;
    }

    const { data } = await axios.get(
      `https://itunes.apple.com/search?media=music&entity=song&term=${artistName}`
    );
    let { results } = data;

    if (startDate) {
      results = results.filter(result => {
        const releaseDate = result.releaseDate.substring(0, 7);
        return releaseDate >= startDate;
      });
    }
    if (endDate) {
      results = results.filter(result => {
        const releaseDate = result.releaseDate.substring(0, 7);
        return releaseDate <= endDate;
      });
    }
    if (!results.length) {
      let fullMessage = `Sorry, there are no results for ${artistName}`;
      if (startDate && endDate) {
        fullMessage += ` after ${startDate} and before ${endDate}`;
      } else if (startDate) {
        fullMessage += ` after ${startDate}`;
      } else if (endDate) {
        fullMessage += ` before ${endDate.substring(5, 7)}-${endDate.substring(
          8,
          10
        )}-${endDate.substring(0, 4)}`;
      }
      this.setState({
        results: fullMessage
      });
    } else {
      this.setState({ results });
    }
  }

  componentDidMount() {
    this.iTunesQuery();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.iTunesQuery();
    }
  }

  render() {
    return (
      <div className="resultsList">
        {typeof this.state.results === 'string' ? (
          <div>{this.state.results}</div>
        ) : this.state.results.length ? (
          this.state.results.map(result => (
            <SingleSong key={result.trackId} result={result} />
          ))
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

export default SearchResults;
