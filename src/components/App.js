import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import NewQuestion from './NewQuestion'
import LoadingBar from 'react-redux-loading'
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import Navigation from './Nav'
import Login from './Login'
import QuestionDetail from './QuestionDetail'
import PageNotFound from './PageNotFound'


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
            <div className="content">
              <Navigation />
              <Switch>
                {this.props.loading === true
                  ? <Route path="/" exact component={Login} />
                  : <Fragment>
                    <Route path="/" exact component={Home} />
                    <Route path="/leaderboard" component={LeaderBoard} />
                    <Route path="/add" component={NewQuestion} />
                    <Route path="/question/:id" component={QuestionDetail} />
                  </Fragment>
                }
                <Route component={PageNotFound}></Route>
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(App)