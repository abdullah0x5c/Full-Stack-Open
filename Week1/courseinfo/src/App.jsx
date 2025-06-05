import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [part1, part2, part3]
  const ex = [exercises1, exercises2, exercises3]


  return (
    <div>
      <Header name={course}/>
      <Content part={parts} exercises={ex}/>
      <Total exercises={ex}/>
    </div>
  )
}

export default App