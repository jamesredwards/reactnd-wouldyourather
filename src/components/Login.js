import React, { Component } from 'react'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {

  state = {
    userID: ""
  }

  /*handleChange = (e) => {
    e.preventDefault()
    const userID = this.inputEl.value
    this.setState(() => ({
      userID
    }))
    console.log(this.state)
  }*/

  handleChange = (e) => {
    e.preventDefault()
    const userID = e.target.value
    this.setState(() => ({
      userID
    }))
    console.log(this.state)
  }

  onLogin = () => {
    const { userID } = this.state
    const { setAuthedUser } = this.props
    if (userID) {
      setAuthedUser(userID)
    }
  }

  render() {
    const { users } = this.props
    const { userID } = this.state

    return (
      <div className="Login">
        <form onSubmit={this.handleChange}>
          <FormGroup controlId="user" bsSize="large">
            <ControlLabel>Select user</ControlLabel>
            <FormControl
              componentClass="select"
              autoFocus
              placeholder="Select user"
              inputRef={el => this.inputEl = el}
              onChange={this.handleChange}
            >
              {
                Object.keys(users).map(user => (
                  <option key={user} value={user}>{user}</option>
                ))
              }
            </FormControl>
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!userID}
            type="submit"
            onClick={this.onLogin}
          >
            Login
          </Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return { users }
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: (id) => {
      dispatch(setAuthedUser(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)