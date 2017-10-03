import React, { Component } from 'react'

export default class Logs extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state = {
            player: this.props.player
        }
    }

    render(){
        return (
            <div>
                <p>Current player: {this.state.player}</p>
            </div>
        )
    }
}