import React, { Component } from 'react';
import '../css/weapons.css';
import equipment from '../data/allEquipment.json';



class Weapons extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getAllWeapons = () => {
    console.log("equipment: ", equipment);
  }

  componentDidMount() {
    this.getAllWeapons();
  }

  render() {

    let outputWeapons;
    if (equipment.length > 0) {

      outputWeapons = equipment.map(item => {
        if (item.equipment_category.toUpperCase() === "WEAPON") {
          return (
            <div key={item.index}>
              <div className="weaponInfo">
                {item.name}
              </div>
            </div>
          );
        } else {
          return null;
        }
      });
    }


    return (
      <div>
        <div className="">
          {outputWeapons}
        </div>
      </div>
    );
  }
}

export default Weapons;
