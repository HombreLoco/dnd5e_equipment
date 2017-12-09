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
      sidesPanelVisible: false,
      quantityPanelVisible: false,
      sidesPanelStyle: {display: "none"},
      quantityPanelStyle: {display: "none"},
      showRemoveIcon: {display: "none"}
      
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
        <div className="sidesLabel"># of Dice</div>
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
          <input type="button" className="quantityInputButton" value="+" onClick={() => {
            this.hideQuantityPopup();
          }}/>
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

  componentDidMount() {
  }

  render() {

    return (
      <div onMouseEnter={() => {this.setState({showRemoveIcon: {display: ""}})}}
        onMouseLeave={() => {this.setState({showRemoveIcon: {display: "none"}})}}
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
        <div className="removeDie" style={this.state.showRemoveIcon} onClick={() => {
          if (this.state.sidesPanelVisible) {
            this.hideSidesPopup();
          } else if (this.state.quantityPanelVisible) {
            this.hideQuantityPopup();
          }
          this.props.removeDieFromRoll(this.props.die);
        }}>
          {/* <div className=""> */}
            <i className="fa fa-trash" aria-hidden="true"></i>
          {/* </div> */}
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default DiceCard;
