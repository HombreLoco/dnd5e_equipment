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
      allDiceCards: [],
      styleDicePanelButtons: {display: ""},
      styleCritSuccess: {border: "2px solid green"},
      styleCritFailure: {border: "2px solid red"},
      styleCrit: {}
    }

    this.clearAllDice = this.clearAllDice.bind(this);
  }

  //TODO: create ability for multiple dice rolling at one time
  // Only have one roll button, one button to add another die,
  // ability to remove die, must have at least one die to roll,
  // keep value of each die selected when adding/removing die,
  // has to roll each die selected and then add those rolls together,
  // display the results of each roll and total of all rolls

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

  calculateTotalFromRoll = (dieRollResults) => {
    let total = 0;
    for (var i = 0; i < dieRollResults.length; i++) {
      total += dieRollResults[i].total;
    }
    return total;
  }

  calculateModifierForAllRolls = (dieRollResults) => {
    let totalModifier = 0;
    for (var i = 0; i < dieRollResults.length; i++) {
      totalModifier += dieRollResults[i].modifier;
    }
    return totalModifier;
  }

  isCriticalRoll = (roll) => {
    if (roll.sideSelected === roll.die.sides) {
      return {color: "blue"};
    } else if (roll.sideSelected === 1) {
      return {color: "red"};
    }
  }

  displayRollResults = (dieRollResults) => {
    //TODO: Refactor this function, there is repeat code 
    //for the dice output.

    //TODO: Display critical hits and misses (red color for failure, 
    //maybe blue or yellow for success).


    if (dieRollResults) {
      let dieRolltotal = this.calculateTotalFromRoll(dieRollResults);
      let dieRollTotalModifier = this.calculateModifierForAllRolls(dieRollResults);
      let count2 = 0;
      let results = [];
      for (var k = 0; k < dieRollResults.length; k++) {
        let count1 = 0;
        let keyValue1 = "A" + Math.random();
        if (count2 === dieRollResults.length - 1) {
          let tempFinalResults = dieRollResults[k].rolls.map((roll) => {
            let keyValue2 = "B" + Math.random();
            if (count1 === dieRollResults[k].rolls.length - 1) {
              console.log("die roll: ", roll);
              return (
                <div key={keyValue2}>
                  <div className="floatLeft">
                    <div className="rollSides">
                      d{roll.die.sides}
                    </div>
                    <div className="rollResult" style={this.isCriticalRoll(roll)}>
                      {roll.sideSelected}
                    </div>
                  </div>
                  <div className="floatLeft">
                    <div className="rollSides">
                      +
                    </div>
                    <div className="rollResult">
                      +
                    </div>
                  </div>
                  <div className="floatLeft">
                    <div className="rollSides">
                      Mod
                    </div>
                    <div className="rollResult">
                      {dieRollTotalModifier}
                    </div>
                  </div>
                  <div className="floatLeft">
                    <div className="rollSides">
                      =
                    </div>
                    <div className="rollResult">
                      =
                    </div>
                  </div>
                  <div className="floatLeft">
                    <div className="rollSides">
                      Total
                    </div>
                    <div className="rollResult">
                      {dieRolltotal}
                    </div>
                  </div>
                </div>
              )
            } else {
              count1++;
              return (
                <div key={keyValue2}>
                  <div className="floatLeft">
                    <div className="rollSides">
                      d{roll.die.sides}
                    </div>
                    <div className="rollResult" style={this.isCriticalRoll(roll)}>
                      {roll.sideSelected}
                    </div>
                  </div>
                  <div className="floatLeft">
                    <div className="rollSides">
                      +
                    </div>
                    <div className="rollResult">
                      +
                    </div>
                  </div>
                </div>
              )
            }
          });
          results.push(tempFinalResults);
        } else {
          count2++;
          let tempResults = dieRollResults[k].rolls.map((roll) => {
          count1++;
          return (
            <div key={`${keyValue1}${count1}`}>
              <div className="floatLeft">
                <div className="rollSides">
                  d{roll.die.sides}
                </div>
                <div className="rollResult" style={this.isCriticalRoll(roll)}>
                  {roll.sideSelected}
                </div>
              </div>
              <div className="floatLeft">
                <div className="rollSides">
                  +
                </div>
                <div className="rollResult">
                  +
                </div>
              </div>
            </div>
          )
          });
          results.push(tempResults);
        }
      }
      let totalModifier = "";
      let rollBreakDown = "Rolled ";
      dieRollResults.map((roll) => {
        rollBreakDown += `${roll.die.quantity}d${roll.die.sides} + `;
        totalModifier += `${roll.modifier} + `;
      })
      let newTotalModifier = totalModifier.slice(0, -3);
      // let newTotalModifier = totalModifier;
      rollBreakDown += `(${newTotalModifier})`;
      results = (
        <div>
          <div className="rollCalled">
            {rollBreakDown}
          </div>
          {results}
        </div>
      )
      // this.props.addMessageToStream(results);
      return (
        <div>
          {results}
        </div>
      )
    }
  }

  rollQuantityOfDice = (die) => {
    let rolls = [];
    let total = 0;

    // visualizes the break down of the roll
    // (i.e. what was the result of each die roll)

    for (var i = 0; i < die.quantity; i++) {
      let roll = {
        die: die,
        sideSelected: this.rollDie(die)
      };
      total += roll.sideSelected;
      rolls.push(roll);
    }

    total += die.modifier;

    let rollDetails = {
      rolls: rolls,
      total: total,
      modifier: die.modifier,
      die: die
    }
    return rollDetails;
  }

  rollSingleDie = (dieIndex) => {
    for (var i = 0; i < this.state.allDice.length; i++) {
      if (dieIndex === this.state.allDice[i].index) {
        this.props.addMessageToStream(this.displayRollResults([this.rollQuantityOfDice(this.state.allDice[i])]));
      }
    }
  }

  createDiceCardPanel = () => {
    let newDice;
    newDice = this.state.allDice.map((die) => {
      return (
        // <DiceCard key={die.index} die={die} setDieProperties={this.setDieProperties} removeDieFromRoll={this.removeDieFromRoll} rollSingleDie={this.rollSingleDie} displayDicePanelButtons={this.displayDicePanelButtons}/>
        <DiceCard key={die.index} die={die} setDieProperties={this.setDieProperties} removeDieFromRoll={this.removeDieFromRoll} rollSingleDie={this.rollSingleDie} />

      )
    });
    this.setState({allDiceCards: newDice});
  }

  addDieToRoll = () => {
    let newDie = {
      sides: 4,
      quantity: 1,
      modifier: 0,
      index: Math.random(),
      isVisible: true
    }
    this.state.allDice.push(newDie);
    this.setState({allDice: this.state.allDice});
    this.createDiceCardPanel();
  }

  clearAllDice = () => {
    // console.log("isPopupVisible: ", this.isPopupVisible());
    // if (this.state) {
      // while(this.state.allDice.length > 0) {
      //   this.state.allDice.pop();
      // }
      
      this.state.allDice.length = 0;
      this.setState({allDice: this.state.allDice});
      // this.setState({allDice: []});
      // this.setState({allDiceCards: []});
      this.createDiceCardPanel();
      this.addDieToRoll();
    // }
  }

  // isPopupVisible = (isVisible) => {
  //   if (isVisible) {
  //     this.state.styleDicePanelButtons = {display: "none"};
  //     this.setState({styleDiceButton: this.state.styleDicePanelButtons});
  //   } else {
  //     this.state.styleDicePanelButtons = {display: ""};
  //     this.setState({styleDiceButton: this.state.styleDicePanelButtons});
  //   }
  // }

  // displayDicePanelButtons = (isActive) => {
  //   if (isActive) {
  //     this.state.styleDicePanelButtons = {display: "none"};
  //     this.setState({styleDicePanelButtons: this.state.styleDicePanelButtons});
  //   } else {
  //     this.state.styleDicePanelButtons = {display: ""};
  //     this.setState({styleDicePanelButtons: this.state.styleDicePanelButtons});
  //   }
  // }

  setDieProperties = (die) => {
    if (this.state.allDice) {
      for (var i = 0; i < this.state.allDice.length; i++) {
        if (die.index === this.state.allDice[i].index) {
          this.state.allDice[i].sides = die.sides;
          this.state.allDice[i].quantity = die.quantity;
          this.state.allDice[i].modifier = die.modifier;
          this.state.allDice[i].isVisible = die.isVisible;
          this.setState({
            allDice: this.state.allDice
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

  rollAllDice = () => {
    let allRolls = [];
    let totalRollOutput = {};
    console.log("this.state.allDice.length: ", this.state.allDice.length);
    for (var i = 0; i < this.state.allDice.length; i++) {
      let roll = this.rollQuantityOfDice(this.state.allDice[i]);
      console.log("roll: ", roll);
      allRolls.push(roll);
    }
    console.log("allRolls: ", allRolls);
    for (var j = 0; j < allRolls.length; j++) {

    }
    this.props.addMessageToStream(this.displayRollResults(allRolls));
    
    // alert("You throw the dice off the table...");
  }

  testDiceRollResults = () => {
    // currently this function is testing rolls and printing out 
    // results for how many times each side is rolled for a given
    // amount of total rolls (testing shows that each side is coming
    // up at the proper averages)
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
  }

  componentDidMount() {
    this.addDieToRoll();
    this.testDiceRollResults();
    // this.rollQuantityOfDice({sides: 4, quantity: 4, modifier: 0, index:0.234567})
  }

  render() {

    return (
      <div>
        <div className="dicePanel">
          <div className="dicePanelButtons floatRight" style={this.state.styleDicePanelButtons} onMouseOver={() => {
            console.log("here");
          }}>
            <div className="addDieButton floatLeft" onClick={() => {this.addDieToRoll();}}>
              + Add die
            </div>
            <div className="clearDieButton floatLeft" onClick={() => {this.clearAllDice();}}>
              - Clear all
            </div>
            <div className="clear"></div>
          </div>
          <div>
            <div className="rollButton" onClick={() => {this.rollAllDice();}}>
              <div className="rollDieText">
                Roll All Dice <span><i className="fa fa-share-square-o rollAllDiceIcon" aria-hidden="true"></i></span>
              </div>
              
            </div>
          </div>
          <div className="clear"></div>
          {this.state.allDiceCards}
        </div>
      </div>
    );
  }
}

export default AllDicePanel;
