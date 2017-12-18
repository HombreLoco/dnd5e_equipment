import React, { Component } from 'react';
import DieRollVisualizer from './DieRollVisualizer.js';



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
      showDieButtons: {display: "none"},
      dieVisualizer: ""
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
    this.props.setDieProperties({sides: die.sides, quantity: die.quantity, index: die.index, modifier: die.modifier});
  }

  handleSelectSides = (sides) => {
    let currentDie = {
      index: this.props.die.index,
      sides: sides,
      quantity: this.state.selectQuantityValue,
      modifier: this.state.selectBonusValue
    }
    this.setState({selectSidesValue: sides});
    
    //then update die info on parent component- may need to be callback
    this.handleUpdateDice(currentDie);
  }

  handleSelectQuantity = (quantity) => {
    let currentDie = {
      index: this.props.die.index,
      sides: this.state.selectSidesValue,
      quantity: quantity,
      modifier: this.state.selectBonusValue
    }
    this.setState({selectQuantityValue: quantity});
    
    //then update die info on parent component- may need to be callback
    this.handleUpdateDice(currentDie);
  }

  handleSelectBonus = (modifier) => {
    let currentDie = {
      index: this.props.die.index,
      sides: this.state.selectSidesValue,
      quantity: this.state.selectQuantityValue,
      modifier: modifier
    }
    this.setState({selectBonusValue: modifier});
    
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
    e.preventDefault();
    e.stopPropagation();
    if (!this.isDecendant(this.refs.quantityPopup, e.target)) {
      this.hideQuantityPopup();
      // this.handleSelectQuantity(//what goes here?);      
    }
    this.handleSelectBonus(this.state.selectBonusValue);
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
    return (
      <div className="quantityPopupPanel" style={this.state.quantityPanelStyle} ref="quantityPopup" 
      onClick={(e) => {
        e.stopPropagation();
      }}>
        <div className="quantityInputLabel"># of Dice</div>
        <div>
          <button type="button" className="quantityInputButton" onClick={() => {
            this.hideQuantityPopup();
            this.handleSelectQuantity(this.state.selectQuantityValue);
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
                  this.handleSelectQuantity(this.state.selectQuantityValue);
                  
                }
              }}/>
          </div>
        </div>
      </div>
    )
  }

  clickedOffBonusInput = (e) => {
    e.preventDefault();
    if (!this.isDecendant(this.refs.bonusPopup, e.target)) {
      this.handleSelectBonus(this.state.selectBonusValue);
      this.hideBonusPopup();
    }
    this.handleSelectBonus(this.state.selectBonusValue);
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
      }}
      >
        {bonusPanel}
        <div className="bonusInputLabel">Modifier</div>
        <div>
          <button type="button" className="bonusInputButton" onClick={() => {
            this.hideBonusPopup();
            this.handleSelectBonus(this.state.selectBonusValue);
            
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
                  this.handleSelectBonus(this.state.selectBonusValue);
                }
              }}/>
          </div>
        </div>
      </div>
    )
  }

  populateDieRollVisualizer = () => {

    this.setState({dieVisualizer:this.props.rollSingleDie(this.props.die.index)})
  }

  checkIfPanelVisibleOnMouseOver = () => {
    if (this.state.sidesPanelVisible || this.state.quantityPanelVisible || this.state.bonusPanelVisible) {
      {this.setState({showDieButtons: {display: "none"}})}
    } else {
      {this.setState({showDieButtons: {display: ""}})}
    }
  }

  componentDidMount() {
  }

  render() {

    return (
      <div onMouseLeave={() => {this.setState({showDieButtons: {display: "none"}})}}
        onMouseOver={() => {this.setState({showDieButtons: {display: ""}})}}
      >
        <div className="dieRollVisualizer">
          {this.state.dieVisualizer}
        </div>
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
              this.setState({selectSidesValue: this.state.selectSidesValue});
              this.hideSidesPopup();
            } else if (this.state.quantityPanelVisible) {
              this.setState({selectQuantityValue: this.state.selectQuantityValue});
              this.hideQuantityPopup();
            } else if (this.state.bonusPanelVisible) {
              this.setState({selectBonusValue: this.state.selectBonusValue});
              this.hideBonusPopup();
            }
            this.populateDieRollVisualizer();
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
