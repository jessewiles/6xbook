import React from 'react'
import PropTypes from 'prop-types'
import { FRONT_PAGESIDE } from '../actions'


const Daygrid = (props) => {
    const westGrid =  (
      <div id="west" className="cell">
        <div id="also" className="grid">
          <div className="row">
            <div className="cell">
              <div className="rtitle"> MEDITATION </div>
              <div className="bwi">  <span id="meditation" className="wltext pagedata">Click to enter text</span></div>
            </div>
          </div>

          <div className="row">
            <div className="cell">
              <div className="rtitle"> YOGA </div>
              <div className="bwi">  <span id="yoga" className="wltext pagedata">Click to enter text</span></div>
            </div>
          </div>

          <div className="row">
            <div className="cell">
              <div className="rtitle"> DEDICATION </div>
              <div className="bwi">  <span id="dedication" className="wltext pagedata">Click to enter text</span></div>
            </div>
          </div>

          <div className="row">
            <div className="cell">
              <div id="rbottom" className="grid">
                <div className="row">
                  <div className="cell">
                    <div className="rtitle"> BEST </div>
                    <div className="bwi"><span className="rnumber">1</span>  <span id="best1" className="wltext pagedata">Click to enter text</span></div>
                    <div className="bwi"><span className="rnumber">2</span>  <span id="best2" className="wltext pagedata">Click to enter text</span></div>
                    <div className="bwi"><span className="rnumber">3</span>  <span id="best3" className="wltext pagedata">Click to enter text</span></div>
                  </div>

                  <div className="cell">
                    <div className="rtitle"> WORST </div>
                    <div className="bwi"><span className="rnumber">1</span>  <span id="worst1" className="wltext pagedata">Click to enter text</span></div>
                    <div className="bwi"><span className="rnumber">2</span>  <span id="worst2" className="wltext pagedata">Click to enter text</span></div>
                    <div className="bwi"><span className="rnumber">3</span>  <span id="worst3" className="wltext pagedata">Click to enter text</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)

    const eastGrid = (
    <div id="layout" className="grid">
      <div className="row">
        <div id="east" className="cell">
          <div id="thesix" className="grid">
            <div className="row">
              <div className="cell">
                <div id="thesix-1" className="grid asix">
                  <div className="row">
                    <div className="cell theme">
                      <div id="theme1" className="sindent pagedata">Praising myself</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell spacer"> </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>+</b>  <span id="plus1" className="pagedata wtext">I did not commit the root downfall of praising myself when I kept the book.</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>-</b>  <span id="minus1" className="pagedata wtext">I committed the root downfall of praising myself when I saw solid objects.</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>To do</b>  <span id="todo1" className="pagedata wtext">Lama, please come.</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell spacer"> </div>
                  </div>
                </div>
              </div>

              <div className="cell">
                <div id="thesix-2" className="grid asix">
                  <div className="row">
                    <div className="cell theme">
                      <div id="theme2" className="sindent pagedata">Criticizing others</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell spacer"> </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>+</b>  <span id="plus2" className="pagedata wtext">I did not commit the root downfall of criticizing others when I watched little lovey for Her.</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>-</b>  <span id="minus2" className="pagedata wtext">I committed the root downfall of criticizing others when I didn't work for Her.</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>To do</b>  <span id="todo2" className="pagedata wtext">Lama, please come.</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell spacer"> </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="cell">
                <div id="three" className="grid asix">
                  <div className="row">
                    <div className="cell theme">
                      <div id="theme3" className="sindent pagedata">Refusing Dharma</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell spacer"> </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>+</b>  <span id="plus3" className="pagedata wtext">I did not commit the root downfall of refusing Dharma when I struggled to do the right thing.</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>-</b>  <span id="minus3" className="pagedata wtext">I committed the root downfall of refusing Dharma when I didn't  see where things come from.</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>To do</b>  <span id="todo3" className="pagedata wtext">Lama please come to me. Bless my mind with space, for the benefit of limitless living beings.</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell spacer"> </div>
                  </div>
                </div>
              </div>

              <div className="cell">
                <div id="four" className="grid asix">

                  <div className="row">
                    <div className="cell theme">
                      <div id="theme4" className="sindent pagedata">Speak truthfully</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell spacer"> </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>+</b>  <span id="plus4" className="wltext pagedata">Click to enter text</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>-</b>  <span id="minus4" className="wltext pagedata">Click to enter text</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>To do</b>  <span id="todo4" className="wltext pagedata">Click to enter text</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell spacer"> </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="cell">

                  <div id="thesix-5" className="grid asix">

                  <div className="row">
                    <div className="cell theme">
                      <div id="theme5" className="sindent pagedata">Speak to unite</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell spacer"> </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>+</b>  <span id="plus5" className="wltext pagedata">Click to enter text</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>-</b>  <span id="minus5" className="wltext pagedata">Click to enter text</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>To do</b>  <span id="todo5" className="wltext pagedata">Click to enter text</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell spacer"> </div>
                  </div>
                </div>
              </div>

              <div className="cell">
                <div id="six" className="grid asix">

                  <div className="row">
                    <div className="cell theme">
                      <div id="theme6" className="sindent pagedata">See what causes things</div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell spacer"> </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>+</b>  <span id="plus6" className="wltext pagedata">Click to enter text</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>-</b>  <span id="minus6" className="wltext pagedata">Click to enter text</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell grey">
                      <div className="sindent"><b>To do</b>  <span id="todo6" className="wltext pagedata">Click to enter text</span></div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="cell spacer"> </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="central"> </div>
      </div>
    </div>)
    return (props.pageside === FRONT_PAGESIDE) ? eastGrid : westGrid
}

Daygrid.propTypes = {
    pageside: PropTypes.string.isRequired,
}

export default Daygrid
