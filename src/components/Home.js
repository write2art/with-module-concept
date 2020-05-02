import React from 'react'
import { connect } from 'react-redux'
import withModule from './withModule'

export const actions = {
  home: () => ({ type: '@home/HOME_ACTION' })
}

export const reducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const Home = props => {
  const { homeAction, commonAction, agentAction } = props
  return (
    <div>
      <h1>This is Home component</h1>
      <button onClick={homeAction}>Fire home action!</button>
      <button onClick={commonAction}>Fire common action!</button>
      <button onClick={agentAction}>Fire agent action!</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch, props) => ({
  homeAction: () => dispatch(actions.home()),
  commonAction: () => dispatch({ type: 'COMMON_ACTION' }),
  agentAction: () => dispatch({ type: '@agent/DEFAULT_ACTION' })
})

export default withModule('home', reducer)(connect(null, mapDispatchToProps)(Home))