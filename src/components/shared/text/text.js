import React from 'react'
import PropTypes from 'prop-types'
import styles from './text.module.scss'
/**
 * Name: Text
 * Desc: Render text
 * @param {node} children
 * @param {string} color
 * @param {isRequired} text
 * @param {string} strong
 * @param {bool}   lineThrough
 * @param {string} upperCase
 * @param {string} variant
 * @param {string} className
 * @param {func} onClick
 */

const Text = ({
  children,
  color,
  text,
  strong,
  lineThrough,
  upperCase,
  variant,
  className,
  onClick
}) => {
  const finalText = children || text
  const fontColor = color && styles[color] ? styles[color] : ''
  const fontWeight = strong ? styles[strong] : ''
  const strikeThrough = lineThrough ? styles[lineThrough] : ''
  const textTransform = upperCase ? styles[upperCase] : ''
  
  return (
    <span
      className={`${styles[variant]} ${fontColor} ${fontWeight} ${strikeThrough} ${textTransform} ${[className]}`.trimRight()}
      onClick={onClick}

    >
      {finalText}
    </span>
  )
}

// Default Props
Text.defaultProps = {
  variant: 'mdText',
  text: '',
  className: ''
}

// PropTypes Validation
Text.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]).isRequired,
  strong: PropTypes.string,
  lineThrough: PropTypes.bool,
  upperCase: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default Text
