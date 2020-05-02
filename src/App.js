import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { Agent, Client, Home } from './components'
import './App.css'

const App = props => {
  return (
    <div className="App">

      <header className="App-header">
        <NavLink to="/">Home</NavLink>
        <span> | </span>
        <NavLink to="/agent">Agent</NavLink>
        <span> | </span>
        <NavLink to="/client">Client</NavLink>
      </header>

      <Switch>
        <Route path="/agent" component={Agent}/>
        <Route path="/client" component={Client}/>
        <Route path="/" component={Home}/>
      </Switch>

    </div>
  )
}

export default App