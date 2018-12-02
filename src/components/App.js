import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import { handleInitialData } from '../actions/shared'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())

  }
  render() {
    return (
      <Login />
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
