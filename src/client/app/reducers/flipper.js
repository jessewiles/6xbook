import { FLIP_PAGE, FRONT_PAGESIDE, BACK_PAGESIDE } from '../actions'

const flipper = (state = {pageside: FRONT_PAGESIDE}, action) => {
    if (action.type === FLIP_PAGE) {
        if (state.pageside === FRONT_PAGESIDE)
            return Object.assign({}, state, {pageside: BACK_PAGESIDE})
        return Object.assign({}, state, {pageside: FRONT_PAGESIDE})
    }
    return state
}

export default flipper
