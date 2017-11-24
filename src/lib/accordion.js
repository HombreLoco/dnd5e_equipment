module.exports = {
  setAccordion: function(isHidden) {
    let panel = {
      style: {},
      hidden: false
    }
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

