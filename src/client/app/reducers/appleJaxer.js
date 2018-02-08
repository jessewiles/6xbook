import { ALPHA, BETA, DELTA, FLASHER, UPDATE_GREETING } from '../actions'


const appleJaxer = (state = {greeting: DELTA}, action) => {
    switch(action.type) {
        case UPDATE_GREETING:
            if (action.noodle === ALPHA)
                return {greeting: BETA}
            else if (action.noodle === BETA)
                return {greeting: DELTA}
            else if (action.noodle === DELTA)
                return {greeting: ALPHA}
        default:
            return state;
    }
}


export default appleJaxer
