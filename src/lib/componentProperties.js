module.exports = {
  setAccordion: function(isHidden) {
    let panel = {
      style: {},
      hidden: false
    }
    // the active class sets the color of the selected section header 
    // this.state.classNamesArray.push("active");
    if (!isHidden) {
      panel.style = {maxHeight: "0px"};
      panel.hidden = true;
    } else {
      panel.style = {maxHeight: "100%"};
      panel.hidden = false;
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
  }
}

