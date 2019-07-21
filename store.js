import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const exampleInitialState = {
  data: [],
};

export const actionTypes = {
  SET_DATA: "SET_DATA",
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
        console.log(action.data);
      return Object.assign({}, state, {
        data: action.data,
      });
    default:
      return state;
  }
};

// ACTIONS
export const setData = (data) => {
  return { type: actionTypes.SET_DATA, data};
};

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  );
}
