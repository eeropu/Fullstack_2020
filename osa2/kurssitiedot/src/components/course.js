import React from 'react'

const Course = ({course}) => (
  <div>
    <Header course={course.name}/>
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  const data = props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
  return (
    data
  )
}

const Part = (props) => <p>{props.name} {props.exercises}</p>

const Total = (props) => {
  const sum = props.parts.reduce((now, part) => now + part.exercises, 0)
  return (
    <p>Total of {sum} exercises</p>
  )
}

export default Course
