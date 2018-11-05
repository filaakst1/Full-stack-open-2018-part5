export default {
  createNew(content) {
    return {
      type: 'NEW_ANECDOTE',
      data: content
    }
  },
  voteAnecdote(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  }
}