import React, { Component } from 'react';
import './App.css';
import axios from "axios";

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
      rootMargin: '0%',
      threshold: 0
    };

    this.observer = new IntersectionObserver(this.handleObserver, options);
    this.observer.observe(this.loadingRef);
  }

  handleObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y;

    if (this.state.prevY > y) {
      const lastUser = this.state.users[this.state.users.length - 1];
      const curPage = lastUser.id;
      this.getUsers(curPage);
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }

  getUsers = page => {
    this.setState({ loading: true });
    axios
      .get(`https://api.github.com/users?since=${page}&per_page=100`)
      .then(res => {
        this.setState({ users: [...this.state.users, ...res.data] });
        this.setState({ loading: false });
      });
  }

  render() {

    const loadingCSS = {
      height: '2rem',
      width: '2rem'
    }

    const loadingTextCSS = { display: this.state.loading ? 'block' : 'none' };

    return (
      <div className='container'>
        <div style={{ minHeight: '4rem'}}>
          <ul>
            {this.state.users.map(user => <li key={user.id}>{user.login}</li>)}
          </ul>
        </div>
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}>
          <span style={loadingTextCSS}>Loading...</span>
        </div>
      </div>
    );
  }
}

export default App;
