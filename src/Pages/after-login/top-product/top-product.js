import React, { useState, useEffect } from "react";
import Styles from "./top-product.module.scss";
import { Layout } from "../../../components/common";
import {
  Heading,
  Text,
  Button,
  CategoryCard,
  ListGroup,
  ListItem,
  RadioBtn,
} from "../../../components/shared";
import { getProductListByCatIdApi } from "../../../service/category";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { convertToTime } from "../../../helpers/constant";
import { addToFavoriteApi } from "../../../service/classifiedProduct";
import { toast } from "react-toastify";
import { setWishlistCount } from "../../../redux/AuthRedux/auth";

const TopProduct = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();
  const [category, setAllCategory] = useState([]);
  const dispatch = useDispatch();

  const getProductListByCatId = async () => {
    try {
      const { data } = await getProductListByCatIdApi(
        id,
        auth.myLat,
        auth.myLon
      );
      if (data.success) {
        setAllCategory(data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProductListByCatId();
  }, []);

  const [getModal, setModal] = useState(false);
  useEffect(() => {
    if (getModal === false) {
      document.body.style.overflow = "unset";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [getModal]);

  const addToFavorite = async (vender_id) =>{
    try {
     const {data} = await addToFavoriteApi(auth.user.id,vender_id)
     if(data.success) {
      dispatch(setWishlistCount());
       toast.success("Add To Favorite ");
     }else{
        toast.error("Add To Favorite failed ");
     }
    } catch (error) {
    toast.error("Add To Favorite failed ");
    }
  }

  return (
    <Layout>
      <div className={`${Styles.topProduct}`}>
        <div className={`${Styles.center}`}>
          <Heading
            headingType="h2"
            headingText="Best Selling Products"
            color="black"
            className={`${Styles.pageTitel}`}
          />
          <Text
            color="black"
            variant="lgText"
            strong="strong4"
            className={`${Styles.mt10} ${Styles.dBlock}`}
          >
            All top store
          </Text>
          <div
            className={`${Styles.tabWrapper} ${Styles.dFlex} ${Styles.flexWrap}`}
          >
            <Button variant="tabBtn" onClick={() => setModal(!getModal)}>
              Filter
              <span class="material-symbols-rounded">page_info</span>
            </Button>
            <Button variant="tabBtn">Sort By</Button>
            <Button variant="tabBtn">Less than 30 mins</Button>
            <Button variant="tabBtn">$300 - $300</Button>
            <Button variant="tabBtn">Less than $300</Button>
          </div>
          <a href="/login" id="login" />
          <div className={`${Styles.row} ${Styles.categoryRow}`}>
            {category.length > 0 &&
              category[0].id != "No_data" &&
              category?.map((item) => {
                return (
                  <CategoryCard
                    to={`#`}
                    src={item?.variant[0].image}
                    productname={item.product_name}
                    rating={item.ratingTotal}
                    productinfo={item.address}
                    address={item.address}
                    variant="bestProduct"
                    price={item?.variant[0].sale_price}
                    strikePrice={item?.variant[0].strike_price}
                    favoriteClick={()=>{
                      if(auth.token) {
                         addToFavorite(item.id)
                      } else {
                         document.getElementById("login").click();
                      }
                   }}
                  />
                );
              })}
                          {category.length > 0 &&
              category[0].id === "No_data" &&
              "No Data Found !"}
            {/* <CategoryCard
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

      {getModal && (
        <div className={`${Styles.modalOverlay}`}>
          <div className={`${Styles.modalBody}`}>
            <div className={`${Styles.modalHeader} ${Styles.textCenter}`}>
              <Text
                color="black"
                strong="strong6"
                className={`${Styles.inter} ${Styles.modalHeading}`}
              >
                Filters
              </Text>
              <div
                className={`${Styles.closeBtn}`}
                onClick={() => setModal(!getModal)}
              >
                <span class="material-symbols-rounded">close</span>
              </div>
            </div>
            <div className={`${Styles.dFlex}`}>
              <div className={`${Styles.filterList}`}>
                <ListGroup>
                  <ListItem className={`${Styles.filters} ${Styles.active}`}>
                    Sort
                  </ListItem>
                  <ListItem className={`${Styles.filters}`}>
                    Veg/Non-Veg
                  </ListItem>
                  <ListItem className={`${Styles.filters}`}>
                    Delivery Time
                  </ListItem>
                  <ListItem className={`${Styles.filters}`}>
                    Cost For Two
                  </ListItem>
                </ListGroup>
              </div>
              <div className={`${Styles.filterCheckWrapper}`}>
                <RadioBtn
                  labelName="Relevance (Default)"
                  className={`${Styles.filterCheck}`}
                  id="relevance"
                  name="fiter"
                />
                <RadioBtn
                  labelName="Delivery Time"
                  className={`${Styles.filterCheck}`}
                  id="deliver"
                  name="fiter"
                />
                <RadioBtn
                  labelName="Rating"
                  className={`${Styles.filterCheck}`}
                  id="rating"
                  name="fiter"
                />
                <RadioBtn
                  labelName="Cost: Low to High"
                  className={`${Styles.filterCheck}`}
                  id="cost"
                  name="fiter"
                />
                <RadioBtn
                  labelName="Cost: High to Low"
                  className={`${Styles.filterCheck}`}
                  id="value"
                  name="fiter"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default TopProduct;
