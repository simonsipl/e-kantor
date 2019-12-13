import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { withStyles } from '@material-ui/core'

import ExchangeTable from './containers/ExchangeTable/ExchangeTable'
import MainMenu from './components/MainMenu';
import Login from './containers/Login/Login'
import Register from './containers/Register/Register'

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
    auth: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    me: localStorage.getItem('me') ? JSON.parse(localStorage.getItem('me')) : {},
    balance: {}
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

  componentDidUpdate() {
    if (this.state.auth && !this.state.me) {
      fetch('/api/user/me', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.state.user })
      })
        .then(res => res.json()).then(json => {
          const { name, surname, vaultId, email } = json
          return localStorage.setItem('me', JSON.stringify({ name, surname, vaultId, email }))
        })
    }

    if (this.state.auth && this.state.balance !== JSON.parse(localStorage.getItem('balance'))) {
      this.getBalance()
    }

  }

  getBalance = async () => {
    const response = await fetch('/api/wallet/getWallet', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.user
      })
    });
    if (response.status !== 200) {
      throw new Error('Authentication Error')
    }


    const body = await response.json();

    this.setState({
      balance: body
    })
    localStorage.setItem('balance', JSON.stringify(body));
  }


  isAuth = (val, body) => {
    this.setState({
      auth: val,
      user: body
    })
    localStorage.setItem('auth', JSON.stringify(val));
    localStorage.setItem('user', JSON.stringify(body));
  }


  render() {
    return (
      <div className='App'>
        <MainMenu auth={this.state.auth} user={this.state.user} />
        <Switch>
          <Route path="/" exact render={(props) =>
            this.state.auth ? <ExchangeTable {...props} WebSocketData={this.state.WebSocketData} email={this.state.user} balance={this.state.balance} /> : <Login {...props} isAuth={this.isAuth}
            />} />
          <Route path="/register" render={(props) => <Register {...props} />} />
          <Route path="/login" render={(props) => <Login {...props} isAuth={this.isAuth} getBalance={this.getBalance} />} />
          <Route path="/logout" render={(props) => <div>Logout</div>} />
        </Switch>

      </div >
    );
  }
}

export default withStyles(styles)(App);