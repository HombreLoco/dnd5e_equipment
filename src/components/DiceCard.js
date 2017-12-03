import React, { Component } from 'react';



class DiceCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dice: {
        sides: [4, 6, 8, 10, 12, 20, 100]
      },
      dieSelected: 4,
      selectQuantityValue: 1,
      selectSidesValue: 4,
      sidesPanelVisible: false,
      sidesPanelStyle: {display: "none"},
    }
    this.rollDice = this.rollDice.bind(this);
    this.hideSidesPopup = this.hideSidesPopup.bind(this);
    this.showSidesPopup = this.showSidesPopup.bind(this);
    this.handleSelectSides = this.handleSelectSides.bind(this);
    
    
  }

  createDiceCard = (item) => {
  }

  displayDiceDropDown = () => {
    return (
      <select defaultValue={this.state.selectValue} className="diceDropDown">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>
    )
  }

  handleSelectSides = (sides) => {
    this.setState({selectSidesValue: sides});
  }

  rollDice = (sides, quantity) => {
    alert("You throw the dice off the table...");
  }

  showQuantityPopup = () => {
    // show the popup with a number selector
    // maybe already have 
  }

  createSidesPopup = () => {
    let diePanel;
    // show the popup with a panel with each die on it (ex. "d4")
    // loop to create panel, set default value of each item based on dice sides
    // set state based on e.target.value of the onSelect property of each die type
    diePanel = this.state.dice.sides.map((numSide) => {
      return (
        <div className="sidesPanel centerText" key={numSide} defaultValue={numSide} onClick={() => {this.handleSelectSides(numSide);}}>
          d{numSide}
        </div>
      )      
    });
    diePanel = (
      <div className="sidesPopupPanel" style={this.state.sidesPanelStyle} ref={node => {this.node = node;}}>
        {diePanel}
        <div className="sidesPanel centerText" key={"43767574446f"}>
          Cust
        </div>
      </div>
    )
    return diePanel;
  }

  showSidesPopup = () => {
    if (!this.state.sidesPanelVisible) {
      this.setState({sidesPanelVisible: true});
      this.setState({sidesPanelStyle: {}});
      document.addEventListener('click', this.hideSidesPopup, false);
    }
  }

  hideSidesPopup = () => {
    this.setState({sidesPanelVisible: false});
    this.setState({sidesPanelStyle: {display: "none"}});
    document.removeEventListener('click', this.hideSidesPopup, false);
  }

  componentDidMount() {
  }

  render() {

    return (
      <div>
        <div className="dieQuantity" onClick={() => {this.showQuantityPopup();}}>
          <div className="centerText">
            {this.state.selectQuantityValue}
          </div>
        </div>
        <div className="dieSelector" onClick={() => {this.showSidesPopup();}}>
          {this.createSidesPopup()}
          <div className="centerText">
            d{this.state.selectSidesValue}
          </div>
        </div>
        <div className="rollButton" onClick={() => {this.rollDice();}}>
          <div className="centerText">
            Roll
          </div>
        </div>
        <div className="clear">
        </div>
      </div>
    );
  }
}

export default DiceCard;
