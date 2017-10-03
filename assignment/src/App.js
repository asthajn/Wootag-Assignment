import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VideoPlayer from './VideoPlayer.js'

class App extends Component {
  render() {
    const videoJsOptions = {
      autoplay: true,
      controls: true,
      preload: true,
      height: 500,
      width: 500
    }
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <VideoPlayer{ ...videoJsOptions } />
      </div>
    );
  }
}

export default App;
