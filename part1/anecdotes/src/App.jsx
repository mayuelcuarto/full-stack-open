import { useState } from 'react'

// Cambie de lugar el arreglo anecdotes para que fuera mas accesible
const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const AnecdoteOfDay = (props) => {
  console.log(props)

  if (props.votos === 0) {
    return <div>No votes given yet</div>
  }

  return (
    <>
      <div>{anecdotes[props.indice]}</div>
      <div>has {props.votos} votes</div>
    </>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const generarAleatorio = () => {
    const enteroAleatorio = Math.floor(Math.random() * anecdotes.length)
    setSelected(enteroAleatorio)
  }

  const votar = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    console.log(selected, votes)
  }

  // Calculo en cada pasada
  const mayoresVotos = Math.max(...votes)
  const indiceMayoresVotos = votes.indexOf(mayoresVotos)

  // Aqui cambie los h4 y h5 por divs porque se veian algo raros
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={votar} text="vote" />
      <Button onClick={generarAleatorio} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <AnecdoteOfDay indice={indiceMayoresVotos} votos={mayoresVotos} />
    </div>
  )
}

export default App