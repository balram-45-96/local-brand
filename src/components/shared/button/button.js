import React from 'react'
import PropTypes from 'prop-types'
import Styles from './button.module.scss'
import { BUTTONACTION } from './constant'

/** Render Button
 * @param {string} variant
 * @param {string} size
 * @param {string} type
 * @param {string} btnType
 * @param {any} children
 * @param {any} className
 * @param {func} onClick
 * @returns node
 */

const Button = ({
  variant,
  size,
  type,
  children,
  className,
  onClick,
  isDisabled
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${Styles.button} ${Styles[variant]} ${Styles[size]} ${className}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.any,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool
}

Button.defaultProps = {
  variant: "solidPrimary",
  size: "md",
  type: BUTTONACTION.BUTTON,
  children: 'Button Title',
  isDisabled: false
}

export default Button