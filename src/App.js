import "./App.css";
import { Component } from "react";
import LoginForm from "./Components/LoginForm";
// import RegisterForm from "./Components/RegisterForm";

class App extends Component {
  render() {
    return (
      <div className="app">
        {/* <RegisterForm /> */}
        <LoginForm />
      </div>
    );
  }
}

export default App;
