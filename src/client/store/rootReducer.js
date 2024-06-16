import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import trackingReducer from './trackingSlice'

const rootReducer = combineReducers({
  user: userReducer,
  tracking: trackingReducer
})

export default rootReducer;