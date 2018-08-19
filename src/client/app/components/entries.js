import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Entries extends Component {
    constructor(props) {
        super(props)
        this.state = { extraEntries: 0 }
        this.addVow = this.addVow.bind(this)
    }

    static propTypes() {
        return { extraVow: PropTypes.bool.isRequired }
    }

    addVow() {
        this.setState({ extraEntries: this.state.extraEntries + 1 })
    }

    render() {
        let day = this.props.day.day.label || "...",
            entries = this.props.day.day.entries || [],
            disabled = (entries.length + this.state.extraEntries) == 6 ?
                {'disabled': 'disabled'} : '',
            formattedEntries = entries.map((entry) => {
                return (
                  <div key={entry.id} className="row">
                    <div className="entry">
                    <div className="col-8"><b>Vow</b> {entry.vow}</div>
                    <div className="col-8"><b>+:</b> {entry.plus}</div>
                    <div className="col-8"><b>-:</b> {entry.minus}</div>
                    <div className="col-8"><b>::</b> {entry.todo}</div>
                    </div>
                  </div>
                )
            }),
            extraEntries = []

        for (var i = 0; i < this.state.extraEntries; i++) {
            extraEntries.push((
              <div key={'extraVow'+i.toString()} className="row">
                <div className="entry">
                  <div className="col-8"><b>Vow</b> Edit</div>
                  <div className="col-8"><b>+:</b> Edit</div>
                  <div className="col-8"><b>-:</b> Edit</div>
                  <div className="col-8"><b>::</b> Edit</div>
                </div>
              </div>
            ))
        }
        return (
        <div className="container">
            <input type="button" className="add-vow" value="Add Vow" onClick={this.addVow} {...disabled} />
            <h2>{day} </h2>
            <div className="row">
              <div className="col-8">xox</div>
              <div className="col-8">xox</div>
            </div>
            {formattedEntries}
            {extraEntries}
        </div>
        )
    }
}

export default Entries
