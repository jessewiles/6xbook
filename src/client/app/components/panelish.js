import React from 'react' // eslint-disable-line no-unused-vars
import { Panel } from 'react-bootstrap'

const Panelish = (props) => {
    const handleClick = () => console.log('Happy Days are here again!')
    return (
      <div>
        <h2> Unusually Clickable </h2>
        <Panel onClick={handleClick}>
          <Panel.Body>This here's a tune for all of the fellas.</Panel.Body>
        </Panel>
      </div>
    )
}

export default Panelish
