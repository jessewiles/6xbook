import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Day from './day'
import Home from './Home'

const App = ({ props }) => {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/days" component={Day} />
        <Route path="/day/:daystring" component={Day} />
      </Switch>
    )
}

export default App
