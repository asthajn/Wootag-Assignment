import React, { Component } from 'react'

export default class Logs extends Component{
  constructor(props){
    super(props);
    console.log(props)
  }

  createLogList () {
    console.log('logQueue is ', this.props.logQueue )
    return this.props.logQueue.map((log, index) => (<div key={index}>{log}</div>))
  }

  render () {
    const logList = this.createLogList()
    return (
      <ul>
        {logList}
      </ul>
    )
  }
}
Logs.defaultProps = {  
  logQueue: []
} 