import { combineReducers } from 'redux'
import appleJaxer from './appleJaxer'
import macko from './macko'
import flashy from './flashy'


const sixapp = combineReducers({
    appleJaxer,
    macko,
    flashy
})

export default sixapp
