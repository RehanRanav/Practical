import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";
import headphone from './img/headphone.jpg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Hello, World! </h1>
        <h1> How are you? </h1>
        <img src={headphone} alt="" />
      </div>
    );
  }
}

export default hot(module)(App);