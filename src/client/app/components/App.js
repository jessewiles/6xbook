import React from 'react'
import Day from './Day'

const App = ({ match: { params } }) => {
  return (
    <Day filter={params.filter || 'ALPHA'} />
  )
}

export default App
