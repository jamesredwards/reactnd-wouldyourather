import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {

  state = {
    userID: ""
  }

  handleChange = (e) => {
    e.preventDefault()
    const userID = e.target.value
    this.setState(() => ({
      userID
    }))
  }


  onLogin = () => {
    const { userID } = this.state
    const { setAuthedUser } = this.props
    if (userID) {
      setAuthedUser(userID)
    }
  }

  render() {
    const { authedUser, users, referrer } = this.props
    const { userID } = this.state

    if (authedUser !== null) {
      return <Redirect to={referrer || '/'} />
    }

    return (
      <div className="Login">
        <Form>
          <FormGroup>
            <Label for="selectUser">Select User</Label>
            <Input
              type="select"
              name="select"
              value={userID}
              onChange={this.handleChange}
            >
              <option value="" disabled>Please select a user</option>
              {
                Object.keys(users).map(user => (
                  <option key={user} value={user}>{users[user].name}</option>
                ))
              }
            </Input>
          </FormGroup>
          <Button
            onClick={this.onLogin}
            disabled={!userID}
            block
          >
            Login
          </Button>
        </Form>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }, props) {
  return {
    authedUser,
    users,
    referrer: props && props.location.state && props.location.state.referrer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthedUser: (id) => {
      dispatch(setAuthedUser(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)