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
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this._addNotification}>Add notification</button>
          <NotificationSystem ref="notificationSystem" />
        </div>
        <Weapons />
      </div>
    );
  }
}

export default App;
