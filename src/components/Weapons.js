import React, { Component } from 'react';
import '../css/weapons.css';
import equipment from '../data/allEquipment.json';
import WeaponCard from './WeaponCard.js';
import WeaponTypeSection from './WeaponTypeSection.js';



class Weapons extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getAllWeapons = () => {
    console.log("equipment: ", equipment);
  }

  getSimpleMelee = () => {
    let simpleMelee = [];
    equipment.map(item => {
      if (item.weapon_category) {
        if ((item.weapon_category.toUpperCase() === "SIMPLE") && (item.weapon_range.toUpperCase() === "MELEE")) {
          return simpleMelee.push(item);
        } 
      }
    });
    console.log("simple melee", simpleMelee);
    let simpleMeleeCards = [];
    simpleMeleeCards = simpleMelee.map(item => {
      return <WeaponCard key={item.index} weapon={item} />
    });
    return simpleMeleeCards;
  }

  getSimpleRanged = () => {
    let simpleRanged = [];
    equipment.map(item => {
      if (item.weapon_category) {
        if ((item.weapon_category.toUpperCase() === "SIMPLE") && (item.weapon_range.toUpperCase() === "RANGED")) {
          return simpleRanged.push(item);
        } 
      }
    });
    console.log("simple ranged", simpleRanged);
    let simpleRangedCards = [];
    simpleRangedCards = simpleRanged.map(item => {
      return <WeaponCard key={item.index} weapon={item} />
    });
    return simpleRangedCards;
  }

  getMartialMelee = () => {
    let martialMelee = [];
    equipment.map(item => {
      if (item.weapon_category) {
        if ((item.weapon_category.toUpperCase() === "MARTIAL") && (item.weapon_range.toUpperCase() === "MELEE")) {
          return martialMelee.push(item);
        } 
      }
    });
    console.log("martial melee", martialMelee);
    let martialMeleeCards = [];
    martialMeleeCards = martialMelee.map(item => {
      return <WeaponCard key={item.index} weapon={item} />
    });
    return martialMeleeCards;
  }

  getMartialRanged = () => {
    let martialRanged = [];
    equipment.map(item => {
      if (item.weapon_category) {
        if ((item.weapon_category.toUpperCase() === "MARTIAL") && (item.weapon_range.toUpperCase() === "RANGED")) {
          return martialRanged.push(item);
        } 
      }
    });
    console.log("martial ranged", martialRanged);
    let martialRangedCards = [];
    martialRangedCards = martialRanged.map(item => {
      return <WeaponCard key={item.index} weapon={item} />
    });
    return martialRangedCards;
  }

  componentDidMount() {

  }

  render() {

    let outputWeapons;
    
    if (equipment.length > 0) {

      outputWeapons = equipment.map(item => {
        return <WeaponCard key={item.index} weapon={item}/>
      });
    }


    return (
      <div>
        <div className="">
          <WeaponTypeSection outputWeapons={outputWeapons} title={"All Weapons"}/>
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
