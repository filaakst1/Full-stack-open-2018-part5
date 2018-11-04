import React from 'react'
import PropTypes from 'prop-types'

const Statistiikka = ({ good, ok, bad, resetAction }) => {
  const palautteita = good+ok+bad

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }
  const keskiarvo = ((good - bad) / palautteita).toFixed(1)
  const positiivisia = ((100*good) / palautteita).toFixed(1)

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia}%</td>
          </tr>
        </tbody>
      </table>

      <button onClick={resetAction}>nollaa tilasto</button>
    </div >
  )
}
Statistiikka.propTypes = {
  good: PropTypes.number.isRequired,
  ok: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
  resetAction: PropTypes.func.isRequired

}
export default Statistiikka