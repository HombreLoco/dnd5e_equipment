module.exports = {
  setAccordion: function(isHidden) {
    let panel = {
      style: {},
      hidden: true
    }
    // the active class sets the color of the selected section header 
    // this.state.classNamesArray.push("active");
    if (isHidden) {
      panel.style = {maxHeight: "0px"};
      panel.hidden = false;
    } else {
      panel.style = {maxHeight: "100%"};
      panel.hidden = true;
    }
    return panel;
  },
  sortKitList: function(list) {
    list.sort(function(a,b) {
      if (((a.props.adventuringGear) && (a.props.adventuringGear.name < b.props.adventuringGear.name)) || ((a.props.tools) && (a.props.tools.name < b.props.tools.name))) {
        return -1;
      }
      if (((a.props.adventuringGear) && (a.props.adventuringGear.name > b.props.adventuringGear.name)) || ((a.props.tools) && (a.props.tools.name > b.props.tools.name))) {
        return 1;
      }
      return 0;
    });
    return list;
  },
  sortEquipmentPackList: function(list) {
    list.sort(function(a,b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return list;
  },
  rollDie: function(die) {
    let dieSides = [];
    let tempRollResult = 0;
    let selectedSide = 0;

    for (var i = 1; i <= die.sides; i++) {
      dieSides.push({
        sideNumber: i,
        rollResult: Math.random() * Math.random()
      });
    }
    for (var j = 0; j < dieSides.length; j++) {
      if (dieSides[j].rollResult > tempRollResult) {
        tempRollResult = dieSides[j].rollResult;
        selectedSide = dieSides[j].sideNumber;
      }
    }
    return selectedSide;
  }
}

