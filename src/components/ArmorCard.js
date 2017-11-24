import React, { Component } from 'react';



class ArmorCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  createArmorCard = (item) => {
    let strength;
    let stealth;
    let dexterity;
    let maxBonus;
    if (item.str_minimum !== 0) {
      strength = (
        <span>
          <span className="statName">Minimum Strength Required:</span>
          <span className="statValue">{item.str_minimum}</span>
          <br />
        </span>
      )
    } 
    if (item.stealth_disadvantage === true) {
      stealth = (
        <span>
          <span className="statName">Disadvantage:</span>
          <span className="statValue">Stealth</span>
          <br />
        </span>
      )
    }
    if (item.armor_class.dex_bonus === true) {
      dexterity = "+Dex modifier";
    }
    if (item.armor_class.max_bonus) {
      maxBonus = "(max 2)";
    }
    return (
      <div key={item.index} className="itemInfo">
        <span className="itemName">
          {item.name} - {item.armor_category} {item.equipment_category}
        </span>
        <div className="itemStats">
            <span className="statName">Cost:</span>
            <span className="statValue">{item.cost.quantity}&nbsp;{item.cost.unit}</span>
            <br />
            <span className="statName">Weight:</span>
            <span className="statValue">{item.weight}&nbsp;lb</span>
            <br />
            <span className="statName">Armor Class (AC):</span>
            <span className="statValue">{item.armor_class.base} {dexterity}&nbsp;{maxBonus}</span>
            <br />
            {strength}
            {stealth}
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
          {this.createArmorCard(this.props.armor)}
        </div>
      </div>
    );
  }
}

export default ArmorCard;
