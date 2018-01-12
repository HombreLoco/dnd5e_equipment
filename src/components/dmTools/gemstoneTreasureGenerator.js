import React, { Component } from 'react';
import allGemstones from '../../data/allGemstones.json';
import componentProperties from '../../lib/componentProperties.js';


// This treasure generator is for DM random rolls to determine
// the type of gemstone found in a treasure trove. There are 
// different generators based on different GP values

class GemstoneTreasureGenerator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gemstones: [
        {
          gemValue: 10,
          gemQuantity: 0,
          isMixed: false,
          randomPercent: 0
        },
        {
          gemValue: 50,
          gemQuantity: 0,
          isMixed: false,
          randomPercent: 0
        },
        {
          gemValue: 100,
          gemQuantity: 0,
          isMixed: false,
          randomPercent: 0
        },
        {
          gemValue: 500,
          gemQuantity: 0,
          isMixed: false,
          randomPercent: 0
        },
        {
          gemValue: 1000,
          gemQuantity: 0,
          isMixed: false,
          randomPercent: 0
        },
        {
          gemValue: 5000,
          gemQuantity: 0,
          isMixed: false,
          randomPercent: 0
        }
      ],
      treasureSelected: [],
      gemValueSelectors: [],
      styleRandomDropDown: {maxHeight: "0"},
      gemPercentageSelectors: [],
      gemPercentagePanelVisible: false,
      gemRandomQuantity: 0
    }
  }

  updateTreasureQuantity = (gemstoneValue, gemstoneQuantity) => {
    let tempGemstones = this.state.gemstones;
    for (var i = 0; i < tempGemstones.length; i++) {
      if (gemstoneValue === tempGemstones[i].gemValue) {
        tempGemstones[i].gemQuantity = gemstoneQuantity;
        this.setState({gemstones: tempGemstones});
      }
    }
  }

  updateGemPercentages = (gemstoneValue, event) => {
    let tempGemstones = this.state.gemstones;
    if (parseInt(event.target.value, 10) >= 100) {
      event.preventDefault();
      event.target.value = 100;
    }
    for (var i = 0; i < tempGemstones.length; i++) {
      if (gemstoneValue === tempGemstones[i].gemValue) {
        tempGemstones[i].randomPercent = parseInt(event.target.value, 10);
        this.setState({gemstones: tempGemstones});
      }
    }
  }
  
  switchIsMixed = (gemValue) => {
    let tempGemstones = this.state.gemstones;
    for (var i = 0; i < tempGemstones.length; i++) {
      if (gemValue === tempGemstones[i].gemValue) {
        tempGemstones[i].isMixed = !tempGemstones[i].isMixed;
        this.setState({gemstones: tempGemstones});
      }
    }
  }

  setRandomGemQuantity = (e) => {
    let quantityValue = parseInt(e.target.value, 10);
    this.setState({gemRandomQuantity: quantityValue});
  }

  getPercentageTotal = () => {
    let percentTotal = 0;
    for (var i = 0; i < this.state.gemstones.length; i++) {
      percentTotal += this.state.gemstones[i].randomPercent;
    }
    return percentTotal;
  }

  adjustPercentageTotal = (percentTotal) => {
    console.log("percentTotal: ", percentTotal);
    var tempGemstones = this.state.gemstones.map((gem) => {
      return (
        {
          gemValue: gem.gemValue,
          gemQuantity: gem.gemQuantity,
          isMixed: gem.isMixed,
          randomPercent: gem.randomPercent
        }
      )
    });
    if (percentTotal < 100) {
      while (percentTotal < 100) {
        for (var j = 0; j < tempGemstones.length; j++) {
          if (percentTotal < 100) {
            if (tempGemstones[j].randomPercent > 1) {
              tempGemstones[j].randomPercent++;
              percentTotal++;
            }
          }
        }
      }
    } else if (percentTotal > 100) {
      while (percentTotal > 100) {
        for (var k = 0; k < tempGemstones.length; k++) {
          if (percentTotal > 100) {
            if (tempGemstones[k].randomPercent > 2) {
              tempGemstones[k].randomPercent--;
              percentTotal--;
            }
          }
        }
      }
    } else {
      // run code after balancing percentages to a total of 100
      console.log("reached 100%");
    }
    console.log("tempGemstones1: ", tempGemstones);
    return tempGemstones;
  }

  createGemDieSide = (tempGemstones) => {
    console.log("tempGemstones2: ", tempGemstones);
    let randomGemSides = [];
    for (var i = 0; i < tempGemstones.length; i++) {
      if (tempGemstones[i].randomPercent > 0) {
        for (var j = 0; j < tempGemstones[i].randomPercent; j++) {
          tempGemstones[i].gemQuantity = 1;
          randomGemSides.push(tempGemstones[i]);
        }
      }
    }
    console.log("randomGemSides: ", randomGemSides);
    return randomGemSides;
  }

  generateRandomGemCollection = () => {

    let percentTotal = this.getPercentageTotal();
    let tempGemstones;
    let selectedRandomGemValues = [];

    if (percentTotal && percentTotal > 0) {
      tempGemstones = this.adjustPercentageTotal(percentTotal);
    }

    if (tempGemstones) {
      tempGemstones = this.createGemDieSide(tempGemstones);
      for (var i = 0; i < this.state.gemRandomQuantity; i++) {
        let randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
        selectedRandomGemValues.push(tempGemstones[randomNumber]);
      }
    }

    console.log("selectedRandomGemValues: ", selectedRandomGemValues);
    if (selectedRandomGemValues.length > 0) {
      this.generateTreasure(selectedRandomGemValues);
    }
  }

  createGemPercentageSelectors = () => {
    let selectors = [];
    for (var i = 0; i < this.state.gemstones.length; i++) {
      let gv = this.state.gemstones[i];
      let div = (
        <div key={this.state.gemstones[i].gemValue} className="percentGemSelector">
          <div className="percentSelect">
            <input className="percentInput" type="number" defaultValue={this.state.gemstones[i].randomPercent} min={0} max={100}
            // <input className="percentInput" type="number" defaultValue={0.00} min={0} max={100} step="0.01"
            onKeyDown={(e) => {
              if (e.keyCode === 190) {
                e.preventDefault();
                
              }
            }}
            onChange={(e) => {
              const re = /-?\d+/;
              if ((e.target.value !== '' || e.target.value !== null) && re.test(e.target.value)) {
                if (e.target.value.length > 1 && (e.target.value[0] === 0 || e.target.value[0] === "0")) {
                  let inputValue = e.target.value;
                  let newInput = inputValue.slice(1);
                  e.target.value = newInput;
                }
                this.updateGemPercentages(gv.gemValue, e);
              } else {
                e.preventDefault();
              }
            }}
            onBlur={(e) => {
              if (e.target.value === undefined || e.target.value === null || e.target.value === "") {
                e.target.value = "0";
              }
            }}
            />
          </div>
          <div className="clear"></div>
          <div className="percentPercent">
            %
          </div>
        </div>
      )
    selectors.push(div);
    }
    this.setState({gemPercentageSelectors: selectors});
  }

  createGemSelectors = () => {
    let selectors = [];
    for (var j = 0; j < this.state.gemstones.length; j++) {
      let gv = this.state.gemstones[j];
      var div = (
        <div key={this.state.gemstones[j].gemValue} className="individualGemSelector">
          <div className="gemValue">
            {this.state.gemstones[j].gemValue} gp
          </div>
          <div className="quantitySelect">
            <input className="quantityInput" type="number" defaultValue={gv.gemQuantity}
            onChange={(e) => {
              this.updateTreasureQuantity(gv.gemValue, parseInt(e.target.value, 10));
            }}
            />
          </div>
          <div className="toggleRandomGems">
            <input className="gemCheckbox" name="randomGems" type="checkbox"
              onChange={() => {
                this.switchIsMixed(gv.gemValue);
              }}
            />
          </div>
          <div className="clear"></div>
        </div>
      );
      selectors.push(div);
    }
    this.setState({gemValueSelectors: selectors});
  }

  getAllGemstones = () => {
    console.log("all gemstones: ", allGemstones);

  }

  selectRandomGem = (gemValue) => {
    let currentGems = [];
    allGemstones.map((gemstone) => {
      if (gemstone.cost.quantity === gemValue) {
        currentGems.push(gemstone);
      }
      return null;
    });
    let randomGemID = componentProperties.rollDie({sides: currentGems.length});

    for (var i = 0; i < currentGems.length; i++) {
      if (currentGems[i].dieSide === randomGemID) {
        return currentGems[i];
      }
    }
  }

  getGemColor = (gem) => {
    if (gem.color.length === 1) {
      return gem.color[0];
    }
    let min = Math.ceil(0);
    let max = Math.floor(gem.color.length);
    let randomIndex = Math.floor(Math.random() * (max - min) + min);
    let randomColor = gem.color[randomIndex];
    return randomColor;
  }

  displayTreasureMessage = (treasure) => {
    let treasureOutput = treasure.map((gem) => {
      let keyIndex1 = Math.random();
      let gemColor = this.getGemColor(gem);
      return (
        <div key={keyIndex1} className="singleGemColor">
          <div className="cutDiamond">
            <div className="topLeftDiamondAngle" style={{borderBottomColor: gemColor}}>   
            </div>
            <div className="topDiamondFlat" style={{borderTopColor: gemColor}}>
            </div>
            <div className="topRightDiamondAngle" style={{borderBottomColor: gemColor}}>
            </div>
            <div className="clear"></div>
            <div className="bottomDiamondAngles" style={{borderTopColor: gemColor}}>
            </div>
          </div>
          <div className="gemName">
            {gem.name} ({gem.quantity}) - {gem.cost.quantity}gp
          </div>
          <div className="clear"></div>
        </div>
      )
    });
    let keyIndex2 = Math.random();
    return (
      <div key={keyIndex2} className="treasureMessage">
          <div className="treasureInnerContainer">
          <div className="treasureHeader">
            Treasure Found!
          </div>
          <div className="gemLines">
            <div className="lineTop1">
            </div>
            <div className="lineTop2">
            </div>
            <div className="lineTop3">
            </div>
          </div>
          <div className="treasureBody">
            {treasureOutput}
          </div>
          </div>
        </div>
    );
  }

  generateTreasure = (gemstones) => {
    let treasure = [];
    for (var i = 0; i < gemstones.length; i++) {
      if (gemstones[i].gemQuantity > 0) {
        if (gemstones[i].gemQuantity > 1 && !gemstones[i].isMixed) {
          let gem = this.selectRandomGem(gemstones[i].gemValue);
          gem.quantity = gemstones[i].gemQuantity;
          treasure.push(gem);
        } else {
          for (var j = 0; j < gemstones[i].gemQuantity; j++) {
            let gem = this.selectRandomGem(gemstones[i].gemValue);
            gem.quantity = 1;
            treasure.push(gem);
          }
        }
      }
    }
    this.setState({treasure: treasure});

    if (treasure.length !== 0) {
      this.props.addMessageToStream(this.displayTreasureMessage(treasure));
    }
    return treasure;
  }

  toggleRandomDropDown = () => {
    let gemPVisible = this.state.gemPercentagePanelVisible;
    let styleSetting = this.state.styleRandomDropDown;
    if (gemPVisible) {
      gemPVisible = false;
      styleSetting = {maxHeight: "0"}
    } else {
      gemPVisible = true;
      styleSetting = {maxHeight: "200px"}
    }
    this.setState({gemPercentagePanelVisible: gemPVisible});
    this.setState({styleRandomDropDown: styleSetting});
  }

  resetTreasure = (e) => {

    //TODO: reset all inputs back to zero

    //TODO: BUG - The "Reset" button on the gemstone treasure 
    //generator is not resetting the input values back to 0

    console.log("this.state.gemValueSelectors: ", this.state.gemValueSelectors);
    console.log("this.state.gemstones: ", this.state.gemstones);
    console.log("this.state.treasureSelected: ", this.state.treasureSelected);

    let tempGemstones = this.state.gemstones;

    for (var i = 0; i < tempGemstones.length; i++) {
      tempGemstones[i].gemQuantity = 0;
      tempGemstones[i].isMixed = false;
      tempGemstones[i].randomPercent = 0;
      this.setState({gemstones: tempGemstones});
    }

    let tempGemArray = this.state.treasureSelected;
    tempGemArray.length = 0;
    this.setState({treasureSelected: tempGemArray});

    let tempSelectorArray = this.state.gemValueSelectors;
    tempSelectorArray.length = 0;
    this.setState({gemValueSelectors: tempSelectorArray});

    console.log("this.state.gemValueSelectors: ", this.state.gemValueSelectors);
    console.log("this.state.gemstones: ", this.state.gemstones);
    console.log("this.state.treasureSelected: ", this.state.treasureSelected);
  }


  componentDidMount() {
    this.getAllGemstones();
    this.createGemSelectors();
    this.createGemPercentageSelectors();
  }

  render() {

    return (
      <div>
        <div className="gemstonePanel">
          <div className="gemstoneTreasureGeneratorLabel">
            Gemstone Treasure Generator
          </div>
          <div className="gemstoneTreasureGeneratorSection">
            <div className="gemstoneGenerateButton" onClick={() => {
                this.generateTreasure(this.state.gemstones);
              }
            }>
              Generate <i className="fa fa-share-square-o generateIcon" aria-hidden="true"></i>
            </div>
            <div className="gemstoneResetButton" onClick={(e) => {
                console.log("In reset click");
                // this.resetTreasure(e);
              }
            } style={{color: "red"}}>
              Reset
            </div>
            <div className="clear"></div>
            <div className="dividerLine"></div>
            <div className="selectGemSection">
              <div className="gemValueTitle">
                Gem Value
              </div>
              <div className="gemQuantityTitle">
                Quantity
              </div>
              <div className="gemMixTitle">
                Mixed
              </div>
              <div className="randomGems">
                <div className="getRandomGemCollection" onClick={(e) => {
                  this.toggleRandomDropDown();
                }}>
                  Random<i className="fa fa-chevron-down getRandomGemIcon" aria-hidden="true"></i>
                </div>
                <div className="randomDropDown" style={this.state.styleRandomDropDown}>
                  {this.state.gemPercentageSelectors}
                  <div className="clear"></div>
                  <div className="randomGenerateSection">
                    <div className="randomGenerateLabel">
                      Qty
                    </div>
                    <div className="randomGenerateQuantity">
                      <input className="randomGenerateInput" type="number" defaultValue={0} min={0}
                        onChange={(e) => {
                          this.setRandomGemQuantity(e);
                        }}
                      />
                      <div className="randomGenerateButton"
                        onClick={() => {
                          this.generateRandomGemCollection();
                        }}
                      >
                        <i className="fa fa-share-square-o generateRandomIcon" aria-hidden="true" >
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clear"></div>
              {this.state.gemValueSelectors}
              <div className="clear"></div>
            </div>
          </div>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default GemstoneTreasureGenerator;