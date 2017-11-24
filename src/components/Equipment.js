import React, { Component } from 'react';
import accordion from '../lib/accordion.js';
import Weapons from './Weapons.js';
import Armor from './Armor.js';


class Equipment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classNamesArray: ["panel"],
      classNamesString: "panel",
      style: {maxHeight: "0px"},
      hidden: false
    }
  }

  //TODO: add accordion to the weapon section within the equipment component

  setAccordion = () => {
    let accordionStatus = accordion.setAccordion(this.state.hidden);
    this.setState({style: accordionStatus.style, hidden: accordionStatus.hidden});
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <div className="">
          <button className="accordion" onClick={() => {this.setAccordion()}}>Equipment</button>
          <div className={this.state.classNamesString} style={this.state.style}>
            <Weapons />
            <Armor />
          </div>
        </div>
        

      </div>
    );
  }
}

export default Equipment;
