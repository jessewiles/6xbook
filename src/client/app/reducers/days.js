import { REQUEST_DAYS, RECEIVE_DAYS, receiveDays } from '../actions'

const doReceiveDays = (state, action) => {
    return 
}


const days = (state = {days: [], hasRequested: false}, action) => {
    switch(action.type) {
        case REQUEST_DAYS:
            console.log('handled: ' +REQUEST_DAYS)
            return Object.assign({}, state, {hasRequested: true})

        case RECEIVE_DAYS:
            console.log('handled: ' +RECEIVE_DAYS)
            return Object.assign({}, state, {days: action.days})

        default:
            return state
    }

}

export default days
