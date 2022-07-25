const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    <Part
      part={parts[0]} 
    />
    <Part
      part={parts[1]} 
    />
    <Part
      part={parts[2]} 
    />      
  </>

  const Course = ({course, parts}) =>{
    return(
      <>
      <Header course={course}/>
      <Content parts={parts}/>
    </>
    )
  }

const App = () => {
  const course = 'Half Stack application development'
  const initialValue = 0
  const parts = [
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
  const total = parts.reduce((s, p)=> s + p.exercises, initialValue)

  return (
    <div>
      <Course course={course} parts={parts} />
      <Total sum={total} />
    </div>
  )
}

export default App