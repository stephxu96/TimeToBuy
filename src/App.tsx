import React from 'react';
import './App.css';
import Budget from './common/Budget'

interface AppState {
  startDate: string,
  price: string,
  interval: string
};

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { price: "", startDate: "0", interval: "1" }
  }

  setInput = (id: "startDate" | "price" | "interval") => {
    const inputElem = document.getElementById(id) as HTMLInputElement;
    if (inputElem) {
      let updatedState = {...this.state};
      updatedState[id] = inputElem.value;
      this.setState(updatedState);
    }
    console.log(this.state);
  }

  getEndDate = () => {
    let days = parseInt(this.state.price) / parseInt(this.state.interval);
    var result = new Date(this.state.startDate);
    result.setDate(result.getDate() + days);

    return result.toLocaleDateString("en-US");
  }

  render() {
    return (
      <div className="App">
        <header>
          <Budget total={2000} currency="$" />
          <p>
            <label>Enter start date:</label>
            <input onChange={() => this.setInput("startDate")} id="startDate" />
          </p>
          <p>
            <label>Enter price:</label>
            <input onChange={() => this.setInput("price")} id="price" />
          </p>
          <p>
            <label>Enter daily contribution in dollars ($):</label>
            <input onChange={() => this.setInput("interval")} id="interval" />
          </p>
          <h2>Time to Buy: {this.getEndDate()}</h2>
        </header>
      </div>
    );
  }
}

export default App;
