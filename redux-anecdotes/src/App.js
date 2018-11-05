import React from 'react'
import AnecdoteList from './components/AnacdoteList'
import AnecdoteForm from './components/AnecdoteForm'
class App extends React.Component {
  voteClick = (nappi) => () => {
    console.log(`Clicked ${nappi}`)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <AnecdoteList />
        <h2>create new</h2>
        <AnecdoteForm />
      </div>
    )
  }
}

export default App