import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { greet, flash } from '../actions'
import Daygrid from './daygrid'

class Content extends Component {
    constructor(props) {
        super(props)
        this.sayHello = this.sayHello.bind(this);
    }

    static propTypes() {
        return {
            greeting: PropTypes.string.isRequired,
        }
    }

    sayHello(evnt) {
        this.props.dispatch(greet(this.props.greeting))
        this.props.dispatch(flash(this.props.greeting))
    }

    render() {
        return (
        <div id="content">
            <h2> { this.props.greeting } </h2>
            <input type="button" className="switch" value={this.props.greeting} onClick={this.sayHello} />
            <Daygrid />
        </div>
        )
    }
}

function mapStateToProps(state) {
    const { appleJaxer } = state
    return {
        greeting: appleJaxer.greeting
    }
}

export default connect(mapStateToProps)(Content)
