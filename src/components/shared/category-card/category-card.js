import React from "react";
import PropTypes from "prop-types";
import {Image,Text } from "..";
import { Link } from 'react-router-dom';
import Styles from './category-card.module.scss'
/**
 * Render Image Tag
 * @param {isRequired} src
 * @param {string} className
 * @param {fun} onClick
 * @param {string} alt
 * @returns node
 */
const CategoryCard = ({variant,to,className,onClick,src,off,time,productname,productinfo,address, 
  favoriteClick,visibilityClick,strikePrice,price,deleteClick,rating}) => {
  return (
    <Link to={to} className={`${Styles.productCategoryLink}  ${Styles[variant]} ${className}`} onClick={onClick}>
       <div className={`${Styles.productTypes}`}>
          <div className={`${Styles.productImgBox} ${Styles.relative}`}>
            <Image 
              src={src} 
              alt="product image" 
              className={`${Styles.productImage} ${Styles.w100}`}
            />
            <Text 
                color="white" 
                strong="strong7" 
                variant="smText" 
                className={`${Styles.offCard} ${Styles.dBlock} `}
            >
                {off}
            </Text>
            <Text 
                color="black" 
                strong="strong5" 
                variant="xsText" 
                className={`${Styles.timeCard}  ${Styles.dBlock}`}
            >
                {time}
            </Text>
            <Text 
                color="black" 
                strong="strong5" 
                variant="xsText" 
                className={`${Styles.circleCard} ${Styles.favorite}  ${Styles.dBlock} ${Styles.cateGoryIcon}`}
                onClick={favoriteClick}
            >
                <span class="material-symbols-outlined">favorite</span>
            </Text>

            <Text 
                color="black" 
                strong="strong5" 
                variant="xsText" 
                className={`${Styles.circleCard} ${Styles.delete}  ${Styles.dBlock} ${Styles.cateGoryIcon}`}
                onClick={deleteClick}
            >
                <span class="material-symbols-outlined">delete</span>
            </Text>

            <Text 
                color="black" 
                strong="strong5" 
                variant="xsText" 
                onClick={visibilityClick}
                className={`${Styles.circleCard} ${Styles.eye}  ${Styles.dBlock} ${Styles.cateGoryIcon}`}
            >
                <span class="material-symbols-outlined">visibility</span>
            </Text>
          </div>
          <div className={`${Styles.productContentBox}`}>
              <div className={`${Styles.productNameRow} ${Styles.alignBetween} ${Styles.alignItemsCenter}`}>
                <Text 
                  color="black" 
                  variant="smlgText" 
                  strong="strong6" 
                  className={`${Styles.productName} ${Styles.inter} ${Styles.dBlock} ${Styles.elipsis}`}
                >
                  {productname}
                </Text>
                {rating !== null && rating !== undefined &&
                <div className={`${Styles.alignBetween} ${Styles.alignItemsCenter} ${Styles.ratingBox}`}>
                  <Image src="/assets/image/icon/star.svg" alt="star" className={`${Styles.ratingIcon}`} />
                  <Text color="black" strong="strong4" variant="smText" className={`${Styles.rating}`}>{rating}</Text>
                </div>
                }
              </div>
              <Text 
                color="black" 
                variant="mdText" 
                strong="strong4" 
                className={`${Styles.dBlock} ${Styles.productDis} ${Styles.elipsis}`}
              >
                  {productinfo}
              </Text>
              <div className={`${Styles.addressBlock}`}>
                <Image src="/assets/image/icon/location.svg" alt="location" className={`${Styles.mr10} ${Styles.addressIcon}`}/>
                <Text color="black" strong="strong4" variant="mdText" className={`${Styles.inter} ${Styles.addressmanage}`}>{address}</Text>
              </div>
              <div className={`${Styles.priceBlock} ${Styles.dFlex}`}>
                <Text strong="strong5" variant="mdText" className={`${Styles.inter} ${Styles.price}`}>{price}</Text>
                {strikePrice !== null && strikePrice !== undefined &&
                   <Text strong="strong5" variant="mdText" className={`${Styles.inter} ${Styles.strikePrice}`}>{strikePrice}</Text>
                }
              </div>
          </div>
      </div>
    </Link>
  )
}


CategoryCard.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired,
  to:PropTypes.any,
  off:PropTypes.string,
  time:PropTypes.string,
  productname:PropTypes.string,
  productinfo:PropTypes.any,
  address:PropTypes.string,
  favoriteClick: PropTypes.func,
  visibilityClick: PropTypes.func,
  price:PropTypes.string,
  strikePrice:PropTypes.string,
  deleteClick: PropTypes.func,
  rating:PropTypes.string,
};

export default CategoryCard;