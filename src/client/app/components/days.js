import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom' // eslint-disable-line no-unused-vars

import { requestDays } from '../actions'
import Flasher from './flasher'
import SiteTitle from './site-title'

class Days extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes() {
        return {
            hasRequested: this.propTypes.bool.isRequired,
            days: PropTypes.array.isRequired,
        }
    }

    componentWillMount() {
        this.props.dispatch(requestDays())
    }

    render() {
        let formatted_days= this.props.days.map((item) => {
            return (
                <li key={'days:' + item.ID}><Link to={`/days/${item.Day}`}>{item.Day}</Link></li>
            )
        })
        return (
        <div>
          <SiteTitle />
          <Flasher message="" />
 
          <ul>
            {formatted_days}
          </ul>
        </div>)
    }
}

function mapStateToProps(state) {
    const { days } = state
    return {
        hasRequested: days.hasRequested || false,
        days: days.days || []
    }
}

export default connect(mapStateToProps)(Days)
