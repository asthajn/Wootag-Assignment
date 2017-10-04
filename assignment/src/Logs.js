import React, { Component } from 'react'

export default class Logs extends Component{
    
  createLogList () {
    return this.props.logQueue.map((log, index) => (<li key={index}>{log}</li>))
  }

  getStyle () {
    return {
      logContainer: {
        fontSize:'13px',
        marginRight:'15px'
      }
    }
  }

  render () {
    const logList = this.createLogList()
    const { logContainer } = this.getStyle()
    return (
      <div>
        <div>Logs</div>
        <ul style={logContainer}>
          {logList}
        </ul>
      </div>
    )
  }
}
Logs.defaultProps = {  
  logQueue: []
} 