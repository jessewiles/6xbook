import React from 'react' // eslint-disable-line no-unused-vars
import { Route, Switch } from 'react-router-dom' // eslint-disable-line no-unused-vars
import Day from './day'
import Days from './days' // eslint-disable-line no-unused-vars
import Home from './home'
import Panelish from './panelish'

const App = () => {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/days/:daystring" component={Day} />
        <Route path="/days/" render={(props) => 
            (<Days {...props} days={[]} hasRequested={false} />)} />
        <Route path="/panel" component={Panelish} />
      </Switch>
    )
}

export default App
