const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  const parts = props.parts

  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  const parts = props.parts
  const total = parts.reduce((acumulador, part) => acumulador + part.exercises, 0);
  return (
    <p>total of {total} exercises</p>
  )
}

const Course = (props) => {
  const course = props.course
  console.log(course)
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course