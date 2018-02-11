import { combineReducers } from 'redux'
import flashy from './flashy'
import flipper from './flipper'
import days from './days'


const sixapp = combineReducers({
    flashy,
    flipper,
    days
})

export default sixapp
