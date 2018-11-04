import React from 'react'
import ReactDOM from 'react-dom'

import Statistiikka from './components/Statistiikka'

import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)


class App extends React.Component {

  klik = (nappi) => () => {

    console.log(`Clicked ${nappi}`)
    store.dispatch({ type: nappi })
  }

  render() {
    const state = store.getState()
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

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

store.subscribe(renderApp)
export default App