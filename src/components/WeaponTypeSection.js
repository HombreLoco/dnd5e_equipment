import React, { Component } from 'react';
import equipment from '../data/allEquipment.json';
import WeaponCard from './WeaponCard.js';



class WeaponTypeSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classNamesArray: ["panel"],
      classNamesString: "panel"
    }
  }

  setAccordion = () => {
    this.state.classNamesArray.push("active");
    // var panel = this.nextElementSibling;
    // if (panel.style.maxHeight){
    //   panel.style.maxHeight = null;
    // } else {
    //   panel.style.maxHeight = panel.scrollHeight + "px";
    // }
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <div className="">
          <div>
            <button className="accordion" onClick={this.setAccordion()}>{this.props.title}</button>
            <div className={this.state.classNamesString}>
              {this.props.outputWeapons}
            </div>
          </div>
          <button className="accordion">Simple Melee</button>
          <div className="panel">
          </div>
          <button className="accordion">Simple Ranged</button>
          <div className="panel">
          </div>
          <button className="accordion">Martial Melee</button>
          <div className="panel">
          </div>
          <button className="accordion">Martial Ranged</button>
          <div className="panel">
          </div>
        </div>
      </div>
    );
  }
}

export default WeaponTypeSection;
