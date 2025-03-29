import React from "react";
import Styles from './classified-detail.module.scss';
import { Layout } from "../../../components/common";
import { Heading,Text, Button, CategoryCard, Image} from "../../../components/shared";

const ClassifiedDetail = () => {

  return (
    <Layout>
        <div className={`${Styles.productDetail}`}>
           <div className={`${Styles.center}`}>
              <div className={`${Styles.projectInfoRow} ${Styles.alignBetween}`}>
                 <div className={`${Styles.productImgCol}  ${Styles.alignBetween}`}>
                     <div className={`${Styles.productImgBoxs}`}>
                         <div className={`${Styles.productSmImage}`}>
                            <Image src="assets/image/category/main-car.png" alt="product"/>
                         </div>
                         <div className={`${Styles.productSmImage}`}>
                            <Image src="assets/image/category/car1.png" alt="product"/>
                         </div>
                         <div className={`${Styles.productSmImage}`}>
                            <Image src="assets/image/category/car2.png" alt="product"/>
                         </div>
                         <div className={`${Styles.productSmImage}`}>
                            <Image src="assets/image/category/car3.png" alt="product"/>
                         </div>
                     </div>
                     <div className={`${Styles.mainProductImg}`}>
                        <Image src="assets/image/category/main-car.png" alt="product"/>
                     </div>
                 </div>
                 <div className={`${Styles.productInfoCol}`}>
                    <Heading
                      color="black"
                      headingType="h2"
                      className={`${Styles.productName}`}
                      headingText="Maruti Suzuki Celerio (2019)"
                    />
                     <Text color="black" strong="strong6" variant="smlgText" className={`${Styles.dBlock} ${Styles.price}`}>
                        $192.00
                     </Text>
                     <div className={`${Styles.dFlex} ${Styles.ProductInfoBox} ${Styles.lightBorderBottom}`}>
                        <Image src="assets/image/icon/fuel-station.png" />
                        <Text>Petrol</Text>
                        <Image src="assets/image/icon/speedometer.png" />
                        <Text>4000KM</Text>
                        <Image src="assets/image/icon/user-setup.png" />
                        <Text>Manual</Text>
                     </div>
                     <div className={`${Styles.infoCard} ${Styles.lightBorderBottom}`}>
                        <div className={`${Styles.dFlex} ${Styles.mb5}`}>
                           <Text color="black" variant="mdText">Location: </Text>
                           <Text color="black" variant="mdText">Jai Bhawani Colony, Jaipur</Text>
                        </div>
                        <div className={`${Styles.dFlex} ${Styles.mb5}`}>
                           <Text color="black" variant="mdText">Posting date: </Text>
                           <Text color="black" variant="mdText">31-DEC-23</Text>
                        </div>
                        <div className={`${Styles.dFlex}`}>
                           <Text color="black" variant="mdText">Owner: </Text>
                           <Text color="black" variant="mdText"> 1st</Text>
                        </div>
                     </div>

                     <div className={`${Styles.infoCard} ${Styles.lightBorderBottom}`}>
                        <Text color="black" variant="lgText" className={`${Styles.dBlock} ${Styles.mb5}`}>
                          Description
                        </Text>
                        <Text color="grey" variant="mdText" className={`${Styles.dFlex} ${Styles.mb5} ${Styles.dis}`}>
                           ADDITIONAL VEHICLE INFORMATION:
                        </Text>
                        <Text color="black" variant="mdText" className={`${Styles.dFlex} ${Styles.mb5} ${Styles.dis}`}>
                          Adjustable External Mirror: Power
                        </Text>
                        <Text color="black" variant="mdText" className={`${Styles.dFlex} ${Styles.mb5} ${Styles.dis}`}>
                           Adjustable Steering: Yes
                        </Text>
                        <Text color="black" variant="mdText" className={`${Styles.dFlex} ${Styles.mb5} ${Styles.dis}`}>
                            Air Conditioning: With Heater
                        </Text>
                        <Text color="black" variant="mdText" className={`${Styles.dFlex} ${Styles.mb5} ${Styles.dis}`}>
                           Aux Compatibility: Yes
                        </Text>
                        <Text color="black" variant="mdText" className={`${Styles.dFlex} ${Styles.mb5} ${Styles.dis}`}>
                           Battery Condition: New
                        </Text>
                     </div>
                    
                    <div className={`${Styles.sellerWraper} ${Styles.dFlex}`}>
                       <div className={`${Styles.flexCenter}`}>
                          <div className={`${Styles.circle} ${Styles.centerAlign}`}>
                             H
                          </div>
                          <Text color="black" strong="strong5" variant="mdlgText" className={`${Styles.sellerName} ${Styles.elipsis}`}>
                             Henry
                          </Text>
                          <div className={`${Styles.forword} ${Styles.flecCenter}`}>
                           <span className="material-symbols-rounded">
                                 arrow_forward_ios
                              </span>
                          </div>
                          
                       </div>
                      <Button variant="redBtn" className={`${Styles.sellerBtn}`}>Call with seller</Button>
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

              </div>
           </div>
        </div>

   </Layout>
  );
};

export default ClassifiedDetail;