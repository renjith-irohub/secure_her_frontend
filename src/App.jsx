import React from 'react'
import Index from './routes/Index'
// import { useDispatch, useSelector } from 'react-redux'
// import { decrement, increment } from './redux/Counterslice'



function App() {
  // const count=useSelector((state)=>state.counter.value)
  // const dispatch=useDispatch()
  return (
    <>
    {/* <h1>{count}</h1>
    <button onClick={()=>{dispatch(increment())}}>increment</button>
    <button onClick={()=>{dispatch(decrement())}}>decrement</button> */}
    <Index/>
    </>
  )
}

export default App