import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    users: [],
    page: 0,
    loading: false,
    prevY: 0
  };

  componentDidMount() {
    this.getUsers(this.state.page);
    
    const options = {
      root: null,
      rootMargin: 'opx',
      threshold: 0
    };

    this.observer = new IntersectionObserver(callback, options);
  }

  getUsers(page) {
    this.setState({ loading: true });
    axios
      .get(`https://api.github.com/users?since=${page}&per_page=100`)
      .then(rex => {
        this.setState({ users: [...this.state.users], ...res.data });
        this.setState({ loading: false });
      })
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
