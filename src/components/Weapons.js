import React, { Component } from 'react';
import '../css/weapons.css';
import allEquipment from '../data/allEquipment.json';
import WeaponCard from './WeaponCard.js';
import WeaponTypeSection from './WeaponTypeSection.js';


// TODO:


class Weapons extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getWeaponsByClass = (data, weaponClass) => {
    // data - is the "database"
    // category - an object with two strings representing the weapon category and range (ex. let category = {category: "SIMPLE", range: "RANGED"})
    let weaponList = [];
    data.map(item => {
      if (item.weapon_category) {
        if ((item.weapon_category.toUpperCase() === weaponClass.category) && (item.weapon_range.toUpperCase() === weaponClass.range)) {
          return weaponList.push(item);
        } 
      }
    });
    console.log("weaponList", weaponList);
    let weaponListCards = [];
    weaponListCards = weaponList.map(item => {
      return <WeaponCard key={item.index} weapon={item} />
    });
    return weaponListCards;
  }

  getAllWeapons = () => {
    if (allEquipment) {
      let allWeapons = [];
      allEquipment.map(item => {
        if (item.equipment_category.toUpperCase() === "WEAPON") {
          return allWeapons.push(item);
        }
      });
      console.log("all weapons: ", allWeapons);
      let allWeaponsCards = [];
      allWeaponsCards = allWeapons.map(item => {
        return <WeaponCard key={item.index} weapon={item} />
      });
      return allWeaponsCards;
    }
  }

  getSimpleMelee = () => {
    let weaponClass = {
      category: "SIMPLE",
      range: "MELEE"
    }
    return this.getWeaponsByClass(allEquipment, weaponClass);
  }

  getSimpleRanged = () => {
    let weaponClass = {
      category: "SIMPLE",
      range: "RANGED"
    }
    return this.getWeaponsByClass(allEquipment, weaponClass);
  }

  getMartialMelee = () => {
    let weaponClass = {
      category: "MARTIAL",
      range: "MELEE"
    }
    return this.getWeaponsByClass(allEquipment, weaponClass);
  }

  getMartialRanged = () => {
    let weaponClass = {
      category: "MARTIAL",
      range: "RANGED"
    }
    return this.getWeaponsByClass(allEquipment, weaponClass);
  }

  componentDidMount() {

  }

  render() {

    return (
      <div>
        <div className="">
          <WeaponTypeSection outputWeapons={this.getAllWeapons()} title={"All Weapons"}/>
          <WeaponTypeSection outputWeapons={this.getSimpleMelee()} title={"Simple Melee"}/>
          <WeaponTypeSection outputWeapons={this.getSimpleRanged()} title={"Simple Ranged"}/>
          <WeaponTypeSection outputWeapons={this.getMartialMelee()} title={"Martial Melee"}/>
          <WeaponTypeSection outputWeapons={this.getMartialRanged()} title={"Martial Ranged"}/>
        </div>
      </div>
    );
  }
}

export default Weapons;
