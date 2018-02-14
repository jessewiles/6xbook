import React from 'react' // eslint-disable-line no-unused-vars
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import sixapp from './reducers'
import Root from './components/root' // eslint-disable-line no-unused-vars

const store = createStore(
    sixapp,
    applyMiddleware(thunk)
)


render(
    <Root store={store} />,
    document.getElementById('app')
)
