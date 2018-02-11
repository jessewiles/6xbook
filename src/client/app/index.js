import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import sixapp from './reducers'
import Root from './components/root'

const store = createStore(
    sixapp,
    applyMiddleware(thunk)
)


render(
    <Root store={store} />,
    document.getElementById('app')
)
