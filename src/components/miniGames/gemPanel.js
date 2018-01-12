import React, { Component } from 'react';

class GemPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      panelStyle: {visibility: "hidden"},
      panelVisible: false
    }
  }

  // flipCardsAfterIncorrectMatch = (gemPanel) => {
  //   this.setState({
  //     panelStyle: gemPanel.panelStyle,
  //     panelVisible: gemPanel.panelVisible
  //   });
  // }

  flipPanel = () => {
    let newPanelProperties = this.props.flipGemPanel(this.props.gem, this.state.panelStyle, this.state.panelVisible);
    this.setState({
      panelStyle: newPanelProperties.panelStyle,
      panelVisible: newPanelProperties.panelVisible
    });
    // if (newPanelProperties.unsuccessfulPanels.length === 2) {
    //   this.props.flipAfterUnsuccessfulMatch(newPanelProperties.unsuccessfulPanels);
    // }
  }

  getGemColor = (gem) => {
    //this is here to always select the same color per gem
    return gem.color[0];
  }

  createDiamondShape = (gem) => {
    let keyIndex1 = Math.random();
    let gemColor = this.getGemColor(gem.gemData);
    return (
      <div key={keyIndex1} className="singleGem" >
        <div className="cutDiamond" onClick={(e) => {
          // this.flipCardOver(gem);
        }}>
          <div className="diamondPieces" style={this.state.panelStyle}>
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
        </div>
        <div className="clear"></div>
      </div>
    )
  }

  createGemPanel = (tempGem) => {
    let gemPanel;
    gemPanel = this.createDiamondShape(tempGem);

    return gemPanel;
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="gemPlayingCard" 
        onClick={(e) => {
          console.log("key: ", `${this.props.gem.groupKey}${this.props.gem.index}`);
          this.flipPanel();
        }}
      >
        {this.createGemPanel(this.props.gem)}
      </div>
    )
  }
}

export default GemPanel;