import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Data from './Data';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
          <Route
            path="/:id"
            component={Data}
          />
      </div>
    );
  }
}

export default App;
