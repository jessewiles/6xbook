import { REQUEST_DAYS, RECEIVE_DAYS } from '../actions'


const days = (state = {days: [], hasRequested: false}, action) => {
    switch(action.type) {
        case REQUEST_DAYS:
            return Object.assign({}, state, {hasRequested: true})

        case RECEIVE_DAYS:
            return Object.assign({}, state, {days: action.days})

        default:
            return state
    }

}

export default days
