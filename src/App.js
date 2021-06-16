import "./App.css";
import { Component } from "react";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Books from "./Components/Books";
import BooksAdmin from "./Components/Books-admin";
import AddBook from "./Components/operations/AddBook";
import UpdateBook from "./Components/operations/UpdateBook";
import DeleteBook from "./Components/operations/DeleteBook";

class App extends Component {
  render() {
    return (
      <Router>
        <Nav />
        <div className="app">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/books" component={Books} />
            <Route path="/bookadmin" component={BooksAdmin} />
            <Route path="/addbook" component={AddBook} />
            <Route path="/updatebook" component={UpdateBook} />
            <Route path="/deletebook" component={DeleteBook} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
