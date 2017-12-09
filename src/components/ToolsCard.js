import React, { Component } from 'react';
// import allEquipment from '../data/allEquipment.json';


class ToolsCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  createToolsCard = (item) => {
    //TODO: add variables for each item property that is not 
    //common to all (or almost all) items of that gear category.

    let cost;
    let weight;
    let desc;

    if (item.cost) {
       cost = (
        <span>
          <span className="statName">Cost:</span>
          <span className="statValue">{item.cost.quantity}&nbsp;{item.cost.unit}</span>
          <br />
        </span>
      )
    }
    if ((item.weight) || (item.weight === 0)) {
      weight = (
        <span>
          <span className="statName">Weight:</span>
          <span className="statValue">{item.weight}&nbsp;lb</span>
          <br />
        </span>
      )
    }
    if (item.desc) {
      let description = "";
      item.desc.map( index => {
        return description += index + ", ";
      });
      description = description.slice(0, -2);
      desc = (
        <span>
          <span className="statName">Description:</span>
          <span className="statValue ">{description}</span>
          <br />
        </span>
      )
    }
    return (
      <div key={item.index} className="itemInfo">
        <span className="itemName">
          {item.name} - {item.tool_category || item.gear_category}
        </span>
        <div className="itemStats">
          {cost}
          {weight}
          {desc}
        </div>
      </div>
    );
  }

  componentDidMount() {
  }

  render() {

    return (
      <div>
        <div className="">
          {this.createToolsCard(this.props.tools)}
        </div>
      </div>
    );
  }
}

export default ToolsCard;
