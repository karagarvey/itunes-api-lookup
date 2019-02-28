import React, { Component } from 'react';
import { SingleSong, Spinner } from '../components';
import axios from 'axios';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: true
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
    this.setState({ loading: true });
    const { artistName, startDate, endDate } = this.objectFromQueryString(
      this.props.location.search
    );

    if (!artistName) {
      this.setState({
        results: 'Please enter an artist name to search',
        loading: false
      });
      return;
    }
    let results;
    try {
      const { data } = await axios.get(
        `https://itunes.apple.com/search?media=music&entity=song&attribute=artistTerm&term=${artistName}`
      );
      console.log('data', data);
      results = data.results;
    } catch (err) {
      results =
        'Looks like there was an error with the iTunes API, try your search again!';
    }

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
        results: fullMessage,
        loading: false
      });
    } else {
      this.setState({ results, loading: false });
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
    if (this.state.loading) {
      return (
        <div className="resultsList">
          <Spinner className="center" />
        </div>
      );
    }

    return (
      <div className="resultsList">
        {typeof this.state.results === 'string' ? (
          <div>{this.state.results}</div>
        ) : (
          this.state.results.map(result => (
            <SingleSong key={result.trackId} result={result} />
          ))
        )}
      </div>
    );
  }
}

export default SearchResults;
