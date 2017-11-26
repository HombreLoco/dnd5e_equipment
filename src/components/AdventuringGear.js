import React, { Component } from 'react';
import accordion from '../lib/accordion.js';
import allEquipment from '../data/allEquipment.json';
import AdventuringGearCard from './AdventuringGearCard.js';
import AdventuringGearTypeSection from './AdventuringGearTypeSection.js';


// TODO: all item lists need to be sorted by name (Kit section is completed)


class AdventuringGear extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classNamesArray: ["panel"],
      classNamesString: "panel",
      style: {maxHeight: "0px"},
      hidden: false
    }
  }

  getAdventuringGearByClass = (data, adventuringGearClass) => {
    // data - is the "database"
    // category - an object with two strings representing the weapon category and range (ex. let category = {category: "SIMPLE", range: "RANGED"})
    let adventuringGearList = [];
    data.map(item => {
      if (item.equipment_category.toUpperCase() === adventuringGearClass.equipment_category) {
        if (item.gear_category) {
          if (item.gear_category.toUpperCase() === adventuringGearClass.gear_category) {
            return adventuringGearList.push(item);
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
    // console.log("armorList", armorList);
    let adventuringGearListCards = [];
    adventuringGearListCards = adventuringGearList.map(item => {
      return <AdventuringGearCard key={item.index} adventuringGear={item} />
    });
    return adventuringGearListCards;
  }

  getAllAdventuringGear = () => {
    if (allEquipment) {
      let allAdventuringGear = [];
      allEquipment.map(item => {
        if (item.equipment_category.toUpperCase() === "ADVENTURING GEAR") {
          return allAdventuringGear.push(item);
        } else {
          return null;
        }
      });
      console.log("all adventuring gear: ", allAdventuringGear);
      let allAdventuringGearCards = [];
      allAdventuringGearCards = allAdventuringGear.map(item => {
        return <AdventuringGearCard key={item.index} adventuringGear={item} />
      });
      return allAdventuringGearCards;
    }
  }

  getStandardGear = () => {
    let adventuringGearClass = {
      equipment_category: "ADVENTURING GEAR",
      gear_category: "STANDARD GEAR"
    }
    return this.getAdventuringGearByClass(allEquipment, adventuringGearClass);
  }

  getAmmunition = () => {
    let adventuringGearClass = {
      equipment_category: "ADVENTURING GEAR",
      gear_category: "AMMUNITION"
    }
    return this.getAdventuringGearByClass(allEquipment, adventuringGearClass);
  }

  getHolySymbol = () => {
    let adventuringGearClass = {
      equipment_category: "ADVENTURING GEAR",
      gear_category: "HOLY SYMBOL"
    }
    return this.getAdventuringGearByClass(allEquipment, adventuringGearClass);
  }

  getArcaneFocus = () => {
    let adventuringGearClass = {
      equipment_category: "ADVENTURING GEAR",
      gear_category: "ARCANE FOCUS"
    }
    return this.getAdventuringGearByClass(allEquipment, adventuringGearClass);
  }

  getDruidicFocus = () => {
    let adventuringGearClass = {
      equipment_category: "ADVENTURING GEAR",
      gear_category: "DRUIDIC FOCUS"
    }
    return this.getAdventuringGearByClass(allEquipment, adventuringGearClass);
  }

  getKit = () => {
    let adventuringGearClass = {
      equipment_category: "ADVENTURING GEAR",
      gear_category: "KIT"
    }
    let toolClass = {
      equipment_category: "TOOLS",
      gear_category: "KIT"
    }
    let aKits = this.getAdventuringGearByClass(allEquipment, adventuringGearClass);
    let tKits = this.getAdventuringGearByClass(allEquipment, toolClass);
    let allKits = aKits.concat(tKits);
    allKits.sort(function(a,b) {
      if (a.props.adventuringGear.name < b.props.adventuringGear.name) {
        return -1;
      }
      if (a.props.adventuringGear.name > b.props.adventuringGear.name) {
        return 1;
      }
      return 0;
    });
    return allKits;
  }

  getEquipmentPack = () => {
    let adventuringGearClass = {
      equipment_category: "ADVENTURING GEAR",
      gear_category: "EQUIPMENT PACK"
    }
    return this.getAdventuringGearByClass(allEquipment, adventuringGearClass);
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
          <button className="accordion" onClick={() => {this.setAccordion()}}>Adventuring Gear</button>
          <div className={this.state.classNamesString} style={this.state.style}>
            <AdventuringGearTypeSection outputAdventuringGear={this.getStandardGear()} title={"Standard Gear"}/>
            <AdventuringGearTypeSection outputAdventuringGear={this.getAmmunition()} title={"Ammunition"}/>
            <AdventuringGearTypeSection outputAdventuringGear={this.getArcaneFocus()} title={"Arcane Focus"}/>
            <AdventuringGearTypeSection outputAdventuringGear={this.getDruidicFocus()} title={"Druidic Focus"}/>
            <AdventuringGearTypeSection outputAdventuringGear={this.getKit()} title={"Kits"}/>
            <AdventuringGearTypeSection outputAdventuringGear={this.getEquipmentPack()} title={"Equipment Packs"}/>
            <AdventuringGearTypeSection outputAdventuringGear={this.getAllAdventuringGear()} title={"All Adventuring Gear"}/>
          </div>
        </div>
      </div>
    );
  }
}

export default AdventuringGear;
