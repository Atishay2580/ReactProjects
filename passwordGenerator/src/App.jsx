import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numsAllowed, setNumsAllowed] = useState(false);
  const [charsAllowed, setCharsAllowed] = useState(false);

  const [password, setPassword] = useState("");

  // useRef hook
  // it is used to get reference of any element on webpage and perform manipulations on it if required
  // here we have used it to select password from the input element
  const passRef = useRef(null)

  // useCallback hook is used for memorization i.e. to memorize or cache functions to improve performance (basically it is used for optimisation)

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numsAllowed) str += "0123456789"
    if (charsAllowed) str += "!@#$%^&*(){}~`"
    for (let i = 1; i <= length; i++) {
      let charIdx = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIdx);
    }
    setPassword(pass);
  }, [length, numsAllowed, charsAllowed, setPassword]);

  const copyPassToClipboard = useCallback(() => {
    // to give selection effect to user
    passRef.current?.select()

    // to select password in given range only uncomment below line (use this if required -> depending on the usecase)
    // passRef.current?.setSelectionRange(0,9)

    // to copy password to clipboard
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [length, numsAllowed, charsAllowed, generatePassword])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">

        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          readOnly
          ref={passRef}
          />
          <button
          onClick={copyPassToClipboard} 
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={6}
            max={30}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={numsAllowed}
            id="numsInput"
            onChange={() => {
              setNumsAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="numsInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={charsAllowed}
            id="charsInput"
            onChange={() => {
              setCharsAllowed((prev) => !prev)
            }}
            />
            <label htmlFor="charsInput">Characters</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App;
