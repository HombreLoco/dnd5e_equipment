import React, { Component } from 'react';

// TODO: this component will display the results from die
// rolls as a string below a string that shows which die was 
// rolled.


class DieRollVisualizer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      diceRolled: "",
      diceResults: ""
    }
  }


  

  

  componentDidMount() {

  }

  render() {
    // Now setup the html to display the visualization of the 
    // roll results

    return (
      <div>
        Hi
      </div>
    );
  }
}

export default DieRollVisualizer;
