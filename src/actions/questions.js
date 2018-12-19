import { showLoading, hideLoading } from "react-redux-loading";
import { saveQuestion } from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function saveQuestionAnswer(authedUser, questionID, answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    questionID,
    answer
  }
}

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOne,
      optionTwo,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}