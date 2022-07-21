import { useState } from 'react'
import React from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({text, value}) =>{
  return(
    <React.Fragment>
      <tr> 
        <td>{text} {value}</td>
      </tr>
        
    </React.Fragment>
          
     )
} 

const Statistics = (props) =>{

  if(props.stats.all !== 0){
    return(
      <div>
        <table>
          <tbody>
          <StatisticLine text="good" value={props.stats.good} />
          <StatisticLine text="neutral" value={props.stats.neutral}/>
          <StatisticLine text="bad" value={props.stats.neutral}/>
          <StatisticLine text= "all" value={props.stats.all}/>
          <StatisticLine text="average" value={(props.stats.good - props.stats.bad) / props.stats.all}/>
          <StatisticLine text="positive" value={props.stats.good / props.stats.all}/>
          </tbody>
        </table>

      </div>
    )
  } 
  return (
    <p>No feedback given</p>
  )
}

const App = () => {  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const stats = {
    good : good,
    neutral: neutral,
    bad: bad,
    all : all
  }
  const handleGoodButton = () => {
    setGood(good + 1)
    setAll(all + 1)
    }
  const handleNeutralButton = () =>{
    setNeutral(neutral + 1)
    setAll(all + 1)
    }
  const handleBadButton = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodButton} text="good"/>
      <Button onClick={handleNeutralButton} text="neutral"/>
      <Button onClick={handleBadButton} text="bad"/>
      <h1>Statistics</h1>
      <Statistics stats={stats}/>
    </div>
  )
}

export default App