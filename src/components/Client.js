import React from 'react'
import withModule from './withModule'

const reducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const Client = props => {
  return (
    <div>
      <h1>This is Client component</h1>
    </div>
  )
}

export default withModule('client', reducer)(Client)