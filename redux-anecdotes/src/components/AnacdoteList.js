import React from 'react'
import PropTypes from 'prop-types'
import actionFor from '../actionCreators'
import Anecdote from './Anecdote'


class AnacdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  vote = (id) => (e) => {
    console.log(`Clicked id: ${id}`)
    this.context.store.dispatch(
      actionFor.voteAnecdote(id)
    )
  }
  render() {
    const anecdotes = this.context.store.getState()
    return (
      <div>
        { anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            content={anecdote.content}
            votes={anecdote.votes}
            handleClick= {this.vote(anecdote.id)} />
        )
        }
      </div>
    )
  }
}

AnacdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnacdoteList