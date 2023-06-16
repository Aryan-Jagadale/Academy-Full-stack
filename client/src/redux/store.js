import { configureStore } from '@reduxjs/toolkit';
import { profileReducer, subscriptionReducer, userReducer } from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';


const store = configureStore({
  reducer: {
    user : userReducer,
    profile:profileReducer,
    subscription:subscriptionReducer,
    course:courseReducer,
    admin:adminReducer,
  },
});


export default store;



export const server = "https://academybackend.aaryanjagadale.tech/api/v1";
//export const server = "http://localhost:4000/api/v1"
