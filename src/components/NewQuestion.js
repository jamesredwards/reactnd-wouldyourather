import React, { Component } from 'react'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


class NewQuestion extends Component {

  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  }

  handleOptionOneChange = (e) => {
    const text = e.target.value
    this.setState(() => ({
      optionOne: text
    }))
  }

  handleOptionTwoChange = (e) => {
    const text = e.target.value
    this.setState(() => ({
      optionTwo: text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOne, optionTwo } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddQuestion(optionOne, optionTwo, id))

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: id ? false : true,
    }))
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state

    if (toHome === true) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <h3 className="center">Would you rather...?</h3>
        <p></p>
        <form className="new-question" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Option 1..."
            value={optionOne}
            onChange={this.handleOptionOneChange}
            className="textarea"
          />
          <span></span>
          <textarea
            placeholder="Option 2..."
            value={optionTwo}
            onChange={this.handleOptionTwoChange}
            className="textarea"
          />
          <span></span>
          <button
            className="btn"
            type="submit"
            disabled={optionOne === "" || optionTwo === ""}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)