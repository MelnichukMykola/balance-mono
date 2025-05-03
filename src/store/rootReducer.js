import { combineReducers } from "@reduxjs/toolkit";
import trackingReducer from "./trackingSlice";
import authReducer from "./authSlice";
import uiReducer from "./uiSlice";

const rootReducer = combineReducers({
  tracking: trackingReducer,
  auth: authReducer,
  ui: uiReducer,
});

export default rootReducer;
