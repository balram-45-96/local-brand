import React, {useState, useEffect} from "react";
import Styles from './classified-product.module.scss';
import { Layout } from "../../../components/common";
import {CategoryCard,RadioBtn,ListGroup, ListItem, Text, Button, Heading } from "../../../components/shared";
import { useNavigate, useParams } from "react-router-dom";
import { classifiedSubCategoryApiById , addToFavoriteApi } from '../../../service/classifiedProduct'
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ClassifiedProduct = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const auth = useSelector((state) => state.auth);
   const [allCategory3, setAllCategory3] = useState([]);
 
   const classifiedSubCategory = async () =>{
     try {
      const {data} = await classifiedSubCategoryApiById(id)
      if(data.success) {
         setAllCategory3(data.data);
      }
     } catch (error) {
     console.log('error: ', error);
     }
   }

   const addToFavorite = async (vender_id) =>{
      try {
       const {data} = await addToFavoriteApi(auth.user.id,vender_id)
       if(data.success) {
         toast.success("Add To Favorite ");
       }else{
          toast.error("Add To Favorite failed ");
       }
      } catch (error) {
      toast.error("Add To Favorite failed ");
      }
    }

   useEffect(()=>{
      classifiedSubCategory();
   },[])
   const[getModal, setModal] = useState(false)
  useEffect(() => {
     if (getModal === false) {
      document.body.style.overflow = 'unset';
     } else {
      document.body.style.overflow = 'hidden';
     }
  }, [getModal]);
  return (
    <Layout>
        <div className={`${Styles.productDetail}`}>
           <div className={`${Styles.center}`}>
               <Heading headingType="h2" headingText="Used Cars" color="black" className={`${Styles.pageTitel}`}/>
               
               <div className={`${Styles.tabWrapper} ${Styles.dFlex} ${Styles.flexWrap}`}>
                  <Text color="black" variant="lgText" strong="strong4" className={`${Styles.mt10} ${Styles.dBlock}`}>
                     All brands cars               
                  </Text>
                  <Button variant="tabBtn"
                   onClick={()=>setModal(!getModal)}
                  >Filter
                    <span class="material-symbols-rounded">page_info</span>
                  </Button>
               </div>
               <a href="/login" id="login" />
              <div className={`${Styles.row} ${Styles.categoryRow}`}>
               {allCategory3.map((item)=>{
                  return  <CategoryCard
                  to="#"
                  src="/assets/image/category/car1.png"
                  productname={item.name}
                  productinfo="Jai Bhawani Colony, Jaipur"
                  variant="bestProduct"
                  price="$260"
                  favoriteClick={()=>{
                     if(auth.token) {
                        addToFavorite(item.id)
                     } else {
                        document.getElementById("login").click();
                     }
                  }}
               />
               })}
                {/* <CategoryCard
                   to="#"
                   src="assets/image/category/car1.png"
                   productname="Maruti Suzuki Celerio (2019)"
                   
                   productinfo="Jai Bhawani Colony, Jaipur"
                   variant="bestProduct"
                   price="$260"
                />
                <CategoryCard
                   to="#"
                   src="assets/image/category/car2.png"
                   productname="Maruti Suzuki Celerio (2019)"
                   productinfo="Jai Bhawani Colony, Jaipur"
                   variant="bestProduct"
                   price="$260"
                />
                <CategoryCard
                   to="#"
                   src="assets/image/category/car3.png"
                   productname="Maruti Suzuki Celerio (2019)"
                   productinfo="Jai Bhawani Colony, Jaipur"
                   variant="bestProduct"
                   price="$260"
                />

                <CategoryCard
                   to="#"
                   src="assets/image/category/car1.png"
                   productname="Maruti Suzuki Celerio (2019)"
                   
                   productinfo="Jai Bhawani Colony, Jaipur"
                   variant="bestProduct"
                   price="$260"
                />
                <CategoryCard
                   to="#"
                   src="assets/image/category/car2.png"
                   productname="Maruti Suzuki Celerio (2019)"
                   productinfo="Jai Bhawani Colony, Jaipur"
                   variant="bestProduct"
                   price="$260"
                />
                <CategoryCard
                   to="#"
                   src="assets/image/category/car3.png"
                   productname="Maruti Suzuki Celerio (2019)"
                   productinfo="Jai Bhawani Colony, Jaipur"
                   variant="bestProduct"
                   price="$260"
                /> */}

              </div>
           </div>
        </div>
        {getModal &&
          <div className={`${Styles.modalOverlay}`}>
          <div className={`${Styles.modalBody}`}>
            <div className={`${Styles.modalHeader} ${Styles.textCenter}`}>
                <Text color="black" strong="strong6" className={`${Styles.inter} ${Styles.modalHeading}`}>Filters</Text>
                <div className={`${Styles.closeBtn}`} onClick={()=>setModal(!getModal)}><span class="material-symbols-rounded">close</span></div>
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
       }

   </Layout>
  );
};

export default ClassifiedProduct;