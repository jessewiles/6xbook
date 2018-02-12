import React from 'react' // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom' // eslint-disable-line no-unused-vars

const SiteTitle = () => {
    return (
        <div id="header">
          <div className="site-title"><Link to="/"> Daily Six Times Book</Link></div>
        </div>
    )
}

export default SiteTitle
