import React, { Component } from 'react';


class DiceCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dice: {
        sides: [4, 6, 8, 10, 12, 20, 100]
      },
      selectSidesValue: 4,
      selectQuantityValue: 1,
      selectBonusValue: 0,
      sidesPanelVisible: false,
      quantityPanelVisible: false,
      bonusPanelVisible: false,
      sidesPanelStyle: {display: "none"},
      quantityPanelStyle: {display: "none"},
      bonusPanelStyle: {display: "none"},
      showDieButtons: {display: "none"}
    }
    this.hideSidesPopup = this.hideSidesPopup.bind(this);
    this.hideQuantityPopup = this.hideQuantityPopup.bind(this);
    this.showSidesPopup = this.showSidesPopup.bind(this);
    this.showQuantityPopup = this.showQuantityPopup.bind(this);
    this.handleSelectSides = this.handleSelectSides.bind(this);
    this.handleSelectQuantity = this.handleSelectQuantity.bind(this);    
    this.handleUpdateDice =this.handleUpdateDice.bind(this);
    
  }

  handleUpdateDice = (die) => {
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

  createSidesPopup = () => {
    let sidePanel;
    sidePanel = this.state.dice.sides.map((numSide) => {
      return (
        <div className="sidesPanel centerText" key={numSide} defaultValue={numSide} onClick={() => {this.handleSelectSides(numSide);}}>
          d{numSide}
        </div>
      )      
    });
    sidePanel = (
      <div className="sidesPopupPanel" style={this.state.sidesPanelStyle} ref={node => {this.node = node;}}>
        <div className="sidesLabel">Type of Die</div>
        {sidePanel}
        <div className="sidesPanel centerText" key={"43767574446f"}>
          Cust
        </div>
      </div>
    );
    return sidePanel;
  }

  isDecendant = (parent, child) => {
    let tempNode = child.parentNode;
    while (tempNode != null) {
      if (tempNode === parent) {
        return true;
      }
      tempNode = tempNode.parentNode;
    }
    return false;
  }

  clickedOffQuantityInput = (e) => {
    if (!this.isDecendant(this.refs.quantityPopup, e.target)) {
      this.hideQuantityPopup();
    }
  }

  hideQuantityPopup = () => {
    this.setState({quantityPanelVisible: false});
    this.setState({quantityPanelStyle: {display: "none"}});
    document.removeEventListener('click', this.clickedOffQuantityInput, false);
  }

  showQuantityPopup = () => {
    if (!this.state.quantityPanelVisible) {
      this.setState({quantityPanelVisible: true});
      this.setState({quantityPanelStyle: {}});
      document.addEventListener('click', this.clickedOffQuantityInput, false);
    }
  }

  createQuantityPopup = () => {
    let quantityPanel;
    return (
      <div className="quantityPopupPanel" style={this.state.quantityPanelStyle} ref="quantityPopup" 
      onClick={(e) => {
        e.stopPropagation();
      }}>
        {quantityPanel}
        <div className="quantityInputLabel"># of Dice</div>
        <div>
          <button type="button" className="quantityInputButton" onClick={() => {
            this.hideQuantityPopup();
          }}>
            <i className="fa fa-check-circle" aria-hidden="true"></i>
          </button>
          <div className="quantityDiv">
            <input className="quantityInput" type="number" defaultValue={this.state.selectQuantityValue} min="1" required 
              onChange={(e) => {
                const re = /^[0-9\b]+$/;
                if ((e.target.value !== '' || e.target.value !== null) && re.test(e.target.value)) {
                  let userInput = parseInt(e.target.value, 10);
                  if (!isNaN(userInput)) {
                    this.setState({selectQuantityValue: userInput});
                  }
                } else {
                  e.preventDefault();
                }
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  this.hideQuantityPopup();
                }
              }}/>
          </div>
        </div>
      </div>
    )
  }

  clickedOffBonusInput = (e) => {
    if (!this.isDecendant(this.refs.bonusPopup, e.target)) {
      this.hideBonusPopup();
    }
  }

  hideBonusPopup = () => {
    this.setState({bonusPanelVisible: false});
    this.setState({bonusPanelStyle: {display: "none"}});
    document.removeEventListener('click', this.clickedOffBonusInput, false);
  }

  showBonusPopup = () => {
    if (!this.state.bonusPanelVisible) {
      this.setState({bonusPanelVisible: true});
      this.setState({bonusPanelStyle: {}});
      document.addEventListener('click', this.clickedOffBonusInput, false);
    }
  }

  createBonusPopup = () => {
    let bonusPanel;
    return (
      <div className="bonusPopupPanel" style={this.state.bonusPanelStyle} ref="bonusPopup" 
      onClick={(e) => {
        e.stopPropagation();
      }}>
        {bonusPanel}
        <div className="bonusInputLabel">Modifier</div>
        <div>
          <button type="button" className="bonusInputButton" onClick={() => {
            this.hideBonusPopup();
          }}>
            <i className="fa fa-check-circle" aria-hidden="true"></i>
          </button>
          <div className="bonusDiv">
            <input className="bonusInput" type="number" defaultValue={this.state.selectBonusValue}
              onChange={(e) => {
                const re = /-?\d+/;
                if ((e.target.value !== '' || e.target.value !== null) && re.test(e.target.value)) {
                  let userInput = parseInt(e.target.value, 10);
                  if (!isNaN(userInput)) {
                    this.setState({selectBonusValue: userInput});
                  }
                } else {
                  e.preventDefault();
                }
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  this.hideBonusPopup();
                }
              }}/>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
  }

  render() {

    return (
      <div onMouseLeave={() => {this.setState({showDieButtons: {display: "none"}})}}
        onMouseOver={() => {this.setState({showDieButtons: {display: ""}})}}
      >
        <div className="dieQuantity" onClick={() => {this.showQuantityPopup();}}>
          {this.createQuantityPopup()}
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
        <div className="rollBonus" onClick={() => {this.showBonusPopup();}}>
          {this.createBonusPopup()}
          <div className="centerText">
            {this.state.selectBonusValue}
          </div>
        </div>
        <div className="dieButtons" style={this.state.showDieButtons} >
          <div className="removeDie" onClick={() => {
            if (this.state.sidesPanelVisible) {
              this.hideSidesPopup();
            } else if (this.state.quantityPanelVisible) {
              this.hideQuantityPopup();
            }
            this.props.removeDieFromRoll(this.props.die);
          }}>
              <i className="fa fa-trash" aria-hidden="true"></i>
          </div>
          <div className="rollSingleDie" onClick={() => {
            if (this.state.sidesPanelVisible) {
              this.hideSidesPopup();
            } else if (this.state.quantityPanelVisible) {
              this.hideQuantityPopup();
            }
            this.props.rollSingleDie(this.props.die.index);
          }}>
            <i className="fa fa-share-square-o" aria-hidden="true"></i>
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default DiceCard;
