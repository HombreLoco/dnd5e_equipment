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
            <div key={item.index} className="weaponInfo">
              <div className="weaponName">
                {item.name}
              </div>
              <div className="weaponStats">
                <span className="weaponCost">
                  {item.cost.quantity} {item.cost.unit}
                </span>
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
