import React, { Component } from 'react'
import { Button, Form, FormGroup, FormControl, ControlLabel, MenuItem, DropdownButton } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {

  state = {
    userID: ''
  }

  handleChange = (e) => {
    console.log(this.inputEl)
    const userID = this.inputEl.value
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
      <Form>
        <FormGroup controlId='formControlSelect'>
          <ControlLabel>Select User</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="Select User"
            inputRef={el => this.inputEl = el}
            onChange={this.handleChange}
          >
            {Object.keys(users).map(user => (
              <option value={user}>{user}</option>
            ))}
          </FormControl>
        </FormGroup>
        <Button onClick={this.onLogin} disabled={!userID}>Login</Button>
      </Form>
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