import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const data = props.parts.map(part => <Part name={part.name} exercises={part.exercises} />)
  return (
    data
  )
}

const Part = (props) => <p>{props.name} {props.exercises}</p>

const Total = (props) => {
  const sum = props.parts.reduce((now, part) => now + part.exercises, 0)
  return (
    <p>Number of exercises {sum}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
