import React from 'react';
import logo from './logo.svg';
import {createStore} from 'redux'
import Todos from "./components/Todos";
import todos from "./reducers"
function App() {
  return (
    <div className="App">
        <Todos/>
    </div>
  );
}

export default App;
