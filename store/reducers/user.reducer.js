import { userService } from "../../services/user.service.js"

export const INCREMENT = 'INCREMENT'
export const SET_USER = 'SET_USER'

const initialState = {

    loggedInUser: userService.getLoggedinUser()
}


export function userReducer(state = initialState, cmd) {

    switch (cmd.type) {
        case INCREMENT:
            return {...state.loggedInUser, cmd }
        case SET_USER:
            return {...state, loggedInUser: cmd.user}
        default:
            return state
    }
}