const appleJaxer = (state = 4, action) => {
    if (action === 'APPLE_JAX')
        return state + 1;
    return state;
}


export default appleJaxer
