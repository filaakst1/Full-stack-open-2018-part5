import React from 'react'
import ReactDOM from 'react-dom'

import Statistiikka from './components/Statistiikka'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  klik = (nappi) => () => {
    console.log(`Clicked ${nappi}`)
    this.props.store.dispatch({ type: nappi })
  }

  render() {
    const state = this.props.store.getState()
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka good={state.good} ok={state.ok} bad={state.bad} resetAction={this.klik('ZERO')} />
      </div>
    )
  }
}
export default App