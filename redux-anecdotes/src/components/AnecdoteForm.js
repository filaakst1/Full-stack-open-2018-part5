import React from 'react'
import PropTypes from 'prop-types'
import actionFor from '../actionCreators'

class AnecdoteForm extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  addAnacdote  = (event) => {
    event.preventDefault()
    this.context.store.dispatch(
      actionFor.createNew(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addAnacdote}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button>
        </form>
      </div>
    )
  }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteForm