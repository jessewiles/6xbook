import React from 'react'
import PropTypes from 'prop-types'
import Content from './content'
import Flasher from './flasher'
import FRONT_PAGESIDE from '../actions'
import SiteTitle from './site-title'

const Day = ({props}) => {
    return (
      <div id="page">
        <SiteTitle />
        <Flasher message="" />
        <Content />
      </div>
    )
}

export default Day
