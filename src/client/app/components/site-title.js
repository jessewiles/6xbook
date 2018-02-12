import React from 'react'
import { Link } from 'react-router-dom'

const SiteTitle = () => {
    return (
        <div id="header">
          <div className="site-title"><Link to="/"> Daily Six Times Book</Link></div>
        </div>
    )
}

export default SiteTitle
