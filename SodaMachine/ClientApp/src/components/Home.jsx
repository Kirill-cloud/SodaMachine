import React, { Component } from "react";
import SodaPosition from "./SodaPosition";
import ButtonsSet from "./ButtonsSet";
import { data } from "jquery";

export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true, balance: 0, cash: [] };
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

  Deposit(amount) {
    if (this.state.balance + amount >= 0) {
      this.setState({ balance: this.state.balance + amount });
      return true;
    } else {
      alert("Недостаточно деняк");
      return false;
    }
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
              <tr key={forecast.name}>
                <td><button><img scr={forecast.picture}/></button></td>
                <td>{forecast.name}</td>
                <td>{forecast.price}</td>
                <td>{forecast.count}</td>
                <td>
                  <button
                    onClick={async () => {
                      if (this.Deposit(-forecast.price)) {
                        const requestOptions = {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ id: forecast.id }),
                        };
                        await fetch(
                          "./Position/Post?id=" + forecast.id,
                          requestOptions
                        );
                        this.Mount();
                      }
                    }}
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    return (
      <div>
        {contents}
        {this.state.balance}
        <ButtonsSet onClick={this.Deposit.bind(this)} />
      </div>
    );
  }
}
