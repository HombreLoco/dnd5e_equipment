import React, { Component } from 'react';
import '../css/weapons.css';
import allEquipment from '../data/allEquipment.json';
import Weapons from './Weapons.js';
import WeaponCard from './WeaponCard.js';
import WeaponTypeSection from './WeaponTypeSection.js';



class Equipment extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        
        <Weapons />

      </div>
    );
  }
}

export default Equipment;
