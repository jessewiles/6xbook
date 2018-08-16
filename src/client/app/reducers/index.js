import { combineReducers } from 'redux'
import flashy from './flashy'
import flipper from './flipper'
import days from './days'
import day from './day'


const sixapp = combineReducers({
    flashy,
    flipper,
    days,
    day
})

export default sixapp
