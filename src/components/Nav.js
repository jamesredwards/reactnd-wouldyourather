import React, { Component, Fragment } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { nullAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'
import UserAvatar from './UserAvatar'

class Navigation extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = (e) => {
    e.preventDefault()
    const { history, logout } = this.props
    history.push('/')
    logout()
  }

  render() {
    const { authedUser } = this.props;

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/" className="text-muted">Would You Rather...</NavbarBrand>
          {authedUser &&
            <Fragment>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/leaderboard">Leaderboard</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/add">New Question</NavLink>
                  </NavItem>
                  <NavItem>
                    {<UserAvatar id={authedUser} />}
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={this.logout}>Logout</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Fragment>
          }
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(nullAuthedUser())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))