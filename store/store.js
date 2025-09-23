import { todoReducer } from "./reducers/todo.reducer.js"

const { createStore, combineReducers } = Redux

const rootReducer = combineReducers({

    todoModule: todoReducer,
})

export const store = createStore(rootReducer)
window.gStore = store