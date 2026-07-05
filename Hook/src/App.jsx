import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  let [counter , setCounter] = useState(0)

  const addValue = ()=>{
    if(counter<20){

      console.log(counter);
      setCounter(counter+1)
    }
  }
  const removeValue = ()=>{
    if(counter>0){

      console.log(counter);
      setCounter(counter-1)
    }
        
  }

  return (
    <>
    <h1>
      THis is starting
    </h1>
    <h2>Counter value {counter}</h2>
    <button
    onClick={addValue}
    >Add value {counter}</button>
    

    <br />

    <button
    onClick={removeValue}
    >Remove value{counter}</button>
    </>
  )
}

export default App
