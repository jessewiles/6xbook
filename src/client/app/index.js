import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { createStore } from 'redux'
import sixapp from './reducers'
import Root from './components/Root'

const store = createStore(sixapp)


render(
    <Root store={store} />,
    document.getElementById('app')
);
