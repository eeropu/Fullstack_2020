import React, { useState } from 'react';

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const handleClick = (type) => {
    switch (type) {
      case 'good':
        return () => setGood(good + 1)
      case 'neutral':
        return () => setNeutral(neutral + 1)
      case 'bad':
        return () => setBad(bad + 1)
      default:
        return () => console.log('Something went wrong...');
    }
  }

  return (
    <>
      <h1>Give feedback</h1>
      <Button text='good' handleClick={handleClick('good')} />
      <Button text='neutral' handleClick={handleClick('neutral')} />
      <Button text='bad' handleClick={handleClick('bad')} />

      <Statistics sum={good+neutral+bad} good={good} neutral={neutral} bad={bad} />
    </>
  )
}

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Statistics = ({sum, good, neutral, bad}) => {
  return sum > 0 ? (
    <table>
      <Statistic text='Good' value={good}/>
      <Statistic text='Neutral' value={neutral}/>
      <Statistic text='Bad' value={bad}/>
      <Statistic text='All' value={sum}/>
      <Statistic text='Average' value={(good - bad) / sum}/>
      <Statistic text='Positive' value={good / sum * 100}/>
    </table>
  ) : (
    <p>No feedback given</p>
  )
}

const Statistic = ({text, value}) => <tbody><tr><td>{text}</td><td>{value}</td></tr></tbody>

export default App;
