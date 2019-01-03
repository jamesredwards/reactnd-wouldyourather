import React, { Component, Fragment } from 'react'
import { Jumbotron } from 'reactstrap'
import { Link } from 'react-router-dom'

class PageNotFound extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <Jumbotron>
            <h1 className="display-3">Oops...</h1>
            <h3>We couldn't find that page</h3>
            <Link to="/">Click here </Link> to return home
        </Jumbotron>
        </div>
      </Fragment>
    )
  }
}

export default PageNotFound