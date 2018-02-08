'use strict';

export const ALPHA = "ALPHA"
export const BETA = "BETA"
export const DELTA = "DELTA"
export const FLASH = "FLASH"
export const UPDATE_GREETING = "UPDATE_GREETING"

export function greet(greeting) {
    return {
        type: UPDATE_GREETING,
        noodle: greeting 
    }
}

export function flash(message) {
    return { type: FLASH, message }
}
