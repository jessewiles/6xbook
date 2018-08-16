import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { flip } from '../actions'
import Xgrid from './xgrid' // eslint-disable-line no-unused-vars

class Content extends Component {
    constructor(props) {
        super(props)
        this.flipPage = this.flipPage.bind(this)
        this.day = {}
    }

    static propTypes() {
        return {
            pageside: PropTypes.string.isRequired,
            day: PropTypes.object.isRequired,
        }
    }

    flipPage() {
        this.props.dispatch(flip(this.props.pageside))
    }

    render() {
        return (
          <div id="content">
            <input
                type="button" className="switch" value="Flip"
                onClick={this.flipPage} />
            <Xgrid day={this.props.day} />
          </div>
        )
    }
}

function mapStateToProps(state) {
    const { day, flipper } = state
    return {
        pageside: flipper.pageside,
        day
    }
}

export default connect(mapStateToProps)(Content)
