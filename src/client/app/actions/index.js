'use strict';


export const APPLE_JAX = "APPLE_JAX"
export const ALPHA = "ALPHA"
export const BETA = "BETA"
export const DELTA = "DELTA"
export const UPDATE_GREETING = "UPDATE_GREETING"

export function doAppleJax() {
    return {
        type: APPLE_JAX,
        value: 9999
    }
}

export function doAlpha() {
    return {
        type: ALPHA,
        value: 1001
    }
}

export function doBeta() {
    return {
        type: BETA,
        value:2002
    }
}

export function greet(noodlevar) {
    return {
        type: UPDATE_GREETING,
        noodle: noodlevar
    }
}
