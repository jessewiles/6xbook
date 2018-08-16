import { REQUEST_DAY, RECEIVE_DAY } from '../actions'


const day = (state = {day: {}, hasRequested: false}, action) => {
    switch(action.type) {
        case REQUEST_DAY:
            return Object.assign({}, state, {hasRequested: true})

        case RECEIVE_DAY:
            return Object.assign({}, state, {day: action.day})

        default:
            return state
    }

}

export default day
