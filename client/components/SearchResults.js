import React, { Component } from 'react';
import SingleSong from './SingleSong';
import Spinner from './Spinner';
import axios from 'axios';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  async iTunesQuery() {
    console.log('param1', this.props.match.params);

    const { data } = await axios.get(
      `https://itunes.apple.com/search?media=music&entity=song&term=${
        this.props.match.params.artistName
      }`
    );
    let { results } = data;
    const startDate = this.props.match.params.startDate;
    const endDate = this.props.match.params.endDate;
    console.log('results before filter', results);
    if (startDate) {
      results = results.filter(result => {
        const releaseDate = result.releaseDate.substring(0, 7);
        console.log('releaseDate', releaseDate);
        console.log('this.startDate', startDate);
        return releaseDate >= startDate;
      });
    }
    if (endDate) {
      results = results.filter(result => {
        const releaseDate = result.releaseDate.substring(0, 7);
        console.log('releaseDate', releaseDate);
        console.log('this.endDate', endDate);
        return releaseDate <= endDate;
      });
    }
    console.log('results after filter', results);

    this.setState({ results });
  }

  componentDidMount() {
    console.log('param', this.props.match.params);
    console.log('componentDidMount');
    this.iTunesQuery();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params !== this.props.match.params) {
      this.iTunesQuery();
    }
  }

  render() {
    return (
      <div>
        {this.state.results.length ? (
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
