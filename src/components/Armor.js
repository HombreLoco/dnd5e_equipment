import React, { Component } from 'react';
import componentProperties from '../lib/componentProperties.js';
import allEquipment from '../data/allEquipment.json';
import ArmorCard from './ArmorCard.js';
import ArmorTypeSection from './ArmorTypeSection.js';


// TODO:


class Armor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classNamesArray: ["panel"],
      classNamesString: "panel",
      style: {maxHeight: "0px"},
      hidden: false
    }
  }

  getArmorByClass = (data, armorClass) => {
    // data - is the "database"
    // category - an object with two strings representing the weapon category and range (ex. let category = {category: "SIMPLE", range: "RANGED"})
    let armorList = [];
    data.map(item => {
      if ((item.equipment_category.toUpperCase() === armorClass.equipment_category) && (item.armor_category.toUpperCase() === armorClass.armor_Category)) {
        return armorList.push(item);
      } else {
        return null;
      }

    });
    // console.log("armorList", armorList);
    let armorListCards = [];
    armorListCards = armorList.map(item => {
      return <ArmorCard key={item.index} armor={item} />
    });
    return armorListCards;
  }

  getAllArmor = () => {
    if (allEquipment) {
      let allArmor = [];
      allEquipment.map(item => {
        if (item.equipment_category.toUpperCase() === "ARMOR") {
          return allArmor.push(item);
        } else {
          return null;
        }
      });
      // console.log("all armor: ", allArmor);
      let allArmorCards = [];
      allArmorCards = allArmor.map(item => {
        return <ArmorCard key={item.index} armor={item} />
      });
      return allArmorCards;
    }
  }

  getLightArmor = () => {
    let armorClass = {
      equipment_category: "ARMOR",
      armor_Category: "LIGHT"
    }
    return this.getArmorByClass(allEquipment, armorClass);
  }

  getMediumArmor = () => {
    let armorClass = {
      equipment_category: "ARMOR",
      armor_Category: "MEDIUM"
    }
    return this.getArmorByClass(allEquipment, armorClass);
  }

  getHeavyArmor = () => {
    let armorClass = {
      equipment_category: "ARMOR",
      armor_Category: "HEAVY"
    }
    return this.getArmorByClass(allEquipment, armorClass);
  }

  getShieldArmor = () => {
    let armorClass = {
      equipment_category: "ARMOR",
      armor_Category: "SHIELD"
    }
    return this.getArmorByClass(allEquipment, armorClass);
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
          <button className="accordion" onClick={() => {this.setAccordion()}}>Armor</button>
          <div className={this.state.classNamesString} style={this.state.style}>
            <ArmorTypeSection outputArmor={this.getLightArmor()} title={"Light Armor"}/>
            <ArmorTypeSection outputArmor={this.getMediumArmor()} title={"Medium Armor"}/>
            <ArmorTypeSection outputArmor={this.getHeavyArmor()} title={"Heavy Armor"}/>
            <ArmorTypeSection outputArmor={this.getShieldArmor()} title={"Shield Armor"}/>
            <ArmorTypeSection outputArmor={this.getAllArmor()} title={"All Armor"}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Armor;
