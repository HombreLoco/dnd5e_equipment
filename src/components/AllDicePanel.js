import React, { Component } from 'react';
import componentProperties from '../lib/componentProperties.js';
import allEquipment from '../data/allEquipment.json';
import DiceCard from './DiceCard.js';

// TODO:


class AllDicePanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // write dice roll code to get random number for each 
  // side of the die and then take which ever has the 
  // highest number

  displayDiceDropDown = () => {
    return (
      <div className="diceDropDown">
        <select name="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="fiat">Fiat</option>
          <option value="audi">Audi</option>
        </select>
      </div>
    )
  }

  // create drop down "pop up" menu for selecting which die to roll


  componentDidMount() {
  }

  render() {

    return (
      <div>
        <div className="dicePanel" onClick={() => {this.displayDiceDropDown();}}>
          <DiceCard sides={this.state.dieSelected} quantity={1}/>
        </div>
      </div>
    );
  }
}

export default AllDicePanel;
