export default {
  voteAnecdote(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  }
}