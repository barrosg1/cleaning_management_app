import isEmpty from "../validation.js/is-empty";

import { SET_CURRENT_USER } from "../actions/types";

const inititalState = {
  isAuthenticated: false,
  user: {}
};

// action: dispatch actions to the reducer
export default function(state = inititalState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state, // this copies the array
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload //this is coming from the authActions.js - userData
      };
    default:
      return state;
  }
}
