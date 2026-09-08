import { useState } from 'react'

const Display = ({text, counter, unit}) => <div>{text} {counter} {unit}</div>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  // En esta parte agregue una condicional para total y asi evitar el NaN al cargar la pagina
  const average = total === 0 ? 0 : (good * 1 + bad * -1) / total
  const positive = total === 0 ? 0 : (good * 100) / total
  
  const increaseGoodByOne = () => {
    console.log('increasing, value before', good)
    setGood(good + 1)
  }

  const increaseNeutralByOne = () => {
    console.log('increasing, value before', neutral)
    setNeutral(neutral + 1)
  }

  const increaseBadByOne = () => {
    console.log('increasing, value before', bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGoodByOne} text="good" />
      <Button onClick={increaseNeutralByOne} text="neutral" />
      <Button onClick={increaseBadByOne} text="bad" />
      <h1>statistics</h1>
      <Display text="good" counter={good} />
      <Display text="neutral" counter={neutral} />
      <Display text="bad" counter={bad} />
      <Display text="all" counter={total} />
      <Display text="average" counter={average} />
      <Display text="positive" counter={positive} unit="%" />
    </div>
  )
}

export default App
