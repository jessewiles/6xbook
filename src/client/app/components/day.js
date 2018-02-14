import React from 'react' // eslint-disable-line no-unused-vars
import Content from './content' // eslint-disable-line no-unused-vars
import Flasher from './flasher' // eslint-disable-line no-unused-vars
import SiteTitle from './site-title' // eslint-disable-line no-unused-vars

const Day = () => {
    return (
      <div id="page">
        <SiteTitle />
        <Flasher message="" />
        <Content />
      </div>
    )
}

export default Day
