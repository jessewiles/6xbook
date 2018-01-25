const macko = (state = {}, action) => {
    switch(action.type) {
        case 'ALPHA':
            return {name: 'Superman'}
        case 'BETA':
            return {name: 'Batman'}
        case 'DELTA':
            return {name: 'Wonder Woman'}
        default:
            return state
    }

}

export default macko

