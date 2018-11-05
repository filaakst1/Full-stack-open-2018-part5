import React from 'react'
import PropTypes from 'prop-types'

class Anecdote extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.content}
        </div>
        <div>
          has {this.props.votes}
          <button onClick={this.props.handleClick}>vote</button>
        </div>
      </div>
    )
  }
}
Anecdote.propTypes = {
  content: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired
}
export default Anecdote