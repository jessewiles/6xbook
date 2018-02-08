import { ALPHA, BETA, DELTA } from '../actions'

const macko = (state = {greeting: ""}, action) => {
    switch(action.type) {
        case ALPHA:
            return {greeting: 'Superman'}
        case BETA:
            return {greeting: 'Batman'}
        case DELTA:
            return {greeting: 'Wonder Woman'}
        default:
            return state
    }

}

export default macko
