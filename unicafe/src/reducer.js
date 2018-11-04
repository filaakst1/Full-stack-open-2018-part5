const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'GOOD':
    state.good += 1
    break
  case 'OK':
    state.ok += 1
    break
  case 'BAD':
    state.bad += 1
    break
  case 'ZERO':
    state = {
      good: 0,
      ok: 0,
      bad: 0
    }
    break
  default:
    // Do nothing
    break
  }
  return state
}

export default counterReducer