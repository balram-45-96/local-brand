import React from "react";
import PropTypes from "prop-types";
import {Image,Text } from "../";
import { Link } from 'react-router-dom';
import Styles from './slide-card.module.scss'
/**
 * Render Image Tag
 * @param {isRequired} src
 * @param {string} className
 * @param {fun} onClick
 * @param {string} alt
 * @returns node
 */
const SlideCard = ({variant,to,alt,product,className,onClick,src}) => {
  return (
    <Link to={to} className={`${Styles.categoryLink}  ${Styles[variant]} ${className}`} onClick={onClick}>
      <div className={`${Styles.slideImgCard} ${Styles.centerAlign}`}>
        <Image src={src} alt={alt} className={Styles.cateGorySlideImg} />
      </div>
        <div className={`${Styles.textCenter} ${Styles.categoryProduct}`}>
          <Text color="black" strong="strong5">{product}</Text>
        </div>
    </Link>
  )
}

SlideCard.defaultProps = {
  alt: "Image",
};
SlideCard.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  alt: PropTypes.string.isRequired,
  product:PropTypes.any,
  to:PropTypes.any,
};

export default SlideCard;