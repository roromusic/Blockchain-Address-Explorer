import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import history from './history';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    history.push(`/${this.state.input}`);
    this.setState({
      input: ''
    })
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  render(){
    return (
      <header className='header layout'>
        <p className='header_instructions'>Search a Bitcoin Address</p>
        <form onSubmit={this.handleSubmit}>
          <input 
            className="search-bar" 
            placeholder="account address" 
            value={this.state.input}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default withRouter(Header);