import { SET_LOADING, REVERT_LOADING } from '../reducers/loading.reducer.js'
import { store } from '../store.js'

export function setLoading(loading) {

    store.dispatch({ type: SET_LOADING, loading })
}

export function revertLoading() {
    
    store.dispatch({ type: REVERT_LOADING })
}