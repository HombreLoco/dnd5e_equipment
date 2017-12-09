import React, { Component } from 'react';
// import allEquipment from '../data/allEquipment.json';


class MountsAndVehiclesCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  createMountsAndVehiclesCard = (item) => {
    //TODO: add variables for each item property that is not 
    //common to all (or almost all) items of that gear category.

    let cost;
    let weight;
    let speed;
    let capacity;

    if (item.cost) {
       cost = (
        <span>
          <span className="statName">Cost:</span>
          <span className="statValue">{item.cost.quantity}&nbsp;{item.cost.unit}</span>
          <br />
        </span>
      )
    }
    if (item.weight) {
      weight = (
        <span>
        <span className="statName">Weight:</span>
        <span className="statValue">{item.weight} lb</span>
        <br />
      </span>
      )
    }
    if (item.speed) {
      speed = (
        <span>
          <span className="statName">Speed:</span>
          <span className="statValue">{item.speed.quantity}&nbsp;{item.speed.unit}</span>
          <br />
        </span>
      )
    }
    if (item.capacity) {
      capacity = (
        <span>
          <span className="statName">Carrying Capacity:</span>
          <span className="statValue">{item.capacity}&nbsp;lb</span>
          <br />
        </span>
      )
    }
    return (
      <div key={item.index} className="itemInfo">
        <span className="itemName">
          {item.name} - {item.vehicle_category}
        </span>
        <div className="itemStats">
          {cost}
          {weight}
          {speed}
          {capacity}
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
          {this.createMountsAndVehiclesCard(this.props.mountsAndVehicles)}
        </div>
      </div>
    );
  }
}

export default MountsAndVehiclesCard;
