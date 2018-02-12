import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { requestDays } from '../actions'

class Days extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes() {
        return {
            hasRequested: this.propTypes.bool.isRequired,
            days: this.propTypes.array.isRequired,
        }
    }

    componentWillMount() {
        this.props.dispatch(requestDays())
    }

    render() {
        let formatted_days= this.props.days.map((item) => {
            return (
                <li key={'days:' + item}><Link to={`/days/${item}`}>{item}</Link></li>
            )
        })
        return (
        <div>
          <ul>
            {formatted_days}
          </ul>
        </div>)
    }
}

function mapStateToProps(state) {
    const { days } = state
    console.log(days)
    return {
        hasRequested: days.hasRequested || false,
        days: days.days || []
    }
}

export default connect(mapStateToProps)(Days)
