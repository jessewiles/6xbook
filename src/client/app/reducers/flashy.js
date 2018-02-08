import { FLASHER } from '../actions'

const flasher = (state = {message: ""}, action) => {
    if (action.type === FLASHER)
        console.log(action.message)
        return {message: action.message}
    return state
}

export default flasher
