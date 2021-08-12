import React, { Component } from "react";
import SodaPosition from "./SodaPosition";
import ButtonsSet from "./ButtonsSet";
import { data } from "jquery";
import { isThisTypeNode } from "typescript";

export class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [],
      loading: true,
      balance: 0,
      cash: [0, 0, 0, 0],
    };
    this.Mount();
  }

  async Mount() {
    let responce = await fetch("./Position/Get");
    let data = await responce.json();
    this.setState({ positions: data, loading: false });

    responce = await fetch("./Cash/GetTotal");
    data = await responce.json();
    this.setState({ balance: data });

    responce = await fetch("./Cash/Get");
    data = await responce.json();
    this.setState({ cash: data });
  }
  async SavePosition(position) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(position),
    };
    await fetch("./Position/AddPosition/", requestOptions);
  }
  async RemovePosition(position) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(position),
    };
    await fetch("./Position/RemovePosition/", requestOptions);
    this.Mount();
  }
  async SaveCoins() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.cash),
    };
    await fetch("./Cash/Post", requestOptions);
  }
  pusher() {
    this.SavePosition({
      id: 0,
      picture: "",
      name: "",
      count: 0,
      price: 0,
    });
    this.Mount();
  }

  updatePic(id, name, e) {
    let x = this.state.positions;
    x.forEach((el) => {
      if (el.id == id) {
        if (name == "pic") {
          el.picture = e.target.value;
        }
        if (name == "name") {
          el.name = e.target.value;
        }
        if (name == "price") {
          if (parseInt(e.target.value) != NaN) {
            el.price = parseInt(e.target.value);
          }
        }
        if (name == "count") {
          if (parseInt(e.target.value) != NaN) {
            el.count = parseInt(e.target.value);
          }
        }
      }
    });
    this.setState({ positions: x });
  }
  toggle(index) {
    let x = this.state.cash;
    if (x[index] == 0) {
      x[index] = 1;
    } else {
      x[index] = 0;
    }
    this.setState({ cash: x });

    this.SaveCoins();
  }
  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      <div>
        <table aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Picture URI</th>
              <th>Name</th>
              <th>Price</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {this.state.positions.map((position) => (
              <tr key={position.id}>
                <td>
                  <input
                    value={position.picture}
                    onChange={this.updatePic.bind(this, position.id, "pic")}
                  />
                </td>
                <td>
                  <input
                    value={position.name}
                    onChange={this.updatePic.bind(this, position.id, "name")}
                  />
                </td>
                <td>
                  <input
                    value={position.price}
                    onChange={this.updatePic.bind(this, position.id, "price")}
                  />
                </td>
                <td>
                  <input
                    value={position.count}
                    onChange={this.updatePic.bind(this, position.id, "count")}
                  />
                </td>
                <td>
                  <button onClick={() => this.SavePosition(position)}>
                    SavePosition
                  </button>
                  <button onClick={() => this.RemovePosition(position)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => this.pusher()}>Add item</button>

        <div
          style={{
            margin: "15px",
            border: "solid",
            width: "100px",
            height: "215px",
            padding: "5px",
          }}
        >
          <p>Balance: {this.state.balance}</p>
          <p>Available coins: </p>
          <ul>
            <li>
              <input
                type="checkbox"
                checked={this.state.cash[0]}
                onChange={this.toggle.bind(this, 0)}
              />
              1
            </li>
            <li>
              <input
                type="checkbox"
                checked={this.state.cash[1]}
                onChange={this.toggle.bind(this, 1)}
              />
              2
            </li>
            <li>
              <input
                type="checkbox"
                checked={this.state.cash[2]}
                onChange={this.toggle.bind(this, 2)}
              />
              5
            </li>
            <li>
              <input
                type="checkbox"
                checked={this.state.cash[3]}
                onChange={this.toggle.bind(this, 3)}
              />
              10
            </li>
          </ul>
        </div>
      </div>
    );

    return <div>{contents}</div>;
  }
}
