'use strict'

export const FLASH = "FLASH"
export const FLIP_PAGE = "FLIP_PAGE"
export const FRONT_PAGESIDE = "FRONT"
export const BACK_PAGESIDE = "BACK"
export const REQUEST_DAYS = "REQUEST_DAYS"
export const RECEIVE_DAYS = "RECEIVE_DAYS"


export function flash(message) {
    return { type: FLASH, message }
}

export function flip(pageside) {
    return { type: FLIP_PAGE, pageside }
}

export function requestDays() {
    return (dispatch) => {
        return fetch('/days/')
            .then(res => res.json())
            .then(data => dispatch(receiveDays(data)))
    }
}

export function receiveDays(days) {
    return { type: RECEIVE_DAYS, days }
}
