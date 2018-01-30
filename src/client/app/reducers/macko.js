import { ALPHA, BETA, DELTA } from '../actions'

const macko = (state = {avar: "tulip"}, action) => {
    switch(action.type) {
        case ALPHA:
            return {avar: 'Superman'}
        case BETA:
            return {avar: 'Batman'}
        case DELTA:
            return {avar: 'Wonder Woman'}
        default:
            return state
    }

}

export default macko
