import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class UserAvatar extends Component {

  render() {
    const { user } = this.props

    return (
      <Fragment>
        <img src={user.avatarURL} className="userAvatar" alt={`${user.name}`} />
        <span>{user.name}</span>
      </Fragment>
    )
  }
}

function mapStateToProps({ users }, { id }) {
  return {
    user: users[id]
  }
}

export default connect(mapStateToProps)(UserAvatar)