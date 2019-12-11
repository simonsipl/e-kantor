import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { withStyles } from '@material-ui/core'

import ExchangeTable from './containers/ExchangeTable/ExchangeTable'
import MainMenu from './components/MainMenu';
import LoginComponent from './containers/Login/Login'

const styles = theme => ({
  title: {
    flexGrow: 1,
  },
  user: {
    marginRight: theme.spacing(2),
  },
  menuItems: {
    focusVisible: true
  }
})

class App extends Component {

  state = {
    WebSocketData: {
      PublicationDate: null,
      Items: [],
    },
    auth: false,
    user: null
  }

  ws = new WebSocket('ws://webtask.future-processing.com:8068/ws/currencies');

  componentDidMount() {

    this.ws.onmessage = evt => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data)
      this.setState({ WebSocketData: message })
    }
    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss

    }
  }

  isAuth = (val, body) => {
    this.setState({
      auth: val,
      user: body
    })
  }


  render() {
    return (
      <div className='App'>
        <MainMenu auth={this.state.auth} user={this.state.user} />
        <Switch>
          <Route path="/" exact render={(props) =>
            this.state.auth ? <ExchangeTable {...props} WebSocketData={this.state.WebSocketData} /> : <LoginComponent {...props} isAuth={this.isAuth}
            />} />
          <Route path="/register" render={() => <h1>Register</h1>} />
          <Route path="/login" render={(props) => <LoginComponent {...props} isAuth={this.isAuth} />} />
        </Switch>

      </div >
    );
  }
}

export default withStyles(styles)(App);