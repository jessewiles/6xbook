import React from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import { Provider } from 'react-redux' // eslint-disable-line no-unused-vars
import { HashRouter as Router } from 'react-router-dom' // eslint-disable-line no-unused-vars
import App from './app' // eslint-disable-line no-unused-vars

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
