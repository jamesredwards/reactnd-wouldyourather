import React, { Component } from 'react'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, FormGroup, Label, Input, Form, Button } from 'reactstrap';

class NewQuestion extends Component {

  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  }

  handleOptionOneChange = (e) => {
    e.preventDefault()

    const text = e.target.value
    this.setState(() => ({
      optionOne: text
    }))
  }

  handleOptionTwoChange = (e) => {
    e.preventDefault()
    const text = e.target.value
    this.setState(() => ({
      optionTwo: text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch, id } = this.props
    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: id ? false : true,
    }))
    dispatch(handleAddQuestion(optionOne, optionTwo))
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state

    if (toHome === true) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Card>
          <CardHeader className="text-muted" tag="h4">
            Would you rather...
          </CardHeader>
          <CardBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="optionOne">
                  <Input
                    type="text"
                    name="optionOne"
                    value={optionOne}
                    onChange={this.handleOptionOneChange}
                    placeholder="Option One"
                  />{' '}
                </Label>
              </FormGroup>
              <FormGroup>
                <Label for="optionTwo">
                  <Input
                    type="text"
                    name="optionOne"
                    value={optionTwo}
                    onChange={this.handleOptionTwoChange}
                    placeholder="Option Two"
                  />{' '}
                </Label>
              </FormGroup>
              <Button
                disabled={optionOne === '' || optionTwo === ''}
                onClick={this.handleSubmit}
                block
              >
                Submit new question
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    )
  }
}


export default connect()(NewQuestion)