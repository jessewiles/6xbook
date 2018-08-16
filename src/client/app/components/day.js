import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { requestDay } from '../actions'
import Content from './content' // eslint-disable-line no-unused-vars
import Flasher from './flasher' // eslint-disable-line no-unused-vars
import SiteTitle from './site-title' // eslint-disable-line no-unused-vars


class Day extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes() {
        return {
            hasRequested: this.propTypes.bool.isRequired,
            day: PropTypes.object.isRequired,
        }
    }

    componentWillMount() {
        console.log(this.props.match.params.dayId)
        this.props.dispatch(requestDay(this.props.match.params.dayId))
    }

    render() {
        return (
            <div id="page">
                <SiteTitle />
                <Flasher message="" />
                <Content day={this.props.day} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { day } = state
    return {
        hasRequested: day.hasRequested || false,
        day: day.day || {}
    }
}

export default connect(mapStateToProps)(Day)
