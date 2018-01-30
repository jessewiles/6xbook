import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { greet } from '../actions'

class Day extends Component {
    constructor(props) {
        super(props);
        this.sayHello = this.sayHello.bind(this);
        this.state = {
            filter: this.props.filter,
            avar: this.props.avar
        }
    }

    static propTypes() {
        return {
            filter: PropTypes.string,
            avar: PropTypes.string
        }
    }

    componentDidMount() {
        console.log('did mount: ' + this.props.avar)
        this.props.dispatch(greet(this.props.avar));
    }

    sayHello(e) {
        this.props.dispatch(greet(this.props.avar));
        console.log('hello there: ' + this.props.avar);
    }

    render() {
        return (
            <div id="page">
                <h2> { this.props.avar} </h2>
                <input type="button" className="switch" value={this.props.avar} onClick={this.sayHello} />
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        filter: ownProps.filter,
        avar: appleJaxer.avar
    }
}

export default connect(mapStateToProps)(Day)
