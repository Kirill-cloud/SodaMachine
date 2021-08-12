import React from "react";

export default class Position extends React.Component {
  constructor(props) {
    super(props);
    this.state = { position: props.Position };
    this.Buy = props.Buy;
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.Buy(this.state.position);
            this.forceUpdate();
          }}
        >
          <img width="100px" height="100px" src={this.state.position.picture} />
        </button>
        <p>{this.state.position.name}</p>
        <p>{this.state.position.price}</p>
        <p>{this.state.position.count}</p>
      </div>
    );
  }
}
