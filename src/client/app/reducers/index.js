import { combineReducers } from 'redux'
import appleJaxer from './appleJaxer'
import macko from './macko'


const sixapp = combineReducers({
    appleJaxer,
    macko
})

export default sixapp
