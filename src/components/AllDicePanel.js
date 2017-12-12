import React, { Component } from 'react';
// import componentProperties from '../lib/componentProperties.js';
// import allEquipment from '../data/allEquipment.json';
import DiceCard from './DiceCard.js';

// TODO:


class AllDicePanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allDice: [],
      allDiceCards: []
    }

    this.rollAllDice = this.rollAllDice.bind(this);
    
  }
  

  

  

  //TODO: create ability for multiple dice rolling at one time
  // Only have one roll button, one button to add another die,
  // ability to remove die, must have at least one die to roll,
  // keep value of each die selected when adding/removing die,
  // has to roll each die selected and then add those rolls together,
  // display the results of each roll and total of all rolls

  setDieProperties = (die) => {
    if (this.state.allDice) {
      for (var i = 0; i < this.state.allDice.length; i++) {
        if (die.index === this.state.allDice[i].index) {
          this.state.allDice[i].sides = die.sides;
          this.state.allDice[i].quantity = die.quantity;
          this.setState({
            allDice: this.state.allDice,

          });
        }
      }
    }
  }

  removeDieFromRoll = (die) => {
    for (var i = 0; i < this.state.allDice.length; i++) {
      if (die.index === this.state.allDice[i].index) {
        this.state.allDice.splice(i, 1);
        this.setState({allDice: this.state.allDice});
        this.createDiceCardPanel();
      }
    }
  }

  rollSingleDie = (dieIndex) => {
    for (var i = 0; i < this.state.allDice.length; i++) {
      if (dieIndex === this.state.allDice[i].index) {
        this.rollDie(this.state.allDice[i]);
        // this.setState({allDice: this.state.allDice});
        this.createDiceCardPanel();
      }
    }
  }
  
  addDieToRoll = () => {
    let newDie = {
      sides: 4,
      quantity: 1,
      index: Math.random()
    }

    this.state.allDice.push(newDie);
    this.setState({allDice: this.state.allDice});

    this.createDiceCardPanel();
  }

  createDiceCardPanel = () => {
    let newDice;
    newDice = this.state.allDice.map((die) => {
      return (
        <DiceCard key={die.index} die={die} setDieProperties={this.setDieProperties} removeDieFromRoll={this.removeDieFromRoll} rollSingleDie={this.rollSingleDie}/>
      )
    });
    this.setState({allDiceCards: newDice});
  }

  rollDie = (die) => {
    // write dice roll code to get random number for each 
    // side of the die and then take which ever has the 
    // highest number

    let dieSides = [];
    let tempRollResult = 0;
    let selectedSide = 0;

    for (var i = 1; i <= die.sides; i++) {
      dieSides.push({
        sideNumber: i,
        rollResult: Math.random() * Math.random()
      });
    }
    for (var j = 0; j < dieSides.length; j++) {
      if (dieSides[j].rollResult > tempRollResult) {
        tempRollResult = dieSides[j].rollResult;
        selectedSide = dieSides[j].sideNumber;
      }
    }
    return selectedSide;
  }

  rollAllDice = () => {
    // currently this function is testing rolls and printing out 
    // results for how many times each side is rolled for a given
    // amount of total rolls (testing shows that each side is coming
    // up at the proper average)
    let allRolls = [];
    let allRollsCount = [];
    for (var i = 0; i < 10000; i++) {
      allRolls.push(this.rollDie({sides: 100}));
    }
    console.log("allRolls: ", allRolls);

    for (var j = 0; j < allRolls.length; j++) {
      if (allRollsCount.length > 0) {
        let found;
        for (var k = 0; k < allRollsCount.length; k++) {
          found = false;
          if (allRolls[j] === allRollsCount[k].side) {
            allRollsCount[k].count += 1;
            found = true;
            break;
          }
        }
        if (!found) {
          allRollsCount.push({side: allRolls[j], count: 1});
        }
      } else {
        allRollsCount.push({side: allRolls[j], count: 1})
      }
    }
    console.log("allRollsCount: ", allRollsCount);

    // alert("You throw the dice off the table...");
  }

  componentDidMount() {
    this.addDieToRoll();
    this.rollAllDice();
  }

  render() {

    return (
      <div>
        <div className="dicePanel">
          <div>
            <div className="rollButton" onClick={() => {this.rollAllDice();}}>
              <div className="rollDieText">
                Roll All Dice <span><i className="fa fa-share-square-o rollAllDiceIcon" aria-hidden="true"></i></span>
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
