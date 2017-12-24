import React, { Component } from 'react';
import Equipment from '../Equipment.js';



class TheFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      feed: []
    }
    
  }

  displayMessages = () => {
    let count = 0;
    let messageList = this.props.messages.map((message) => {
      count++;
      return (
        <div key={count}>
          <div className="messageHeader">
            Player Name
          </div>
          {message}
          <div className="clear"></div>
          <div className="messageFooter">
          </div>
        </div>
      )
    });
    return messageList;
  }

  scrollToBottom = () => {
    this.bottomOfFeed.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.setState({feed: this.state.feed});
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {

    return (
      <div className="feedPanel">
        <div className="gameFeedLabel">
          Game Feed
        </div>
        <div className="feedStream" onChange={
          console.log("changed")
          }>
          {this.displayMessages()}
          {this.state.feed}
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.bottomOfFeed = el; }}>
          </div>
        </div>
      </div>
    )
  }
}

export default TheFeed;
