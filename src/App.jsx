import { useState,useCallback,useEffect, useRef } from 'react'
import './App.css'

function App() {
const [length, setLength] = useState(8)
const [numberAllowed, setNumberAllowed] = useState(false)
const [characterAllowed, setCharacterAllowed] = useState(false)
const [password, setPassword] = useState('')
const passwordRef = useRef(null)
const copyPasswordToClipboard =() => {
  passwordRef.current.select()
  document.execCommand('copy')
  passwordRef.current?.setSelectionRange(0,99)
}
const passwordGenerator = useCallback(() => {
  // Implementation for password generation
  let pass = ''
  let string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = '0123456789'
  let character = '!@#$%^&*()_+~`|}{[]:;?><,./-='

  if(numberAllowed)
{
        string+=number
}
if(characterAllowed){
  string+=character
}
 
 for(let i=0; i<length; i++){
  let char = Math.floor(Math.random() * string.length+1)
  pass += string.charAt(char)

 }
 setPassword(pass)
}, [length, numberAllowed, characterAllowed, setPassword])


useEffect(() => {
  passwordGenerator()
}, [length, numberAllowed, characterAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto text-orange-500 shadow-md rounded-lg px-4 py-3 my-8 text-center bg-gray-800'>
      <h1 className="text-2xl text-white text-center p-5">Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-white'>
        <input type="text"
         value={password} 
         className ='outline-none w-full py-1 px-3'
         placeholder='password' 
         readOnly
         ref={passwordRef}
         />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        
</div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range'
            min={4} 
            max={16}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            >
              </input>
              <label>Length: {length}</label>
          </div>
          <div className='flex items-baseline gap-x-1'>
            <input type='checkbox'
            defaultChecked={numberAllowed}
            onChange = {() => {setNumberAllowed((prev) => !prev)}}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-baseline gap-x-1'>
            <input type='checkbox'
            defaultChecked={characterAllowed}
            onChange = {() => {setCharacterAllowed((prev) => !prev)}}
            />
            <label>Characters</label>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default App
