import { FLASH } from '../actions'

const flasher = (state = {message: ""}, action) => {
    if (action.type === FLASH)
        return {message: action.message}
    return state
}

export default flasher
