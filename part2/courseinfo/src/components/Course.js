const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>{
  return(
    <div>
      {parts.map(part =>
          <Part key={part.id} part={part}/>
        )}
    </div>
  )
}

  const Course = ({course, parts}) =>{
    const initialValue = 0
    const total = parts.reduce((s, p)=> s + p.exercises, initialValue)
    return(
      <>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total sum={total}/>
    </>
    )
  }

  export default Course;