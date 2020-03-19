import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState([
    {text: 'If it hurts, do it more often', votes: 0},
    {text: 'Adding manpower to a late software project makes it later!', votes: 0},
    {text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0},
    {text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0},
    {text: 'Premature optimization is the root of all evil.', votes: 0},
    {text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0}
  ])

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = (i) => {
    return () => {
      const copy = [...anecdotes]
      copy[i].votes = anecdotes[i].votes + 1
      setAnecdotes(copy)
    }
  }

  const mostVotes = Math.max.apply(Math, anecdotes.map(o => o.votes))
  const bestAnecdote = anecdotes.find(o => o.votes === mostVotes)

  return (
    <div>
      <p>{anecdotes[selected].text}</p>
      <p>has {anecdotes[selected].votes} votes</p>
      <button onClick={handleNext}>Next anecdote</button>
      <button onClick={handleVote(selected)}>Vote!</button>
      <p>Anecdote with most votes:</p>
      <p>{bestAnecdote.text}</p>
      <p>has {bestAnecdote.votes} votes</p>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
