import React, { Component } from "react";
import SodaPosition from "./SodaPosition";
import ButtonsSet from "./ButtonsSet";
import { data } from "jquery";

export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = { positions: [], loading: true, balance: 0, cash: [] };
    this.Mount();
  }

  async Mount() {
    let responce = await fetch("./Position/Get");
    let data = await responce.json();
    this.setState({ positions: data, loading: false });

    responce = await fetch("./User");
    data = await responce.json();
    this.setState({ balance: data });

    responce = await fetch("./Cash/Get");
    data = await responce.json();
    this.setState({ cash: data });
  }

  Buy(position) {
    if (this.state.balance - position.price >= 0) {
      const requestOptions = {
        method: "POST",
      };
      fetch("./Position/Post?id=" + position.id, requestOptions);
    } else {
      alert("Недостаточно средств");
    }
  }

  Deposit(amount) {
    this.setState({ balance: this.state.balance + amount });
    const requestOptions = {
      method: "POST",
    };
    fetch("./User?amount=" + amount, requestOptions);
  }

  LetNickelback() {
    let coins = [0, 0, 0, 0];
    let rest = this.state.balance;

    coins[3] = this.div(rest, 10);
    rest -= 10 * coins[3];
    coins[2] = this.div(rest, 5);
    rest -= 5 * coins[2];
    coins[1] = this.div(rest, 2);
    rest -= 2 * coins[1];
    coins[0] = this.div(rest, 1);
    rest -= coins[0];

    let message = "ваша сдача: " + this.state.balance;
    message += coins[0] > 0 ? "\n" + "1: " + coins[0] : "";
    message += coins[1] > 0 ? "\n" + "2: " + coins[1] : "";
    message += coins[2] > 0 ? "\n" + "5: " + coins[2] : "";
    message += coins[3] > 0 ? "\n" + "10: " + coins[3] : "";

    alert(message);
    this.Deposit(-this.state.balance);
  }

  div(val, by) {
    return (val - (val % by)) / by;
  }
  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      <div>
        {this.state.positions.map((position) => (
          <div
            key={position.id}
            style={{
              border: "solid",
              margin: "5px",
              padding: "5px",
              float: "left",
              minHeight: "120px",
              minWidth: "240px",
            }}
          >
            <div style={{ float: "left", marginRight: "5px" }}>
              <p>Name: {position.name}</p>
              <p>Price: {position.price}</p>
              <p>Count: {position.count}</p>
            </div>
            <button
              onClick={() => {
                this.Buy(position);
                this.Mount();
              }}
            >
              <img width="100px" height="100px" src={position.picture} />
            </button>
          </div>
        ))}
      </div>
    );

    return (
      <div>
        {contents}
        <div>
          <p>Balance: {this.state.balance}</p>
          <ButtonsSet onClick={this.Deposit.bind(this)} />
          <button onClick={() => this.LetNickelback()}>Nickelback</button>
        </div>
      </div>
    );
  }
}
