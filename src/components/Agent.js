import React from 'react'
import { connect } from 'react-redux'
import { all, put, takeEvery } from 'redux-saga/effects'
import withModule from './withModule'

const reducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

function* defaultActionWatcher(action) {
  yield console.log('AGENT ACTION CATCHED')
  //yield put({ type: 'COMMON_ACTION' })
}

function* commonActionWatcher(action) {
  yield console.log('@common/TEST_ACTION CATCHED')
}

function* saga() {
  yield all([
    takeEvery('@agent/DEFAULT_ACTION', defaultActionWatcher),
    takeEvery('@common/TEST_ACTION', commonActionWatcher)
  ])
}

const Agent = props => {
  const { commonAction, agentAction } = props
  return (
    <div>
      <h1>This is Agent component</h1>
      <button onClick={commonAction}>Fire common action!</button>
      <button onClick={agentAction}>Fire agent action!</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch, props) => ({
  commonAction: () => dispatch({ type: 'COMMON_ACTION' }),
  agentAction: () => dispatch({ type: '@agent/DEFAULT_ACTION' })
})

export default withModule('agent', reducer, saga)(connect(null, mapDispatchToProps)(Agent))