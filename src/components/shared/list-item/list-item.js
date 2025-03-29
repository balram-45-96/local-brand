import React from 'react'
import PropTypes from 'prop-types'

/**
 * Render ListItem
 * @param {any} children
 * @param {string} variant
 * @param {func} handleClick
 * @param {string} className
 * @returns node
 */

const ListItem = ({
    children,
    variant,
    handleClick,
    className
  }) => {
  return (
    <li
      className={`${[className]}`}
      onClick={handleClick}
    >
      {children}
    </li>
  )}

ListItem.propTypes = {
  children: PropTypes.any,
  variant: PropTypes.string,
  handleClick: PropTypes.func,
  className: PropTypes.string,
}

export default ListItem
