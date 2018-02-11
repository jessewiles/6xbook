import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Day from './day'
import Days from './days'
import Home from './home'

const App = (props) => {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/days/" render={(props) => 
            (<Days {...props} days={[]} hasRequested={false} />)} />
        <Route path="/days/:daystring" component={Day} />
      </Switch>
    )
}

export default App
