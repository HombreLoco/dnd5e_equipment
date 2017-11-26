import React, { Component } from 'react';
import accordion from '../lib/accordion.js';


class AdventuringGearTypeSection extends Component {

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
    let accordionStatus = accordion.setAccordion(this.state.hidden);
    this.setState({style: accordionStatus.style, hidden: accordionStatus.hidden});
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <div className="">
          <button className="accordion" onClick={() => {this.setAccordion()}}>{this.props.title}</button>
          <div className={this.state.classNamesString} style={this.state.style}>
            {this.props.outputAdventuringGear}
          </div>
        </div>
      </div>
    );
  }
}

export default AdventuringGearTypeSection;
