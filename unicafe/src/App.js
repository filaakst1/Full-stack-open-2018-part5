import React from 'react'
import PropTypes from 'prop-types'
import Statistiikka from './components/Statistiikka'

class App extends React.Component {

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
App.propTypes = {
  store: PropTypes.object.isRequired
}
export default App