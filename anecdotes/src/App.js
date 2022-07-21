import { useState } from 'react'

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>
const Anecdote =({vote, anecdotes}) =>{
  const max = Math.max(...vote)
  const index = vote.indexOf(max)
  return(
    <div>
    <p>{anecdotes[index]}</p>
    <p>has {vote[index]} votes</p>
    </div>

  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const arrLength = 7
  const [vote, setVote] = useState(Array(arrLength).fill(0))
  const copy = [...vote]


  const buttonClicked = () =>{
    let random = Math.floor(Math.random() * anecdotes.length);
    console.log(random)
    setSelected(random)
  }
  const Vote =()=>{
    copy[selected] += 1
    setVote(copy)
  }
  return (
    <div>
      
      {anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <Button onClick={buttonClicked} text="next anecdote"/>
      <Button onClick={Vote} text ="vote"/>
      <h1>anecdote with most votes</h1>
      <Anecdote vote={vote} anecdotes={anecdotes}/>

      
    </div>
  )
}

export default App