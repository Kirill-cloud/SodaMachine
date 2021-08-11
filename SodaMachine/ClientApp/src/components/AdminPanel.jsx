import React, { Component } from "react";
import SodaPosition from "./SodaPosition";
import ButtonsSet from "./ButtonsSet";
import { data } from "jquery";
import { isThisTypeNode } from "typescript";

export class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forecasts: [],
      loading: true,
      balance: 0,
      cash: [0, 0, 0, 0],
    };
    this.Mount();
  }

  async Mount() {
    let responce = await fetch("./Position/Get");
    let data = await responce.json();
    this.setState({ forecasts: data, loading: false });

    responce = await fetch("./User");
    data = await responce.json();
    this.setState({ balance: data });

    responce = await fetch("./Cash");
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
  async SaveCoins() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.cash),
    };
    await fetch("./Cash/", requestOptions);
  }
  pusher() {
    this.setState({
      forecasts: [
        ...this.state.forecasts.concat([
          {
            id: 0,
            picture: "",
            name: "",
            count: 0,
            price: 0,
          },
        ]),
      ],
    });
    let x = 0;
    x++;
  }

  updatePic(id, name, e) {
    let x = this.state.forecasts;
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
    this.setState({ forecasts: x });
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
              <th>Pic</th>
              <th>Name</th>
              <th>Price</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {this.state.forecasts.map((forecast) => (
              <tr key={forecast.id}>
                <td>
                  <input
                    value={forecast.picture}
                    onChange={this.updatePic.bind(this, forecast.id, "pic")}
                  />
                </td>
                <td>
                  <input
                    value={forecast.name}
                    onChange={this.updatePic.bind(this, forecast.id, "name")}
                  />
                </td>
                <td>
                  <input
                    value={forecast.price}
                    onChange={this.updatePic.bind(this, forecast.id, "price")}
                  />
                </td>
                <td>
                  <input
                    value={forecast.count}
                    onChange={this.updatePic.bind(this, forecast.id, "count")}
                  />
                </td>
                <td>
                  <button onClick={() => this.SavePositions(forecast)}>SavePositions</button>
                  <button>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => this.pusher()}>Add item</button>

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
    );

    return <div>{contents}</div>;
  }
}
