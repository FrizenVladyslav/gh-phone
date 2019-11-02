import React from 'react'
import classNames from 'classnames'
import { IButtonValues } from 'types'

import styles from './styles.module.scss'

interface IProps {
  buttonsValues: IButtonValues
  numMode: boolean
  onClick: ({ key }: { key: string }) => void
}

const Phone: React.FC<IProps> = ({ buttonsValues, onClick, numMode }) => {
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'delete', '0', '123/abc']

  return (
    <div className={classNames(styles.phone)}>
      {buttons.map(btn => (
        <button
          key={btn}
          onClick={() => onClick({ key: btn })}
          className={classNames(styles.button, {
            [`${styles.numMode}`]: numMode || !buttonsValues[btn],
          })}
        >
          <span>{btn}</span>
          {!!buttonsValues[btn] && (
            <>
              {' '}
              / <span>{buttonsValues[btn]}</span>
            </>
          )}
        </button>
      ))}
    </div>
  )
}

export default Phone
