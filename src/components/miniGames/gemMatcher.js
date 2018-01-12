import React, { Component } from 'react';
import allGemstones from '../../data/allGemstones.json';
import GemPanel from './gemPanel.js';

// The GemMatcher is a component that will be used as a mini-game
// for players to collect gems based on their propability of 
// success roll. Maybe have it that a player gets an amount 
// of time based on the player's roll (maybe a roll of 20 gets 
// them 10 or 20 seconds to play the game in an attempt to
// make as many matches as possible, each match counting as a 
// gem found (possibly use this as one way to mine gems))

class GemMatcher extends Component {

  constructor(props) {
    super(props);
    this.state = {
        panelSize: 6,
        panelCssStyle: {},
        allGemsForPanels: [],
        allGemPanels: [],
        numberOfCardsVisible: 0,
        cardPanelsVisible: []
    }
  }

  randomizeGemPanels = (gems) => {
    let currentIndex = gems.length, tempValue, randomIndex;
    while(currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      tempValue = gems[currentIndex];
      gems[currentIndex] = gems[randomIndex];
      gems[randomIndex] = tempValue;
    }
    return gems;
  }

  createGemsForPanels = (gems) => {
    let tempGemsForPanels = [];
    for (var k = 0; k < this.state.panelSize; k++) {
      let groupKey = Math.random(); 
      for (var l = 0; l < this.state.panelSize; l++) {
        tempGemsForPanels.push(
          {
            gemData: gems[k],
            groupKey: groupKey,
            index: l,
            cardVisible: false,
            gemPanelStyle: {visibility: "hidden"}
          }
        );
      }
    }
    tempGemsForPanels = this.randomizeGemPanels(tempGemsForPanels);
    return tempGemsForPanels;
  }

  checkIfCardsMatch = () => {
    let matched = false;
    let tempArray = this.state.cardPanelsVisible;
    console.log("tempArray: ", tempArray);
    console.log("MAYBE MATCHED1!", tempArray[0].groupKey, tempArray[1].groupKey);

    if (tempArray[0].groupKey === tempArray[1].groupKey) {
      console.log("MATCHED2!", tempArray[0].groupKey, tempArray[1].groupKey);
      matched = true;

    } 

    // tempArray.length = 0;
    // this.setState({cardPanelsVisible: tempArray});
    return matched;
  }

  flipGemPanel = (gemPanel, panelStyle, panelVisible) => {
    let tempGemArray = this.state.allGemsForPanels;
    // console.log("in flipGemPanel");
    console.log("this.state.cardPanelsVisible0: ", this.state.cardPanelsVisible);
    for (var i = 0; i < tempGemArray.length; i++) {
      if (tempGemArray[i].groupKey === gemPanel.groupKey && tempGemArray[i].index === gemPanel.index) {
        let tempVisibleGemArray = this.state.cardPanelsVisible;
        if (!tempGemArray[i].cardVisible) {
          let count = this.state.numberOfCardsVisible;
          count++;
          tempGemArray[i].gemPanelStyle = {visibility: ""};
          tempGemArray[i].cardVisible = true;
          panelStyle = {visibility: ""};
          panelVisible = true;
          tempVisibleGemArray.push(tempGemArray[i]);
          this.setState({cardPanelsVisible: tempVisibleGemArray});
          this.setState({numberOfCardsVisible: count});

          if (count === 2) {
            this.setState({numberOfCardsVisible: 0});
            let matched = this.checkIfCardsMatch();
            if (matched) {
              let tempA = [];
              this.setState({cardPanelsVisible: tempA});
              //TODO: make cards disapear or blackout
              console.log("MATCHED0");
            } else {
              //TODO: flip both cards back over after 1 sec or faster
              console.log("NOT MATCHED0");
            }
          }
        } else {
          if (this.state.cardPanelsVisible.length > 0 && (this.state.cardPanelsVisible[0] === gemPanel)) {
            console.log("here1234");
            this.setState({cardPanelsVisible: []});
            this.setState({numberOfCardsVisible: 0});
          }
          tempGemArray[i].gemPanelStyle = {visibility: "hidden"};
          tempGemArray[i].cardVisible = false;
          panelStyle = {visibility: "hidden"};
          panelVisible = false;
        }
        this.setState({allGemPanels: tempGemArray});
        return {panelStyle: panelStyle, panelVisible: panelVisible};
      }
    }
  }

  createGemPanelBoard = () => {
    let gems = [];
    let fullGemPanels = [];
    for (var i = 0; i < this.state.panelSize; i++) {
      gems.push(allGemstones[i]);
    }
    let tempGemArray = this.createGemsForPanels(gems);
    let count = 0;

    tempGemArray.map((gem) => {
      if (count === parseInt(this.state.panelSize, 10)) {
        count = 0;  
        fullGemPanels.push(<div key={Math.random()} className="clear"></div>);
      }
      count++; 
      fullGemPanels.push(
        <GemPanel key={`${gem.groupKey}${gem.index}`} gem={gem} flipGemPanel={this.flipGemPanel} />
      );
    });

    this.setState({allGemsForPanels: tempGemArray});
    this.setState({allGemPanels: fullGemPanels});
    return (
      <div className="gemMatcherPanel" style={this.state.panelCssStyle}>
        <div className="fullGemPanel" >
          {fullGemPanels}
          <div key={Math.random()} className="clear"></div>
        </div>
      </div>
    )
  }

  sendGamePanelToFeed = (gamePanelMessage) => {
    // this.createGemPanelBoard();
    this.props.addMessageToStream(gamePanelMessage);
  }

  componentDidMount() {
  }

  render() {

    return (
      <div className="">
        <button className="gemMatcherButton" onClick={(e) => {
          this.sendGamePanelToFeed(this.createGemPanelBoard());
        }}>
          Gem Matcher
        </button>
        <input className="gemMatcherInput" type="number" defaultValue={0} min={0} />
      </div>
    )
  }
}

export default GemMatcher;