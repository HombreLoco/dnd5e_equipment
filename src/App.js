import React, { Component } from 'react';
import './css/App.css';
import equipment from './data/allEquipment.json';
import Weapons from './components/Weapons.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getAllEquipment = () => {
    console.log("equipment: ", equipment);
  }

  componentDidMount() {
    this.getAllEquipment();
  }

  render() {
    return (
      <div>
        <Weapons />
      </div>
    );
  }
}

export default App;
