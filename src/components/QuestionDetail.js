import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/questions'
import { Card, CardBody, CardHeader, Progress, Button, Form, FormGroup, Label, Input, Badge } from 'reactstrap'
import UserAvatar from './UserAvatar';
import PageNotFound from './PageNotFound'

class QuestionDetail extends Component {
  state = {
    selectedOption: ""
  }

  handleRadioSelected = (e) => {
    this.setState({
      selectedOption: e.target.value
    })
  }

  handleSubmit = (e) => {
    const answer = this.state.selectedOption
    e.preventDefault()
    this.props.saveAnswer(answer)
  }


  render() {

    const { question, author, authedUser } = this.props

    if (!question) {
      return <PageNotFound />
    }

    const isAnswered = question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
    const optionOneAnswered = question.optionOne.votes.includes(authedUser)
    const optionTwoAnswered = question.optionTwo.votes.includes(authedUser)

    const { selectedOption } = this.state
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const totalVotes = (optionOneVotes + optionTwoVotes) + 0.00000000000001 //avoid div 0 or NaN
    const optionOnePct = ((optionOneVotes / totalVotes) * 100)
    const optionTwoPct = ((optionTwoVotes / totalVotes) * 100)

    return (
      <Card>
        <CardHeader>

          {<UserAvatar id={author.id} />} asks would you rather...
        </CardHeader>
        <CardBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup tag="fieldset">
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio1" value="optionOne" onChange={this.handleRadioSelected} />{' '}
                  {question.optionOne.text}
                </Label>
                <div></div>
                {isAnswered ?
                  <div>
                    <Badge color="info">{`[${optionOneVotes} of ${totalVotes.toFixed(0)} votes cast]`}</Badge> {' '}
                    {optionOneAnswered ?
                      <Badge color="success">Your response</Badge>
                      : null
                    }
                    <div></div>
                    <Progress value={optionOnePct}>{`${optionOnePct.toFixed(0)}%`}</Progress> {' '}
                    <div></div>
                  </div>
                  : null
                }
                <Label check>
                  <Input type="radio" name="radio1" value="optionTwo" onChange={this.handleRadioSelected} />{' '}
                  {question.optionTwo.text}
                </Label>
                <div></div>
                {isAnswered ?
                  <div>
                    <Badge color="info">{`[${optionTwoVotes} of ${totalVotes.toFixed(0)} votes cast]`}</Badge> {' '}
                    {optionTwoAnswered ?
                      <Badge color="success">Your response</Badge>
                      : null
                    }
                    <div></div>
                    <Progress value={optionTwoPct}>{`${optionTwoPct.toFixed(0)}%`}</Progress> {' '}
                  </div>
                  : null
                }

              </FormGroup>
            </FormGroup>
            <Button
              color="secondary"
              size="lg"
              block disabled={selectedOption === '' || isAnswered}
              type="submit"
              onClick={(e) => this.handleSubmit(e)}
            >
              {isAnswered ? "You already answered this question" : "Submit answer"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    )
  }
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params
  return {
    saveAnswer: (answer) => dispatch(handleSaveQuestionAnswer(id, answer))
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params
  const question = questions[id]


  return {
    question: question ? question : null,
    author: question ? users[question.author] : null,
    authedUser: authedUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetail);