import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import Question from './Question'

class Home extends Component {
  state = {
    activeTab: '1'
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  render() {

    const { answeredQuestions, unansweredQuestions } = this.props

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Answered Questions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Unanswered Questions
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {
              answeredQuestions.map(qid =>
                <Question key={qid} id={qid} />
              )
            }
          </TabPane>
          <TabPane tabId="2">
            {
              unansweredQuestions.map(qid =>
                <Question key={qid} id={qid} />
              )
            }
          </TabPane>
        </TabContent>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  const user = users[authedUser]
  const answeredQuestions = Object.keys(user.answers)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

  return {
    answeredQuestions,
    unansweredQuestions: Object.keys(questions).filter(qid => !answeredQuestions.includes(qid))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Home)