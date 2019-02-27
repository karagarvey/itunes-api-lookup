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
    const { data } = await axios.get(
      `https://itunes.apple.com/search?media=music&entity=song&term=${
        this.props.match.params.artistName
      }`
    );
    let { results } = data;
    const startDate = this.props.match.params.startDate;
    const endDate = this.props.match.params.endDate;
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

    this.setState({ results });
  }

  componentDidMount() {
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
