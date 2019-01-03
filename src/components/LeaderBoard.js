import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { connect } from 'react-redux'
import UserAvatar from './UserAvatar'

class LeaderBoard extends Component {

  render() {
    const { ranked } = this.props
    return (
      <div>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Questions Asked</th>
              <th>Questions Answered</th>
            </tr>
          </thead>
          <tbody>
            {
              ranked.map((user, rank) =>
                <tr key={user.user}>
                  <td>{rank + 1}</td>
                  <td>{<UserAvatar id={user.user} />}</td>
                  <td>{user.asked}</td>
                  <td>{user.answered}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  const ranked = Object.keys(users).map((user) => ({
    user,
    name: users[user].name,
    asked: users[user].questions.length,
    answered: Object.keys(users[user].answers).length
  })).sort((a, b) => (b.asked + b.answered) - (a.asked + a.answered))
  return { ranked }
}
export default connect(mapStateToProps)(LeaderBoard)