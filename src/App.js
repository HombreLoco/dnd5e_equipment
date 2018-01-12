import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import './css/App.css';
import allEquipment from './data/allEquipment.json';
import Equipment from './components/Equipment.js';
import AllDicePanel from './components/AllDicePanel.js';
import TheFeed from './components/theFeed/TheFeed.js';
import GemstoneTreasureGenerator from './components/dmTools/gemstoneTreasureGenerator.js';
import GemMatcher from './components/miniGames/gemMatcher.js';


class App extends Component {

  //TODO: check if each of the ...TypeSection.js components could be dryed up and reduced to one file that all equipment sections use.

  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      messages: [],
      gemstoneGenerator: []
    }

    this.addMessageToStream = this.addMessageToStream.bind(this);
  }

  setNewStyles = () => {
    var style = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px'
        },
    
        success: { // Applied only to the success notification item
          "color": 'blue'
        }
      }
    }
    return style;
  }

  getAllEquipment = () => {
    console.log("all equipment: ", allEquipment);
  }

  _addNotification = (event) => {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success'
    });
  }

  addMessageToStream = (message) => {
    this.state.messages.push(message);
    this.setState({messages: this.state.messages});
  }

  componentDidMount() {
    // this.getAllEquipment();
    this._notificationSystem = this.refs.notificationSystem;
    this.setNewStyles();
  }

  render() {
    return (
      <div className="fullAppWindow">
        <div>
          <button onClick={this._addNotification}>Add notification</button>
          <NotificationSystem ref="notificationSystem" style={this.setNewStyles()} />
        </div>
        <div className="">
          <GemMatcher addMessageToStream={this.addMessageToStream} />
          {/* <div className="clear"></div> */}
        </div>
        <div className="appFeedPanel">
          <TheFeed messages={this.state.messages} />
          {/* <div className="clear"></div> */}
        </div>
        <div className="appGemGeneratorPanel">
          <GemstoneTreasureGenerator addMessageToStream={this.addMessageToStream} initializeGemstoneTreasureGenerator={this.initializeGemstoneTreasureGenerator}/>
          {/* <div className="clear"></div> */}
        </div>
        <div className="appDicePanel">
          <AllDicePanel addMessageToStream={this.addMessageToStream} />
          {/* <div className="clear"></div> */}
        </div>
        <div className="appEquipmentPanel">
          <Equipment />
          {/* <div className="clear"></div> */}
        </div>
      </div>
    );
  }
}

export default App;
