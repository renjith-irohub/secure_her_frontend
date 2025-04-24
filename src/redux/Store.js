import { configureStore } from "@reduxjs/toolkit";
import user from "./Userslice";


export const store = configureStore({
reducer:{
    auth:user
}
})
