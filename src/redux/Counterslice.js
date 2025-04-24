import { createSlice } from "@reduxjs/toolkit";
 
const counterslice = createSlice({
    name:'counter',
    initialState:{value:0},
    reducers:{
        increment(state){
            state.value++
        },
        decrement(state){
            state.value--
        },
    }
}) 
export const { increment, decrement } = counterslice.actions
export default counterslice.reducer
