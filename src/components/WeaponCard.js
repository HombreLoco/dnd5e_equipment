import React, { Component } from 'react';
import '../css/weapons.css';



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
    if (item.equipment_category.toUpperCase() === "WEAPON") {
      if (item.range_distance_normal) {
        ranged = (
          <span>
            <span className="weaponStatName">Ammunition Range:</span>
            <span className="weaponStatValue">{`${item.range_distance_normal}/${item.range_distance_max}`}</span>
            <br />
          </span>
        )
      } 
      if (item.throw_range) {
        thrown = (
          <span>
            <span className="weaponStatName">Thrown Range:</span>
            <span className="weaponStatValue">{`${item.throw_range.normal}/${item.throw_range.long}`}</span>
            <br />
          </span>
        )
      }
      if (item.properties) {
        properties = "";
        item.properties.map( property => {
          properties += property.name + ", ";
        });
        properties = properties.slice(0, -2);
      }
      return (
        <div key={item.index} className="weaponInfo">
          <span className="weaponName">
            {item.name} - {item.category_range}
          </span>
          <div className="weaponStats">
              <span className="weaponStatName">Cost:</span>
              <span className="weaponStatValue">{item.cost.quantity}&nbsp;{item.cost.unit}</span>
              <br />
              <span className="weaponStatName">Weight:</span>
              <span className="weaponStatValue">{item.weight}&nbsp;lb</span>
              <br />
              <span className="weaponStatName">Damage:</span>
              <span className="weaponStatValue">{item.damage.dice_count}d{item.damage.dice_value}&nbsp;{item.damage.damage_type.name.toLowerCase()}</span>
              <br />
              <span className="weaponStatName">Melee Distance:</span>
              <span className="weaponStatValue">{item.range.normal}</span>
              <br />
              {ranged}
              {thrown}
              <span className="weaponStatName">Properties:</span>
              <span className="weaponStatValue ">{properties}</span>
          </div>
        </div>
      );
    } else {
      return null;
    }

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
