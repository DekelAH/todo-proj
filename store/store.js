import { loadingReducer } from "./reducers/loading.reducer.js"
import { todoReducer } from "./reducers/todo.reducer.js"
import { userReducer } from "./reducers/user.reducer.js"

const { createStore, combineReducers } = Redux

const rootReducer = combineReducers({

    todoModule: todoReducer,
    userModule: userReducer,
    loadingModule: loadingReducer
})

export const store = createStore(rootReducer)
window.gStore = store