import React, { useEffect, useState } from "react";
import Styles from './wishlist.module.scss';
import { Layout } from "../../../components/common";
import { Text, Button, CategoryCard} from "../../../components/shared";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritesApi } from "../../../service/classifiedProduct";
import { setWishlist } from "../../../redux/AuthRedux/auth";

const Wishlist = () => {
   const auth = useSelector((state) => state.auth);
//   const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();

  const getFavorites = async () => {
    try {
      const { data } = await getFavoritesApi(
         auth.user.id,
      );
      if (data.success) {
         dispatch(setWishlist(data.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getFavorites();
  }, []);
  return (
    <Layout>
        <div className={`${Styles.wishlist}`}>
           <div className={`${Styles.center}`}>
            <div className={`${Styles.wishlistWrapper} ${Styles.alignBetween} ${Styles.alignItemsCenter}`}>
               <Text strong="strong7" color="black" className={`${Styles.pageTitel}`}>
                 Wishlist (4)
               </Text>
               <Button  variant="primaryOutline" className={`${Styles.moveToBag}`}>
                  Move All To Bag
               </Button>
            </div>
              
              <div className={`${Styles.row} ${Styles.categoryRow}`}>
               {auth?.WishlistData?.map((item)=>{
                  return <CategoryCard
                  to="#"
                  src={item.image} 
                  productname={item.display_name}
                  rating={item.rating_total}
                  productinfo={item.display_name}
                  variant="wishlist"
               />
               })}
                {/* <CategoryCard
                   to="#"
                   src="assets/image/category/watchx.png" 
                   productname="TIMEX"
                   rating="4.9"
                   productinfo="Analog Watch  - For Men TW0TG7304"
                   variant="wishlist"
                />
                <CategoryCard
                   to="#"
                   src="assets/image/category/sonata.png" 
                   productname="SONATA"
                   rating="4.5"
                   productinfo="Analog Watch  - For Men TW0TG7304"
                   variant="wishlist"
                />
                <CategoryCard
                   to="#"
                   src="assets/image/category/fastrack.png" 
                   productname="Fastrack"
                   rating="4.2"
                   productinfo="Analog Watch  - For Men TW0TG7304"
                   variant="wishlist"
                />

               <CategoryCard
                   to="#"
                   src="assets/image/category/watchx.png" 
                   productname="TIMEX"
                   rating="4.9"
                   productinfo="Analog Watch  - For Men TW0TG7304"
                   variant="bestProduct"
                   price="$260"
                   strikePrice="$360"
                />
                <CategoryCard
                   to="#"
                   src="assets/image/category/sonata.png" 
                   productname="SONATA"
                   rating="4.5"
                   productinfo="Analog Watch  - For Men TW0TG7304"
                   variant="bestProduct"
                   price="$260"
                   strikePrice="$360"
                />
                <CategoryCard
                   to="#"
                   src="assets/image/category/fastrack.png" 
                   productname="Fastrack"
                   rating="4.2"
                   productinfo="Analog Watch  - For Men TW0TG7304"
                   variant="bestProduct"
                   price="$260"
                   strikePrice="$360"
                />

               <CategoryCard
                   to="#"
                   src="assets/image/category/watchx.png" 
                   productname="TIMEX"
                   rating="4.9"
                   productinfo="Analog Watch  - For Men TW0TG7304"
                   variant="bestProduct"
                   price="$260"
                   strikePrice="$360"
                />
                <CategoryCard
                   to="#"
                   src="assets/image/category/sonata.png" 
                   productname="SONATA"
                   rating="4.5"
                   productinfo="Analog Watch  - For Men TW0TG7304"
                   variant="bestProduct"
                   price="$260"
                   strikePrice="$360"
                />
                <CategoryCard
                   to="#"
                   src="assets/image/category/fastrack.png" 
                   productname="Fastrack"
                   rating="4.2"
                   productinfo="Analog Watch  - For Men TW0TG7304"
                   variant="bestProduct"
                   price="$260"
                   strikePrice="$360"
                /> */}
              </div>
           </div>
        </div>
        
   </Layout>
  );
};

export default Wishlist;