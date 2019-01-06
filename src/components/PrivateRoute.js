import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class PrivateRoute extends Component {

  render() {
    const { component: Comp, isLoggedIn, ...rest } = this.props

    return (
      <Route {...rest} render={props => {
        return isLoggedIn
          ? <Comp {...props} />
          : <Redirect to={{
            pathname: '/login',
            state: { referrer: this.props.location.pathname }
          }} />
      }} />
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    isLoggedIn: authedUser !== null
  }
}

export default connect(mapStateToProps)(PrivateRoute)