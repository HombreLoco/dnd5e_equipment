import React, { Component } from 'react';
import equipment from '../data/allEquipment.json';
import WeaponCard from './WeaponCard.js';



class WeaponTypeSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classNamesArray: ["panel"],
      classNamesString: "panel",
      style: {maxHeight: "0px"},
      hidden: false
    }
  }

  setAccordion = () => {
    console.log("here");
    // this.state.classNamesArray.push("active");
    if (!this.state.hidden) {
      this.state.style = {maxHeight: "0px"};
      this.state.hidden = true;
    } else {
      this.state.style = {maxHeight: "100%"};
      this.state.hidden = false;
    }
    this.setState({style: this.state.style, hidden: this.state.hidden});
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <div className="">
          <button className="accordion" onClick={() => {this.setAccordion()}}>{this.props.title}</button>
          <div className={this.state.classNamesString} style={this.state.style}>
            {this.props.outputWeapons}
          </div>
        </div>
      </div>
    );
  }
}

export default WeaponTypeSection;
