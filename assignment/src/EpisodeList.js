/**
 * EpisodeList.js
 *
 * This is just a plain ol' React component.
 * the vjsComponent methods, player methods etc. are available via
 * the vjsComponent prop (`this.props.vjsComponent`)
 */
import React, { Component, PropTypes } from 'react';

class EpisodeList extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.body}</h1>
      </div>
    );
  }
}