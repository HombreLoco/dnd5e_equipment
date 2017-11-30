import React, { Component } from 'react';
import allEquipment from '../data/allEquipment.json';


class AdventuringGearCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  createAdventuringGearCard = (item) => {
    //TODO: add variables for each item property that is not 
    //common to all (or almost all) items of that gear category.

    let cost;
    let weight;
    let desc;
    let quantity;
    let duration;
    let illumination;
    let fuel;
    let quantity_capacity;
    let carry_capacity;
    let length;
    let hit_points;
    let equipmentPackList;

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
    if (item.quantity) {
      weight = (
        <span>
          <span className="statName">Quantity:</span>
          <span className="statValue">{item.quantity}</span>
          <br />
        </span>
      )
    }
    if (item.duration) {
      duration = (
        <span>
          <span className="statName">Duration:</span>
          <span className="statValue">{item.duration.quantity} {item.duration.unit}</span>
          <br />
        </span>
      )
    }
    if (item.illumination) {
      let illuminationInfo = "";
      item.illumination.map( index => {
        return illuminationInfo += `${index.quantity} ${index.unit} ${index.intensity} ${index.cast_area}, `;
      });
      illuminationInfo = illuminationInfo.slice(0, -2);
      illumination = (
        <span>
          <span className="statName">Illumination:</span>
          <span className="statValue">{illuminationInfo}</span>
          <br />
        </span>
      )
    }
    if (item.fuel) {
      fuel = (
        <span>
          <span className="statName">Fuel:</span>
          <span className="statValue">{item.fuel}</span>
          <br />
        </span>
      )
    }
    if (item.quantity_capacity) {
      let quantity_capacityInfo = "";
      item.quantity_capacity.map( index => {
        return quantity_capacityInfo += `${index.quantity} ${index.item}, `;
      });
      quantity_capacityInfo = quantity_capacityInfo.slice(0, -2);
      quantity_capacity = (
        <span>
          <span className="statName">Capacity:</span>
          <span className="statValue">{quantity_capacityInfo}</span>
          <br />
        </span>
      )
    }
    if (item.carry_capacity) {
      let carry_capacityInfo = "";
      item.carry_capacity.map( index => {
        return carry_capacityInfo += `${index.quantity} ${index.unit}, `;
      });
      carry_capacityInfo = carry_capacityInfo.slice(0, -2);
      carry_capacity = (
        <span>
          <span className="statName">Capacity:</span>
          <span className="statValue">{carry_capacityInfo}</span>
          <br />
        </span>
      )
    }
    if (item.length) {
      length = (
        <span>
          <span className="statName">Length:</span>
          <span className="statValue">{item.length.quantity}&nbsp;{item.length.unit}</span>
          <br />
        </span>
      )
    }
    if (item.hit_points) {
      hit_points = (
        <span>
          <span className="statName">Hit Points:</span>
          <span className="statValue">{item.hit_points}</span>
          <br />
        </span>
      );
    }
    if (item.contents) {
      let equipmentPackCards = [];
      let lengthOfEquipmentList = allEquipment.length;
      equipmentPackCards = item.contents.map(content => {
        for (var i = 0; i < lengthOfEquipmentList; i++) {
          if (allEquipment[i].index === content.index) {
            return <AdventuringGearCard key={allEquipment[i].index} adventuringGear={allEquipment[i]} />
          } else {
            return null;
          }
        }
      });
      equipmentPackList = (
        <span>
          <span className="statName">Contents:</span>
          <span className="statValue">{equipmentPackCards}</span>
          <br />
        </span>
      );
    }
    return (
      <div key={item.index} className="itemInfo">
        <span className="itemName">
          {item.name} - {item.gear_category}
        </span>
        <div className="itemStats">
          {cost}
          {weight}
          {length}
          {hit_points}
          {quantity}
          {duration}
          {illumination}
          {fuel}
          {quantity_capacity}
          {carry_capacity}
          {desc}
          {equipmentPackList}
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
          {this.createAdventuringGearCard(this.props.adventuringGear)}
        </div>
      </div>
    );
  }
}

export default AdventuringGearCard;
