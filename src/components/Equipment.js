import React, { Component } from 'react';
import componentProperties from '../lib/componentProperties.js';
import Weapons from './Weapons.js';
import Armor from './Armor.js';
import AdventuringGear from './AdventuringGear.js';
import Tools from './Tools.js';
import MountsAndVehicles from './MountsAndVehicles.js';


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
    let accordionStatus = componentProperties.setAccordion(this.state.hidden);
    this.setState({style: accordionStatus.style, hidden: accordionStatus.hidden});
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <div className="equipmentDropDown">
          <button className="accordion" onClick={() => {this.setAccordion()}}>Equipment</button>
          <div className={this.state.classNamesString} style={this.state.style}>
            <Weapons />
            <Armor />
            <AdventuringGear />
            <Tools />
            <MountsAndVehicles />
          </div>
        </div>
        

      </div>
    );
  }
}

export default Equipment;
