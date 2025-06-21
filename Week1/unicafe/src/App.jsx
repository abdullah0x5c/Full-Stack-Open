import { useState } from 'react'

const Button = (props) => {
    return (
      <button onClick={props.onClick}>
        {props.text}
      </button>
    )
}

const Statistics = (props) => {

  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = good + neutral + bad
  const avg = (good*1+bad*-1)/all
  const psv = ((good)/all)*100

  if(all == 0){
    return(
      <p>No Feedback Given</p>
    )
  }
  else {
    return (
      <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {avg}</p>
        <p>positive {psv}%</p>
      </>
  )
  }


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
    <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
