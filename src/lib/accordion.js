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
  }
}

