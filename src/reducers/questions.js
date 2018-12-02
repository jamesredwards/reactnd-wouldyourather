import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions'

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:
      const { question } = action
      return {
        ...state,
        [question.id]: question
      }
    case SAVE_QUESTION_ANSWER:
      const { authedUser, questionID, answer } = action
      return {
        ...state,
        [questionID]: {
          [answer]: {
            ...state[questionID][answer],
            votes: state[questionID][answer].votes.concat([authedUser])
          }
        }
      }
    default:
      return state
  }
}