import React, { Component } from "react";

export default class ButtonsSet extends Component {
  constructor(props) {
    super(props);
    this.onClick = { onClick: props.onClick };
    this.state = { cash: [1, 1, 1, 1] };
    this.Mount();
  }

  async Mount() {
    let responce = await fetch("./Cash");
    let data = await responce.json();
    this.setState({ cash: data });
  }

  render() {
    return (
      <div>
        <button
          disabled={this.state.cash[0] === 0}
          onClick={() => this.props.onClick(1)}
        >
          1
        </button>
        <button
          disabled={this.state.cash[1] === 0}
          onClick={() => this.props.onClick(2)}
        >
          2
        </button>
        <button
          disabled={this.state.cash[2] === 0}
          onClick={() => this.props.onClick(5)}
        >
          5
        </button>
        <button
          disabled={this.state.cash[3] === 0}
          onClick={() => this.props.onClick(10)}
        >
          10
        </button>
      </div>
    );
  }
}
