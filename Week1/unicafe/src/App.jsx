import { useState } from 'react'

const Button = (props) => {
    return (
      <button onClick={props.onClick}>
        {props.text}
      </button>
    )
}


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <>
    <h4>Give Feedback</h4>
    <Button onClick={() => setGood(good + 1)} text="good" />
    <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
    <Button onClick={() => setBad(bad + 1)} text="bad" />
    <h4>Statistics</h4>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    </>
  )
}

export default App
