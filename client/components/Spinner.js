import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <ClipLoader
          align="center"
          sizeUnit="px"
          size={50}
          color="#123abc"
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Spinner;
