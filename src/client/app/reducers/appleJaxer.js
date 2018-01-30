import { APPLE_JAX, ALPHA, BETA, DELTA, UPDATE_GREETING } from '../actions'


const appleJaxer = (state = {avar: DELTA}, action) => {
    switch(action.type) {
        case APPLE_JAX:
            return {avar: APPLE_JAX}
        case UPDATE_GREETING:
            if (action.noodle === ALPHA)
                return {avar: BETA}
            else if (action.noodle === BETA)
                return {avar: DELTA}
            else if (action.noodle === DELTA)
                return {avar: ALPHA}
        default:
            return state;
    }
}


export default appleJaxer
