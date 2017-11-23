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

  setAccordion = () => {
    // this.classList.toggle("active");
    // var panel = this.nextElementSibling;
    // if (panel.style.maxHeight){
    //   panel.style.maxHeight = null;
    // } else {
    //   panel.style.maxHeight = panel.scrollHeight + "px";
    // }
  }

  componentDidMount() {
    this.getAllWeapons();
    this.getSimpleMelee();
    this.getSimpleRanged();
    this.getMartialMelee();
    this.getMartialRanged();

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
          <div>
            <button className={"accordion"} onClick={this.setAccordion(this)}>All Weapons</button>
            <div className="panel">
              {outputWeapons}
            </div>
          </div>
          <button className="accordion">Simple Melee</button>
          <div className="panel">
            {this.getSimpleMelee()}
          </div>
          <button className="accordion">Simple Ranged</button>
          <div className="panel">
            {this.getSimpleRanged()}
          </div>
          <button className="accordion">Martial Melee</button>
          <div className="panel">
            {this.getMartialMelee()}
          </div>
          <button className="accordion">Martial Ranged</button>
          <div className="panel">
            {this.getMartialRanged()}
          </div>
        </div>
      </div>
    );
  }
}

export default Weapons;
