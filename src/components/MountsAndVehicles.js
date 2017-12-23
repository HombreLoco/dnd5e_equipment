import React, { Component } from 'react';
import componentProperties from '../lib/componentProperties.js';
import allEquipment from '../data/allEquipment.json';
import MountsAndVehiclesCard from './MountsAndVehiclesCard.js';
import MountsAndVehiclesTypeSection from './MountsAndVehiclesTypeSection.js';


// TODO: all item lists need to be sorted by name (Kit section is completed)


class MountsAndVehicles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classNamesArray: ["panel"],
      classNamesString: "panel",
      style: {maxHeight: "0px"},
      hidden: false
    }
  }

  getMountsAndVehiclesByClass = (data, mountsAndVehiclesClass) => {
    // data - is the "database"
    // category - an object with two strings representing the weapon category and range (ex. let category = {category: "SIMPLE", range: "RANGED"})
    let mountsAndVehiclesList = [];
    data.map(item => {
      if (item.equipment_category.toUpperCase() === mountsAndVehiclesClass.equipment_category) {
        if (item.vehicle_category) {
          if (item.vehicle_category.toUpperCase() === mountsAndVehiclesClass.vehicle_category) {
            return mountsAndVehiclesList.push(item);
          } else {
            return null;
          }
        } 
        // else if (item.gear_category) {
        //   if (item.vehicle_category.toUpperCase() === mountsAndVehiclesClass.vehicle) {
        //     return mountsAndVehiclesList.push(item);
        //   } else {
        //     return null;
        //   }
        // } 
        else {
          return null;
        }
      } else {
        return null;
      }
    });
    let mountsAndVehiclesListCards = [];
    mountsAndVehiclesListCards = mountsAndVehiclesList.map(mAndV => {
      return <MountsAndVehiclesCard key={mAndV.index} mountsAndVehicles={mAndV} />
    });
    return mountsAndVehiclesListCards;
  }

  getAllMountsAndVehicles = () => {
    if (allEquipment) {
      let allMountsAndVehicles = [];
      allEquipment.map(item => {
        if (item.equipment_category.toUpperCase() === "MOUNTS AND VEHICLES") {
          return allMountsAndVehicles.push(item);
        } else {
          return null;
        }
      });
      // console.log("all mounts and vehicles: ", allMountsAndVehicles);
      let allMountsAndVehiclesCards = [];
      allMountsAndVehiclesCards = allMountsAndVehicles.map(item => {
        return <MountsAndVehiclesCard key={item.index} mountsAndVehicles={item} />
      });
      return allMountsAndVehiclesCards;
    }
  }

  getMountsAndOtherAnimals = () => {
    let mountsAndVehiclesClass = {
      equipment_category: "MOUNTS AND VEHICLES",
      vehicle_category: "MOUNTS AND OTHER ANIMALS"
    }
    return this.getMountsAndVehiclesByClass(allEquipment, mountsAndVehiclesClass);
  }

  getTackHarnessAndDrawnVehicles = () => {
    let mountsAndVehiclesClass = {
      equipment_category: "MOUNTS AND VEHICLES",
      vehicle_category: "TACK, HARNESS, AND DRAWN VEHICLES"
    }
    return this.getMountsAndVehiclesByClass(allEquipment, mountsAndVehiclesClass);
  }

  getWaterborneVehicles = () => {
    let mountsAndVehiclesClass = {
      equipment_category: "MOUNTS AND VEHICLES",
      vehicle_category: "WATERBORNE VEHICLES"
    }
    return this.getMountsAndVehiclesByClass(allEquipment, mountsAndVehiclesClass);
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
          <button className="accordion" onClick={() => {this.setAccordion()}}>Mounts and Vehicles</button>
          <div className={this.state.classNamesString} style={this.state.style}>
            <MountsAndVehiclesTypeSection outputMountsAndVehicles={this.getMountsAndOtherAnimals()} title={"Mounts and Other Animals"}/>
            <MountsAndVehiclesTypeSection outputMountsAndVehicles={this.getTackHarnessAndDrawnVehicles()} title={"Tack, Harness, and Drawn Vehicles"}/>
            <MountsAndVehiclesTypeSection outputMountsAndVehicles={this.getWaterborneVehicles()} title={"Waterborne Vehicles"}/>
            <MountsAndVehiclesTypeSection outputMountsAndVehicles={this.getAllMountsAndVehicles()} title={"All Mounts and Vehicles"}/>
          </div>
        </div>
      </div>
    );
  }
}

export default MountsAndVehicles;
