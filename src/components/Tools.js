import React, { Component } from 'react';
import componentProperties from '../lib/componentProperties.js';
import allEquipment from '../data/allEquipment.json';
import ToolsCard from './ToolsCard.js';
import ToolsTypeSection from './ToolsTypeSection.js';


// TODO: all item lists need to be sorted by name (Kit section is completed)


class Tools extends Component {

  constructor(props) {
    super(props);
    this.state = {
      classNamesArray: ["panel"],
      classNamesString: "panel",
      style: {maxHeight: "0px"},
      hidden: false
    }
  }

  getToolsByClass = (data, toolsClass) => {
    // data - is the "database"
    // category - an object with two strings representing the weapon category and range (ex. let category = {category: "SIMPLE", range: "RANGED"})
    let toolsList = [];
    data.map(item => {
      if (item.equipment_category.toUpperCase() === toolsClass.equipment_category) {
        if (item.tool_category) {
          if (item.tool_category.toUpperCase() === toolsClass.tool_category) {
            return toolsList.push(item);
          } else {
            return null;
          }
        } else if (item.gear_category) {
          if (item.gear_category.toUpperCase() === toolsClass.tool_category) {
            return toolsList.push(item);
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
    let toolsListCards = [];
    toolsListCards = toolsList.map(tool => {
      return <ToolsCard key={tool.index} tools={tool} />
    });
    return toolsListCards;
  }

  getAllTools = () => {
    if (allEquipment) {
      let allTools = [];
      allEquipment.map(item => {
        if (item.equipment_category.toUpperCase() === "TOOLS") {
          return allTools.push(item);
        } else {
          return null;
        }
      });
      // console.log("all tools: ", allTools);
      let allToolsCards = [];
      allToolsCards = allTools.map(item => {
        return <ToolsCard key={item.index} tools={item} />
      });
      return allToolsCards;
    }
  }

  getArtisansTools = () => {
    let toolsClass = {
      equipment_category: "TOOLS",
      tool_category: "ARTISAN'S TOOLS"
    }
    return this.getToolsByClass(allEquipment, toolsClass);
  }

  getGamingSets = () => {
    let toolsClass = {
      equipment_category: "TOOLS",
      tool_category: "GAMING SETS"
    }
    return this.getToolsByClass(allEquipment, toolsClass);
  }

  getMusicalInstruments = () => {
    let toolsClass = {
      equipment_category: "TOOLS",
      tool_category: "MUSICAL INSTRUMENT"
    }
    return this.getToolsByClass(allEquipment, toolsClass);
  }

  getOtherTools = () => {
    let toolsClass = {
      equipment_category: "TOOLS",
      tool_category: "OTHER TOOLS"
    }
    return this.getToolsByClass(allEquipment, toolsClass);
  }

  getKit = () => {
    let adventuringGearClass = {
      equipment_category: "ADVENTURING GEAR",
      tool_category: "KIT"
    }
    let toolsClass = {
      equipment_category: "TOOLS",
      tool_category: "KIT"
    }
    var aKits = this.getToolsByClass(allEquipment, adventuringGearClass);
    var tKits = this.getToolsByClass(allEquipment, toolsClass);
    var allKits = aKits.concat(tKits);
    return componentProperties.sortKitList(allKits);
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
          <button className="accordion" onClick={() => {this.setAccordion()}}>Tools</button>
          <div className={this.state.classNamesString} style={this.state.style}>
            <ToolsTypeSection outputTools={this.getArtisansTools()} title={"Artisan's Tools"}/>
            <ToolsTypeSection outputTools={this.getGamingSets()} title={"Gaming Sets"}/>
            <ToolsTypeSection outputTools={this.getMusicalInstruments()} title={"Musical Instruments"}/>
            <ToolsTypeSection outputTools={this.getOtherTools()} title={"Other Tools"}/>
            <ToolsTypeSection outputTools={this.getKit()} title={"Kits"}/>
            <ToolsTypeSection outputTools={this.getAllTools()} title={"All Tools"}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Tools;
