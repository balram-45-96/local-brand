import React from 'react'
import PropTypes from 'prop-types'
import Styles from './list-group.module.scss'

/**
 * Render ListGroup
 * @param {node} children
 * @param {string} variant
 * @param {string} className
 * @returns node
 */

const ListGroup = ({
    children,
    variant,
    className
  }) => {
  return (
    <ul className={`${Styles[variant]} ${[className]}`}>
      {children}
    </ul>
  )
}

ListGroup.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  className: PropTypes.string
}

export default ListGroup
