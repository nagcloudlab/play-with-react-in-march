

import {
    createStore,
    combineReducers
} from 'redux'


function redCountReducer(state = 0, action) {
    switch (action.type) {
        case 'RED_INCREMENT':
            return state + action.payload
        case 'RED_DECREMENT':
            return state - action.payload
        default:
            return state
    }
}
const greenCountReducer = (state = 0, action) => {
    switch (action.type) {
        case 'GREEN_INCREMENT':
            return state + action.payload
        case 'GREEN_DECREMENT':
            return state - action.payload
        default:
            return state
    }
}
const blueCountReducer = (state = 0, action) => {
    switch (action.type) {
        case 'BLUE_INCREMENT':
            return state + action.payload
        case 'BLUE_DECREMENT':
            return state - action.payload
        default:
            return state
    }
}

const reducer = combineReducers({
    redCount: redCountReducer,
    greenCount: greenCountReducer,
    blueCount: blueCountReducer,
})

const store = createStore(reducer, {
    redCount: 100,
    greenCount: 0,
    blueCount: 0
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store