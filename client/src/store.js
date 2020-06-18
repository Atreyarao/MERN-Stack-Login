import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};


const middleware = { thunk };
//, compose(applyMiddleware(...middleware), window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOLLS_EXTENSION_()

const store = createStore(rootReducer, initialState);

export default store;
