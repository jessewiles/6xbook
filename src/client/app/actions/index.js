'use strict'

export const FLASH = "FLASH"
export const FLIP_PAGE = "FLIP_PAGE"
export const FRONT_PAGESIDE = "FRONT"
export const BACK_PAGESIDE = "BACK"


export function flash(message) {
    return { type: FLASH, message }
}

export function flip(pageside) {
    return { type: FLIP_PAGE, pageside }
}
