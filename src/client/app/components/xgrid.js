import React from 'react'
import PropTypes from 'prop-types'

const Xgrid = (props) => {
    console.log(props)
    let day = props.day.day.Day || "..."
    return (
      <div className="container">
        <h2>{day}</h2>
        <div className="row">
          <div className="col-6">xox</div>
          <div className="col-6">xox</div>
        </div>
      </div>
    )
}

export default Xgrid
