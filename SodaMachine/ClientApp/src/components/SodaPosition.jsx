import React, { Component } from 'react';


export default class SodaPosition extends Component {
    constructor(props) {
        super(props);
        //this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { Anime:props.Anime };
      }



    render() {
        return (
            <div>

            <p>{this.state.Anime.Image}</p>
            <p>{this.state.Anime.Name}</p>
            <p>{this.state.Anime.Price}</p>

            </div>
        );
    }
}