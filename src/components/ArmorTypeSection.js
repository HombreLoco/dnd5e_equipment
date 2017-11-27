import React, { Component } from 'react';
import componentProperties from '../lib/componentProperties.js';


class ArmorTypeSection extends Component {

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
    let accordionStatus = componentProperties.setAccordion(this.state.hidden);
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
            {this.props.outputArmor}
          </div>
        </div>
      </div>
    );
  }
}

export default ArmorTypeSection;
