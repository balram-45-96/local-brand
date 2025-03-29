import React from "react";
import Styles from './product-detail.module.scss';
import { Layout } from "../../../components/common";
import { Heading,Text, Button, CategoryCard, Image} from "../../../components/shared";
import { Link } from "react-router-dom";

const ProductDetail = () => {

  return (
    <Layout>
        <div className={`${Styles.productDetail}`}>
           <div className={`${Styles.center}`}>
              <div className={`${Styles.projectInfoRow} ${Styles.alignBetween}`}>
                 <div className={`${Styles.productImgCol}  ${Styles.alignBetween}`}>
                     <div className={`${Styles.productImgBoxs}`}>
                         <div className={`${Styles.productSmImage}`}>
                            <Image src="assets/image/top-remote.png" alt="product"/>
                         </div>
                         <div className={`${Styles.productSmImage}`}>
                            <Image src="assets/image/back-remote.png" alt="product"/>
                         </div>
                         <div className={`${Styles.productSmImage}`}>
                            <Image src="assets/image/left-remote.png" alt="product"/>
                         </div>
                         <div className={`${Styles.productSmImage}`}>
                            <Image src="assets/image/right-remote.png" alt="product"/>
                         </div>
                     </div>
                     <div className={`${Styles.mainProductImg}`}>
                        <Image src="assets/image/remote.png" alt="product"/>
                     </div>
                 </div>
                 <div className={`${Styles.productInfoCol}`}>
                    <Heading
                      color="black"
                      headingType="h2"
                      className={`${Styles.productName}`}
                      headingText="Havic HV G-92 Gamepad"
                    />
                    <div className={`${Styles.reviewBox} ${Styles.dFlex}`}>
                      <div className={`${Styles.dFlex} ${Styles.alignItemsCenter}`}>
                        <Image src="assets/image/icon/star.svg" alt="star" className={`${Styles.ratingIcon}`} />
                        <Image src="assets/image/icon/star.svg" alt="star" className={`${Styles.ratingIcon}`} />
                        <Image src="assets/image/icon/star.svg" alt="star" className={`${Styles.ratingIcon}`} />
                        <Image src="assets/image/icon/star.svg" alt="star" className={`${Styles.ratingIcon}`} />
                        <Image src="assets/image/icon/gray-star.svg" alt="star" className={`${Styles.ratingIcon}`} />
                      </div>
                      <Text variant="mdText" className={`${Styles.review}`}>(150 Reviews)</Text>
                      <Text variant="mdText" className={`${Styles.stock}`}>In Stock</Text>
                    </div>
                    <Text color="black" strong="strong6" variant="smlgText" className={`${Styles.dBlock} ${Styles.price}`}>
                       $192.00
                    </Text>
                    <Text color="black" strong="strong5" variant="smText" className={`${Styles.dBlock}`}>
                        PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free
                        install & mess free removal Pressure sensitive.
                    </Text>
                    <div className={`${Styles.productBuyInfo}`}>
                         {/* color code */}
                        <div className={`${Styles.colorWrapper} ${Styles.dFlex}`}>
                            <Text
                              color="black"
                              strong="strong5"
                              variant="lgText"
                              className={`${Styles.dBlock} ${Styles.colorsLabel}`}
                           >
                              Colours:
                           </Text>
                            <div className={`${Styles.dFlex} ${Styles.chooseColor} ${Styles.alignItemsCenter}`}>

                              <div className={`${Styles.colorInputBox}`} >
                                 <input type="radio" name="color" id="colorCheckbox" />
                                 <label htmlFor="colorCheckbox">
                                    <span className={Styles.colorBox} style={{backgroundColor: "#69D2E7"}}></span>
                                 </label>
                              </div>

                              <div className={`${Styles.colorInputBox}`} >
                              <input type="radio" name="color" id="colorCheckbox1" />
                                 <label htmlFor="colorCheckbox1">
                                    <span className={Styles.colorBox} style={{backgroundColor: "#E07575"}}></span>
                                 </label>
                              </div>
                            </div>

                        </div>

                        {/* select sizes */}
                        <div className={`${Styles.sizeWraper} ${Styles.dFlex}`}>
                           <Text
                              color="black"
                              strong="strong5"
                              variant="lgText"
                              className={`${Styles.dFlex} ${Styles.alignItemsCenter} ${Styles.colorsLabel}`}
                           >
                              Size:
                           </Text>
                           <div className={`${Styles.dFlex} ${Styles.chooseColor} ${Styles.alignItemsCenter}`}>

                              <div className={`${Styles.colorInputBox}`} >
                                 <input type="radio" name="size" id="sizeCheckbox" />
                                 <label htmlFor="sizeCheckbox" className={`${Styles.centerAlign}`}>
                                   <Text className={`${Styles.sizes}`}>XS</Text>
                                 </label>
                              </div>

                              <div className={`${Styles.colorInputBox}`} >
                              <input type="radio" name="size" id="sizeCheckbox1" />
                                 <label htmlFor="sizeCheckbox1" className={`${Styles.centerAlign}`}>
                                    <Text className={`${Styles.sizes}`}>S</Text>
                                 </label>
                              </div>

                              <div className={`${Styles.colorInputBox}`} >
                              <input type="radio" name="size" id="sizeCheckbox2" />
                                 <label htmlFor="sizeCheckbox2" className={`${Styles.centerAlign}`}>
                                    <Text className={`${Styles.sizes}`}>M</Text>
                                 </label>
                              </div>

                           </div>
                        </div>

                        {/* select quantity */}
                        <div className={`${Styles.alignBetween} ${Styles.quantityWrapper}`}>
                           <div className={`${Styles.dFlex} ${Styles.quantityBtnCard}`}>
                                 <Button className={`${Styles.removeBtn}`}><span class="material-symbols-rounded">remove</span></Button>
                                 <Text className={`${Styles.centerAlign} ${Styles.count}`}>1</Text>
                                 <Button className={`${Styles.addBtn}`}><span class="material-symbols-rounded">add</span></Button>
                           </div>
                           <div className={`${Styles.buyBtnWrapper}`}>
                              <Button variant="redBtn" className={`${Styles.buyNowBtn}`}>Buy Now</Button>
                           </div>
                           <Button className={`${Styles.favoriteBtn} ${Styles.centerAlign}`}>
                              <span class="material-symbols-rounded">favorite</span>
                           </Button>
                        </div>
                        
                    </div>
                    <div className={`${Styles.deliveryWrapper}`}>
                       <div className={`${Styles.deliveryCard} ${Styles.flexCenter}`}>
                           <Image src="assets/image/icon/delivery-black.svg" className={`${Styles.deliveryIcon}`} alt="delivery"/>
                           <div>
                              <Text color="black" strong="strong6" variant="lgText" className={`${Styles.dBlock}`}>Free Delivery</Text>
                              <Link to="" className={Styles.textUnderline}>
                                 <Text color="black" variant="smText" className={`${Styles.dBlock}`}>
                                    Enter your postal code for Delivery Availability
                                 </Text>
                              </Link>
                           </div>
                       </div>
                       <div className={`${Styles.deliveryCard} ${Styles.flexCenter}`}>
                           <Image src="assets/image/icon/return.svg" className={`${Styles.deliveryIcon}`} alt="return"/>
                           <div>
                              <Text color="black" strong="strong6" variant="lgText" className={`${Styles.dBlock}`}>
                                Return Delivery
                              </Text>
                              <Text color="black" variant="smText" className={`${Styles.dBlock}`}>
                                 Free 30 Days Delivery Returns.
                                 <Link to="" className={Styles.textUnderline}>
                                    Details
                                 </Link>
                              </Text>
                           </div>
                       </div>
                    </div>


                 </div>
              </div>
              <Text
                variant="lgText"
                strong="strong6"
                className={`${Styles.mt10} ${Styles.dBlock} ${Styles.relatedItem}`}
              >
                 Related Item
              </Text>

              <div className={`${Styles.row} ${Styles.categoryRow}`}>
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

              </div>
           </div>
        </div>

   </Layout>
  );
};

export default ProductDetail;