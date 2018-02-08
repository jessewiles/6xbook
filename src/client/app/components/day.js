import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Content from './content'
import Flasher from './flasher'
import SiteTitle from './site-title'

class Day extends Component {
    static propTypes() {
        return {
            filter: PropTypes.string,
        }
    }

    render() {
        return (
            <div id="page">
                <SiteTitle />

                <Flasher message="" />

                <Content />

                
            </div>
        )
    }
}

export default Day
