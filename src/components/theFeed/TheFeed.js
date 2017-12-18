import React, { Component } from 'react';



class TheFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    
  }

  componentDidMount() {
  }

  render() {

    return (
      <div className="feedPanel">
        <div className="feedStream">
          hi
        </div>
      </div>
    )
  }
}

export default TheFeed;
