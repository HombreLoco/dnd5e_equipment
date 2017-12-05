import React, { Component } from 'react';
import componentProperties from '../lib/componentProperties.js';
import allEquipment from '../data/allEquipment.json';
import DiceCard from './DiceCard.js';

// TODO:


class AllDicePanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allDice: [],
      allDiceCards: []
    }

    this.rollDice = this.rollDice.bind(this);
    
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


  //TODO: create ability for multiple dice rolling at one time
  // Only have one roll button, one button to add another die,
  // ability to remove die, must have at least one die to roll,
  // keep value of each die selected when adding/removing die,
  // has to roll each die selected and then add those rolls together,
  // display the results of each roll and total of all rolls

  setDieProperties = (die) => {
    console.log("die.index: ", die.index);
    console.log("this.state.allDice[i].index: ", this.state.allDice);
    if (this.state.allDice) {
      console.log("this.state.allDice2: ", this.state.allDice);
      for (var i = 0; i < this.state.allDice.length; i++) {
        console.log("here1");
        if (die.index === this.state.allDice[i].index) {
          console.log("here[i]: ", i);
          console.log("this.state.allDice3: ", this.state.allDice);
          this.state.allDice[i].sides = die.sides;
          this.state.allDice[i].quantity = die.quantity;
          this.setState({allDice: this.state.allDice});
        }
      }
    }
    
  }
  
  addDieToRoll = () => {
    console.log("this.state.allDice4: ", this.state.allDice);    
    
    let newDie = {
      sides: 4,
      quantity: 1,
      index: Math.random()
    }

    this.state.allDice.push(newDie);
    this.setState({allDice: this.state.allDice});

    this.state.allDiceCards = this.state.allDice.map((die) => {
      return (
        <DiceCard key={die.index} die={die} setDieProperties={this.setDieProperties}/>
      )
    });

    this.setState({allDiceCards: this.state.allDiceCards});
    console.log("this.state.allDiceCards: ", this.state.allDiceCards);    
    console.log("this.state.allDice: ", this.state.allDice);    
    

    
  }

  rollDice = (sides, quantity) => {
    alert("You throw the dice off the table...");
  }


  componentDidMount() {
    this.addDieToRoll();
  }

  render() {
    // let extraDice = this.state.extraDice;

    return (
      <div>
        <div className="dicePanel" onClick={() => {this.displayDiceDropDown();}}>
          <div>
            <div className="rollButton" onClick={() => {this.rollDice();}}>
              <div className="centerText">
                Roll
              </div>
            </div>
          </div>
          <div className="clear"></div>
          {this.state.allDiceCards}
          <div className="addDieButton" onClick={() => {this.addDieToRoll();}}>
            + Add die
          </div>
        </div>
      </div>
    );
  }
}

export default AllDicePanel;
