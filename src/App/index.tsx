import React, { Component } from 'react'
import classNames from 'classnames'
import Buttons from '../Buttons'
import { IButtonValues } from 'types'

import styles from './styles.module.scss'

const defaultState = {
  count: 0,
  key: '',
}

class App extends Component {
  state = {
    ...defaultState,
    message: '',
    numMode: false,
  }
  timeout?: NodeJS.Timeout = undefined

  componentDidMount() {
    document.addEventListener('keypress', this.onPressButton)
    document.addEventListener('keydown', this.onKeyDown)
  }

  get buttonsValues(): IButtonValues {
    return {
      '0': [' '],
      '2': ['a', 'b', 'c'],
      '3': ['d', 'e', 'f'],
      '4': ['g', 'h', 'i'],
      '5': ['j', 'k', 'l'],
      '6': ['m', 'n', 'o'],
      '7': ['p', 'q', 'r', 's'],
      '8': ['t', 'u', 'v'],
      '9': ['w', 'x', 'y', 'z'],
    }
  }

  removeChar = () => this.setState({ message: this.state.message.slice(0, -1) })

  resetMessage = () => this.setState({ message: '' })

  onKeyDown = ({ key: eKey }: KeyboardEvent) => {
    if (eKey === 'Backspace') this.removeChar()
  }

  onPressButton = ({ key: eKey }: KeyboardEvent | { key: string }) => {
    let { numMode, key, message, count } = this.state

    !!this.timeout && clearTimeout(this.timeout)

    if (eKey === 'delete') return this.removeChar()
    if (eKey === '123/abc') return this.setState({ numMode: !numMode })
    if (!eKey || !this.buttonsValues[eKey]) return
    if (numMode) return this.setState({ message: message += eKey })

    const pressedLetter = this.buttonsValues[eKey]
    if (!pressedLetter) return
    if (key === eKey && eKey !== '0') {
      message =
        message.slice(0, -1) +
        `${pressedLetter[count] || pressedLetter[count % pressedLetter.length]}`
      this.setState({ count: ++count, message })
    } else {
      this.setState({ count: 1, key: eKey, message: message += pressedLetter[0] })
    }

    this.timeout = setTimeout(() => this.setState({ ...defaultState }), 1000)
  }

  render() {
    const { message, numMode } = this.state

    return (
      <div className={styles.wrapper}>
        <div className={styles.phone}>
          <div className={classNames(styles.message, { [`${styles.emptyMessage}`]: !message })}>
            <span>{message || 'New message...'}</span>
          </div>
          <button onClick={this.resetMessage} className={styles.resetBtn}>
            Reset
          </button>
          <Buttons
            numMode={numMode}
            buttonsValues={this.buttonsValues}
            onClick={this.onPressButton}
          />
        </div>
      </div>
    )
  }
}

export default App
