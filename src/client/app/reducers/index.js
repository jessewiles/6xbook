import { combineReducers } from 'redux'
import flashy from './flashy'
import flipper from './flipper'


const sixapp = combineReducers({
    flashy,
    flipper
})

export default sixapp
