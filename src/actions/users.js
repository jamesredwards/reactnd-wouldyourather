export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function addUserAnswer(authedUser, qid, answer) {
  return {
    type: ADD_USER_ANSWER,
    authedUser,
    qid,
    answer
  }
}