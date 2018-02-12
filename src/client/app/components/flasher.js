import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { flash } from '../actions'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'


class Flasher extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes() {
        return {
            message: PropTypes.string,
        }
    }

    componentDidMount() {
        this.props.dispatch(flash(this.props.message || ""))
    }

    render() {
        return (
        <CSSTransition
            classNames="flash"
            timeout={1000}>
            <div id="flash-wrapper">
                <span className="flash">{this.props.message}</span>
            </div>
        </CSSTransition>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const { flashy } = state
    return {
        message: flashy.message
    }
}

export default connect(mapStateToProps)(Flasher)
