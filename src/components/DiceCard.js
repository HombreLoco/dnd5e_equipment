import React, { Component } from 'react';



class DiceCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dice: {
        sides: [4, 6, 8, 10, 12, 20, 100]
      },
      selectQuantityValue: 1,
      selectSidesValue: 4,
      sidesPanelVisible: false,
      sidesPanelStyle: {display: "none"},
    }
    this.hideSidesPopup = this.hideSidesPopup.bind(this);
    this.showSidesPopup = this.showSidesPopup.bind(this);
    this.handleSelectSides = this.handleSelectSides.bind(this);
    this.handleUpdateDice =this.handleUpdateDice.bind(this);
    
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

  handleUpdateDice = (die) => {

    console.log("dicecard-die", die);
    this.props.setDieProperties({sides: die.sides, quantity: die.quantity, index: die.index});
  }

  handleSelectSides = (sides) => {
    let currentDie = {
      index: this.props.die.index,
      sides: sides,
      quantity: this.state.selectQuantityValue
    }
    this.setState({selectSidesValue: sides});
    
    //then update die info on parent component- may need to be callback
    this.handleUpdateDice(currentDie);
  }

  handleSelectQuantity = (quantity) => {
    let currentDie = {
      index: this.props.die.index,
      sides: this.state.selectSidesValue,
      quantity: quantity
    }
    this.setState({selectQuantityValue: quantity});
    
    //then update die info on parent component- may need to be callback
    this.handleUpdateDice(currentDie);
  }

  createSidesPopup = () => {
    let diePanel;
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

  hideSidesPopup = () => {
    this.setState({sidesPanelVisible: false});
    this.setState({sidesPanelStyle: {display: "none"}});
    document.removeEventListener('click', this.hideSidesPopup, false);
  }

  showSidesPopup = () => {
    if (!this.state.sidesPanelVisible) {
      this.setState({sidesPanelVisible: true});
      this.setState({sidesPanelStyle: {}});
      document.addEventListener('click', this.hideSidesPopup, false);
    }
  }



  showQuantityPopup = () => {
    // show the popup with a number selector
    // maybe already have 
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
        <div className="clear"></div>
      </div>
    );
  }
}

export default DiceCard;
