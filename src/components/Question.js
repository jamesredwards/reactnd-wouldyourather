import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardText } from 'reactstrap'


class Question extends Component {
  loadQuestion = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/question/${id}`)
  }

  render() {
    const { question } = this.props

    return (
      <Link to={`/question/${question.id}`} className="Question">
        <Card
          onClick={(e) => this.loadQuestion(e, question.id)}
        >
          <CardHeader className="text-muted" tag="h4">Would you rather...</CardHeader>
          <CardBody>
            <CardText>{question.optionOne.text}</CardText>
            <CardText>
              <small className="text-muted">OR</small>
            </CardText>
            <CardText>{question.optionTwo.text}</CardText>
          </CardBody>
        </Card>
      </Link>
    )
  }
}

function mapStateToProps({ questions }, { id }) {
  return {
    question: questions[id]
  }
}

export default withRouter(connect(mapStateToProps)(Question))