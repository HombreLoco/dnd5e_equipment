import React, { Component } from 'react';

class WeaponCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  createWeaponCard = (item) => {
    let ranged;
    let thrown;
    let properties;
    if (item.range_distance_normal) {
      ranged = (
        <span>
          <span className="statName">Ammunition Range:</span>
          <span className="statValue">{`${item.range_distance_normal}/${item.range_distance_max}`}</span>
          <br />
        </span>
      )
    } 
    if (item.throw_range) {
      thrown = (
        <span>
          <span className="statName">Thrown Range:</span>
          <span className="statValue">{`${item.throw_range.normal}/${item.throw_range.long}`}</span>
          <br />
        </span>
      )
    }
    if (item.properties) {
      properties = "";
      item.properties.map( property => {
        return properties += property.name + ", ";
      });
      properties = properties.slice(0, -2);
    }
    return (
      <div key={item.index} className="itemInfo">
        <span className="itemName">
          {item.name} - {item.category_range}
        </span>
        <div className="itemStats">
            <span className="statName">Cost:</span>
            <span className="statValue">{item.cost.quantity}&nbsp;{item.cost.unit}</span>
            <br />
            <span className="statName">Weight:</span>
            <span className="statValue">{item.weight}&nbsp;lb</span>
            <br />
            <span className="statName">Damage:</span>
            <span className="statValue">{item.damage.dice_count}d{item.damage.dice_value}&nbsp;{item.damage.damage_type.name.toLowerCase()}</span>
            <br />
            <span className="statName">Melee Distance:</span>
            <span className="statValue">{item.range.normal}</span>
            <br />
            {ranged}
            {thrown}
            <span className="statName">Properties:</span>
            <span className="statValue ">{properties}</span>
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
          {this.createWeaponCard(this.props.weapon)}
        </div>
      </div>
    );
  }
}

export default WeaponCard;
