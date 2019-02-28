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
    console.log('itunes query running');
    this.setState({ loading: true });
    const { artistName, startDate, endDate } = this.objectFromQueryString(
      this.props.location.search
    );

    console.log('artistnMW', artistName, startDate, endDate);

    if (!artistName) {
      console.log('no artist name!');
      this.setState(
        {
          results: 'Please enter an artist name to search',
          loading: false
        },
        () => console.log('state set after no artist name')
      );
      return;
    }

    console.log('about to await axios call');
    const { data } = await axios.get(
      `https://itunes.apple.com/search?media=music&entity=song&term=${artistName}`
    );

    console.log('axios call returned!!!!', data);
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
      console.log('no results!');
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
      this.setState(
        {
          results: fullMessage,
          loading: false
        },
        () => console.log('set state after no results')
      );
    } else {
      console.log('results!');
      this.setState({ results, loading: false }, () =>
        console.log('set state after results')
      );
    }
  }

  componentDidMount() {
    console.log('component did mount');
    this.iTunesQuery();
  }

  componentDidUpdate(prevProps) {
    console.log('component did UPDATE');
    if (prevProps.location.search !== this.props.location.search) {
      console.log('search query changed, about to hit api');
      this.iTunesQuery();
    }
  }

  render() {
    console.log('in render, loading is:', this.state.loading);
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
