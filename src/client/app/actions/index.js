'use strict'

export const FLASH = "FLASH"
export const FLIP_PAGE = "FLIP_PAGE"
export const FRONT_PAGESIDE = "FRONT"
export const BACK_PAGESIDE = "BACK"
export const REQUEST_DAYS = "REQUEST_DAYS"
export const REQUEST_DAY = "REQUEST_DAY"
export const RECEIVE_DAYS = "RECEIVE_DAYS"
export const RECEIVE_DAY = "RECEIVE_DAY"


export function flash(message) {
    return { type: FLASH, message }
}

export function flip(pageside) {
    return { type: FLIP_PAGE, pageside }
}

export function requestDays() {
    return (dispatch) => {
        return fetch('http://localhost:8080/days/')
            .then(res => res.json())
            .then(data => dispatch(receiveDays(data)))
    }
}

export function requestDay(day) {
    return (dispatch) => {
        return fetch(`http://localhost:8080/days/${day}`)
            .then(res => res.json())
            .then(data => dispatch(receiveDay(data)))
    }
}

export function receiveDays(days) {
    console.log('receiving days...')
    return { type: RECEIVE_DAYS, days }
}

export function receiveDay(day) {
    return { type: RECEIVE_DAY, day}
}
