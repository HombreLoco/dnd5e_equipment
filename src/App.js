import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import './css/App.css';
import equipment from './data/allEquipment.json';
import Weapons from './components/Weapons.js';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null
    }
  }

  setNewStyles = () => {
    var style = {
      NotificationItem: { // Override the notification item
        DefaultStyle: { // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px'
        },
    
        success: { // Applied only to the success notification item
          color: 'blue'
        }
      }
    }
    return style;
  }

  getAllEquipment = () => {
    console.log("equipment: ", equipment);
  }

  _addNotification = (event) => {
    event.preventDefault();
    this._notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success'
    });
  }

  componentDidMount() {
    this.getAllEquipment();
    this._notificationSystem = this.refs.notificationSystem;
    this.setNewStyles();
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this._addNotification}>Add notification</button>
          <NotificationSystem ref="notificationSystem" style={this.setNewStyles()}/>
        </div>
        <Weapons />
      </div>
    );
  }
}

export default App;
