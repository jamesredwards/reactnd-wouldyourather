import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import NewQuestion from './NewQuestion'
import LoadingBar from 'react-redux-loading'
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import Nav from './Nav'
import Login from './Login';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {

    return (

      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            <Switch>
              {this.props.loading === true
                ? <Route path="/" exact component={Login} />
                : <div>
                  <Route path="/" exact component={Home} />
                  <Route path="/leaderboard" component={LeaderBoard} />
                  <Route path="/newquestion" component={NewQuestion} />
                </div>
              }
            </Switch>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)