import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import TodosIndex from '../Todos/TodosIndex'
import TodosShow from '../Todos/TodosShow'
import TodosUpdate from '../Todos/TodosUpdate'
import TodosCreate from '../Todos/TodosCreate'
import Home from '../Home/Home'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <Route exact path='/' render={() => (
          <Home msgAlert={this.msgAlert} setUser={this.setUser} />
        )} />
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/todos' render={() => (
            <TodosIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/todos/:id' render={({ match }) => (
            <TodosShow msgAlert={this.msgAlert} match={match} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/todos/:id/edit' render={({ match }) => (
            <TodosUpdate msgAlert={this.msgAlert} match={match} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/todos-create' render={({ match }) => (
            <TodosCreate msgAlert={this.msgAlert} match={match} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
