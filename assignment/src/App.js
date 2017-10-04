import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import VideoPlayer from './VideoPlayer.js'
import Logs from './Logs'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logQueue: []
    }
    // this.logQueue = []
    this.handleLog = this.handleLog.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate called")
    return true
  }

  handleLog(percentage, fileName) {
    const newVal = `${new Date()} : Finished viewing ${fileName} ${percentage}`
    // console.log(newVal)
    this.setState((prevState) => { 
      return {
        logQueue: [...prevState.logQueue, newVal]
      }
    })
    console.log("this.this.state :", this.state)
    // this.logQueue.push(newVal)
  }

  getStyle () {
    return {
      container: {
        display: 'block',
        height: '500px',
        marginTop: '30px',

      },
      logContainer: {
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid',
        width: '30%',
        display: 'inline-block',
        height: '500px',
        overflowY: 'auto',
        marginRight: '40px'
      },
      videoContainer: {
        width: '40%',
        display: 'inline-block',
        marginLeft: '80px',
        float:'left',
        height: '100%',
        paddingRight: '60px'
      }
    }
  }

  render() {
    const { container, logContainer, videoContainer } = this.getStyle()
    console.log('$$$$$$ ', this.state.logQueue)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div style={container}>
          <div style={videoContainer}> 
            <VideoPlayer handleLog={this.handleLog}/>
          </div>
          <div style={logContainer}>
            <Logs logQueue={this.state.logQueue}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App
