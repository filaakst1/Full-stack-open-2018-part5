import React from 'react'
import AnecdoteList from './components/AnacdoteList'
class App extends React.Component {
  voteClick = (nappi) => () => {
    console.log(`Clicked ${nappi}`)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <AnecdoteList store={this.props.store}/>
        <h2>create new</h2>
        <form>
          <div><input /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App