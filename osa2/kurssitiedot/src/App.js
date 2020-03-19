import React from 'react'
import Course from './components/course'

const App = () => {
  const courses = [{
    name: 'Half Stack application development',
    id: 0,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 0
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 1
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 2
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 3
      }
    ]
  }]

  const courseComponents = courses.map(c => <Course key={c.id} course={c} />)

  return (
    courseComponents
  )
}

export default App
