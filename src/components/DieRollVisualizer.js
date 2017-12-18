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


  
  displayRollResults = () => {
    let count = 0;
    let results = this.props.rolls.map((roll) => {
      if (count === this.props.rolls.length - 1) {
        count++;
        return (
          <div key={count}>
            <div className="floatLeft">
              <div className="rollSides">
                d{roll.die.sides}
              </div>
              <div className="rollResult">
                {roll.sideSelected}
              </div>
            </div>
            <div className="floatLeft">
                <div className="rollSides">
                  =
                </div>
                <div className="rollResult">
                  =
                </div>
              </div>
            <div className="floatLeft">
              <div className="rollSides">
                Total
              </div>
              <div className="rollResult">
                {this.props.total}
              </div>
            </div>
          </div>
        )
      } else {
        count++;
        return (
          <div key={count}>
            <div className="floatLeft">
              <div className="rollSides">
                d{roll.die.sides}
              </div>
              <div className="rollResult">
                {roll.sideSelected}
              </div>
            </div>
              <div className="floatLeft">
                <div className="rollSides">
                  +
                </div>
                <div className="rollResult">
                  +
                </div>
              </div>
          </div>
        )
      }
      
    });
    return results;
  }
  

  componentDidMount() {
    console.log("props: ", this.props);

  }

  render() {
    // Now setup the html to display the visualization of the 
    // roll results

    return (
      <div className="rollResultSection">
        {this.displayRollResults()}
        <div className="clear">
        </div>
      </div>
    );
  }
}

export default DieRollVisualizer;
