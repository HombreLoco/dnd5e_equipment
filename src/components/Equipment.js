import React, { Component } from 'react';
import '../css/weapons.css';
import accordion from '../lib/accordion.js';
import Weapons from './Weapons.js';


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
          </div>
        </div>
        

      </div>
    );
  }
}

export default Equipment;
