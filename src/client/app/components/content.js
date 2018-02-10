import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { flip, FRONT_PAGESIDE } from '../actions'
import Daygrid from './daygrid'

class Content extends Component {
    constructor(props) {
        super(props)
        this.flipPage = this.flipPage.bind(this)
    }

    static propTypes() {
        return {
            pageside: PropTypes.string.isRequired,
        }
    }

    flipPage(evnt) {
        console.log(evnt.target.value)
        this.props.dispatch(flip(evnt.target.value))
    }

    render() {
        return (
          <div id="content">
            <input
                type="button"
                className="switch"
                value={this.props.pageside}
                onClick={this.flipPage} />
            <Daygrid pageside={this.props.pageside} />
          </div>
        )
    }
}

function mapStateToProps(state) {
    const { flipper } = state
    return {
        pageside: flipper.pageside
    }
}

export default connect(mapStateToProps)(Content)
