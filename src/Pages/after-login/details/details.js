import React, { useEffect, useState } from "react";
import Styles from "./details.module.scss";
import { Layout } from "../../../components/common";
import { Heading, Text, Image, Button } from "../../../components/shared";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useParams } from "react-router-dom";
import {
  addToCartApi,
  productListApi,
  shopSettingApi,
} from "../../../service/category";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Details = () => {
  const auth = useSelector((state) => state.auth);
  const [categoryDetails, setCategoryDetails] = useState();
  const [cartItem, setCartItem] = useState();
  const [categoryDetailsList, setCategoryDetailsList] = useState([])
  console.log('categoryDetailsList: ', categoryDetailsList);
  // const [categoryDetailsList, setCategoryDetailsList] = useState(
  //   [{"id":"4","product_name":"product 1","variant":[{"variant_id":"11","product_id":"4","quantity":"1","name":"ddd","unit":"piece","sale_price":"31500","strike_price":"35000","type":"1","minPurchase":null,"maxPurchase":null,"tax":0,"discount":"10","card_qty":0,"image":"https:\/\/.com\/ci\/uploads\/product_image\/product_8.png"}],"productType":"1","distance":"5,527.55","ratingTotal":"0","ratingNum":"0","address":"428 Rideau St, Ottawa, ON K1N 5Z1, Canada"},{"id":"5","product_name":"product 2","variant":[{"variant_id":"12","product_id":"5","quantity":"1","name":"eee","unit":"piece","sale_price":"31500","strike_price":"35000","type":"1","minPurchase":null,"maxPurchase":null,"tax":0,"discount":"10","card_qty":0,"image":"https:\/\/.com\/ci\/uploads\/product_image\/product_8.png"}],"productType":"1","distance":"5,315.32","ratingTotal":"0","ratingNum":"0","address":"QR25+3F8, Chota Bangarda, Indore, Madhya Pradesh 452005, India"}]);
  const { variantId } = useParams();

  const shopSetting = async () => {
    try {
      const { data } = await shopSettingApi(variantId, auth?.user?.id);
      if (data.success) {
        setCategoryDetails(data.data);
      }
    } catch (error) {}
  };

  const productList = async () => {
    try {
      const { data } = await productListApi(variantId, auth?.user?.id);
      if (data.success) {
        setCategoryDetailsList(data.data);
      }
    } catch (error) {}
  };

  const addToCart = async ( mIndex,
    InIndex,id, variant_id, product_id) => {
    try {
      let cart =[...categoryDetailsList];
      if (Number(cart[mIndex].variant[InIndex].card_qty) > 0) {
        cart[mIndex].variant[InIndex].card_qty = Number(cart[mIndex].variant[InIndex].card_qty) + 1;
      } else {
        cart[mIndex].variant[InIndex].card_qty = 1;
      }
      console.log('cart[mIndex].variant[InIndex]: ', cart[mIndex].variant[InIndex]);
      const { data } = await addToCartApi(
        auth?.user?.id,
        product_id,
        cart[mIndex].variant[InIndex].card_qty,
        variant_id
      );
      if (data.success) {
        toast.success("Item added success");
        
        setCategoryDetailsList(cart);
      } else {
        toast.error("Item added failed");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Item added failed");
    }
  };

  const removeToCart = async ( mIndex,
    InIndex,id, variant_id, product_id) => {
    try {
      let cart =[...categoryDetailsList];
      if (Number(cart[mIndex].variant[InIndex].card_qty) > 0) {
        cart[mIndex].variant[InIndex].card_qty = Number(cart[mIndex].variant[InIndex].card_qty) - 1;
      } else {
        cart[mIndex].variant[InIndex].card_qty = 0;
      }
      console.log('cart[mIndex].variant[InIndex]: ', cart[mIndex].variant[InIndex]);
      const { data } = await addToCartApi(
        auth?.user?.id,
        product_id,
        cart[mIndex].variant[InIndex].card_qty,
        variant_id
      );
      if (data.success) {
        toast.success("Item remove success");
        
        setCategoryDetailsList(cart);
      } else {
        toast.error("Item remove failed");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Item added failed");
    }
  };

  useEffect(() => {
    shopSetting();
    productList();
  }, []);

  return (
    <Layout>
      <div className={`${Styles.center} ${Styles.detailsPageWrapper}`}>
        <div className={`${Styles.card} ${Styles.alignBetween}`}>
          <div className={`${Styles.productDetailwWrapper}`}>
            <Heading
              headingType="h2"
              headingText={categoryDetails?.display_name}
              color="black"
              className={`${Styles.pageTitel}`}
            />
            <Text
              strong="strong4"
              variant="lgText"
              className={`${Styles.productDetail} ${Styles.dBlock}`}
            >
              Pizzas, Pastas
            </Text>
            <div
              className={`${Styles.locationDetail} ${Styles.dFlex} ${Styles.alignItemsCenter}`}
            >
              <Image
                src="/assets/image/icon/location.svg"
                alt="location"
                className={`${Styles.mr10} ${Styles.cardImg}`}
              />
              <Text
                strong="strong4"
                variant="lgText"
                className={`${Styles.location}`}
              >
                {categoryDetails?.address1}
              </Text>
            </div>
            <div
              className={`${Styles.deliveryDetail} ${Styles.dFlex} ${Styles.alignItemsCenter}`}
            >
              <Image
                src="/assets/image/icon/fast-delivery.png"
                alt="location"
                className={`${Styles.mr10} ${Styles.cardImg}`}
              />
              <Text
                strong="strong5"
                color="black"
                variant="lgText"
                className={`${Styles.deliveryInfo}`}
              >
                3.3 kms | $30 Delivery fee will apply
              </Text>
            </div>
          </div>

          <div
            className={`${Styles.alignBetween} ${Styles.alignItemsCenter} ${Styles.ratingBox}`}
          >
            <Image
              src="/assets/image/icon/star.svg"
              alt="star"
              className={`${Styles.ratingIcon}`}
            />
            <Text color="black" strong="strong6" className={`${Styles.rating}`}>
              {categoryDetails?.rating_total}
            </Text>
          </div>
        </div>

        <div
          className={`${Styles.productType} ${Styles.dFlex} ${Styles.alignItemsCenter}`}
        >
          <Image src="/assets/image/veg.png" alt="veg" />
          <Text color="black" variant="lgText" strong="strong6">
            PURE VEG
          </Text>
        </div>

    {
      categoryDetailsList?.length > 0 &&
      categoryDetailsList[0].id != "No_data" &&
      categoryDetailsList.map((item, mIndex) => {
        return  <div
        className={`${Styles.card} ${Styles.productCardSection} detailAcordion`}
      >
        <Accordion>
          <AccordionSummary
            expandIcon={
              <span class="material-symbols-rounded">expand_more</span>
            }
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Text
              color="black"
              strong="strong6"
              className={`${Styles.inter} ${Styles.acordionHeader}`}
            >
              {item?.product_name}
            </Text>
          </AccordionSummary>
          <AccordionDetails>
            {
              item?.variant.map((vItem, InIndex) => {
                return (
                  <div
                    className={`${Styles.alignBetween} ${Styles.alignItemsCenter} ${Styles.productCardWrapper}`}
                  >
                    <div className={`${Styles.dFlex} ${Styles.productCard}`}>
                      <div className={`${Styles.productImg}`}>
                        <Image src={vItem.image} alt="product" />
                      </div>
                      <div className={`${Styles.productInfo}`}>
                        <Text
                          color="black"
                          strong="strong5"
                          className={`${Styles.productName} ${Styles.dBlock} ${Styles.inter}`}
                        >
                          {vItem?.name}
                        </Text>
                        <Text
                          strong="strong4"
                          variant="mdText"
                          className={`${Styles.productCombo} ${Styles.dBlock} ${Styles.inter}`}
                        >
                          Chocolava + Coke
                        </Text>
                        <Text
                          color="black"
                          strong="strong7"
                          variant="mdText"
                          className={`${Styles.productPrice} ${Styles.dBlock} ${Styles.inter}`}
                        >
                          ${vItem.sale_price}
                        </Text>
                      </div>
                    </div>
                    <Button
                      variant="redBtn"
                      className={`${Styles.productAddBtn}`}
                    >
                      {vItem.card_qty > 0 ? (
                        <>
                           <span onClick={()=>removeToCart(
                                mIndex,
                                InIndex,
                                item?.id,
                                vItem.variant_id,
                                vItem.product_id
                              )} className={`material-symbols-rounded ${Styles.removeBtn}`}>
                            remove
                          </span>
                           <span  className={`${Styles.valueQty}`}>{vItem.card_qty}{" "}</span>
                         

                          <span
                            className={`material-symbols-rounded ${Styles.removeBtn}`}
                            onClick={() =>
                              addToCart(
                                mIndex,
                                InIndex,
                                item?.id,
                                vItem.variant_id,
                                vItem.product_id
                              )
                            }
                          >
                            Add
                          </span>
                        </>
                      ) : (
                        <span
                          onClick={() =>
                            addToCart(
                              mIndex,
                              InIndex,
                              item?.id,
                              vItem.variant_id,
                              vItem.product_id
                            )
                          }
                        >
                          Add
                        </span>
                      )}
                    </Button>
                  </div>
                );
              })}
            {/* <div
              className={`${Styles.alignBetween} ${Styles.alignItemsCenter} ${Styles.productCardWrapper}`}
            >
              <div className={`${Styles.dFlex} ${Styles.productCard}`}>
                <div className={`${Styles.productImg}`}>
                  <Image
                    src="assets/image/category/pinoz-pizza.jpg"
                    alt="product"
                  />
                </div>
                <div className={`${Styles.productInfo}`}>
                  <Text
                    color="black"
                    strong="strong5"
                    className={`${Styles.productName} ${Styles.dBlock} ${Styles.inter}`}
                  >
                    Combo Of Chocolava & Coke
                  </Text>
                  <Text
                    strong="strong4"
                    variant="mdText"
                    className={`${Styles.productCombo} ${Styles.dBlock} ${Styles.inter}`}
                  >
                    Chocolava + Coke
                  </Text>
                  <Text
                    color="black"
                    strong="strong7"
                    variant="mdText"
                    className={`${Styles.productPrice} ${Styles.dBlock} ${Styles.inter}`}
                  >
                    $20,0
                  </Text>
                </div>
              </div>
              <Button variant="redBtn" className={`${Styles.productAddBtn}`}>
                1 <span class="material-symbols-rounded">add</span>
              </Button>
            </div>
            <div
              className={`${Styles.alignBetween} ${Styles.alignItemsCenter} ${Styles.productCardWrapper}`}
            >
              <div className={`${Styles.dFlex} ${Styles.productCard}`}>
                <div className={`${Styles.productImg}`}>
                  <Image
                    src="assets/image/category/pinoz-pizza.jpg"
                    alt="product"
                  />
                </div>
                <div className={`${Styles.productInfo}`}>
                  <Text
                    color="black"
                    strong="strong5"
                    className={`${Styles.productName} ${Styles.dBlock} ${Styles.inter}`}
                  >
                    Combo Of Chocolava & Coke
                  </Text>
                  <Text
                    strong="strong4"
                    variant="mdText"
                    className={`${Styles.productCombo} ${Styles.dBlock} ${Styles.inter}`}
                  >
                    Chocolava + Coke
                  </Text>
                  <Text
                    color="black"
                    strong="strong7"
                    variant="mdText"
                    className={`${Styles.productPrice} ${Styles.dBlock} ${Styles.inter}`}
                  >
                    $20,0
                  </Text>
                </div>
              </div>
              <Button variant="redBtn" className={`${Styles.productAddBtn}`}>
                Add
              </Button>
            </div> */}
          </AccordionDetails>
        </Accordion>
      </div>
      })
    }
        {/* <div
          className={`${Styles.card} ${Styles.productCardSection} detailAcordion`}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={
                <span class="material-symbols-rounded">expand_more</span>
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Text
                color="black"
                strong="strong6"
                className={`${Styles.inter} ${Styles.acordionHeader}`}
              >
                Combo (2)
              </Text>
            </AccordionSummary>
            <AccordionDetails>
              {categoryDetailsList?.length > 0 &&
                categoryDetailsList[0].id != "No_data" &&
                categoryDetailsList.map((item) => {
                  return (
                    <div
                      className={`${Styles.alignBetween} ${Styles.alignItemsCenter} ${Styles.productCardWrapper}`}
                    >
                      <div className={`${Styles.dFlex} ${Styles.productCard}`}>
                        <div className={`${Styles.productImg}`}>
                          <Image src={item?.variant[0]?.image} alt="product" />
                        </div>
                        <div className={`${Styles.productInfo}`}>
                          <Text
                            color="black"
                            strong="strong5"
                            className={`${Styles.productName} ${Styles.dBlock} ${Styles.inter}`}
                          >
                            {item?.product_name}
                          </Text>
                          <Text
                            strong="strong4"
                            variant="mdText"
                            className={`${Styles.productCombo} ${Styles.dBlock} ${Styles.inter}`}
                          >
                            Chocolava + Coke
                          </Text>
                          <Text
                            color="black"
                            strong="strong7"
                            variant="mdText"
                            className={`${Styles.productPrice} ${Styles.dBlock} ${Styles.inter}`}
                          >
                            ${item.variant[0].sale_price}
                          </Text>
                        </div>
                      </div>
                      <Button
                        variant="redBtn"
                        className={`${Styles.productAddBtn}`}
                      >
                        {cartItem && cartItem[item?.id] ? (
                          <>
                            <span
                              class="material-symbols-rounded"
                              onClick={() =>
                                addToCart(
                                  item?.id,
                                  item.variant[0].variant_id,
                                  item.variant[0].product_id
                                )
                              }
                            >
                              add
                            </span>{" "}
                            {cartItem[item?.id]}{" "}
                            <span className="material-symbols-rounded">
                              remove
                            </span>{" "}
                          </>
                        ) : (
                          <span
                            onClick={() =>
                              addToCart(
                                item?.id,
                                item.variant[0].variant_id,
                                item.variant[0].product_id
                              )
                            }
                          >
                            add
                          </span>
                        )}
                      </Button>
                    </div>
                  );
                })}
              <div
                className={`${Styles.alignBetween} ${Styles.alignItemsCenter} ${Styles.productCardWrapper}`}
              >
                <div className={`${Styles.dFlex} ${Styles.productCard}`}>
                  <div className={`${Styles.productImg}`}>
                    <Image
                      src="assets/image/category/pinoz-pizza.jpg"
                      alt="product"
                    />
                  </div>
                  <div className={`${Styles.productInfo}`}>
                    <Text
                      color="black"
                      strong="strong5"
                      className={`${Styles.productName} ${Styles.dBlock} ${Styles.inter}`}
                    >
                      Combo Of Chocolava & Coke
                    </Text>
                    <Text
                      strong="strong4"
                      variant="mdText"
                      className={`${Styles.productCombo} ${Styles.dBlock} ${Styles.inter}`}
                    >
                      Chocolava + Coke
                    </Text>
                    <Text
                      color="black"
                      strong="strong7"
                      variant="mdText"
                      className={`${Styles.productPrice} ${Styles.dBlock} ${Styles.inter}`}
                    >
                      $20,0
                    </Text>
                  </div>
                </div>
                <Button variant="redBtn" className={`${Styles.productAddBtn}`}>
                  1 <span class="material-symbols-rounded">add</span>
                </Button>
              </div>
              <div
                className={`${Styles.alignBetween} ${Styles.alignItemsCenter} ${Styles.productCardWrapper}`}
              >
                <div className={`${Styles.dFlex} ${Styles.productCard}`}>
                  <div className={`${Styles.productImg}`}>
                    <Image
                      src="assets/image/category/pinoz-pizza.jpg"
                      alt="product"
                    />
                  </div>
                  <div className={`${Styles.productInfo}`}>
                    <Text
                      color="black"
                      strong="strong5"
                      className={`${Styles.productName} ${Styles.dBlock} ${Styles.inter}`}
                    >
                      Combo Of Chocolava & Coke
                    </Text>
                    <Text
                      strong="strong4"
                      variant="mdText"
                      className={`${Styles.productCombo} ${Styles.dBlock} ${Styles.inter}`}
                    >
                      Chocolava + Coke
                    </Text>
                    <Text
                      color="black"
                      strong="strong7"
                      variant="mdText"
                      className={`${Styles.productPrice} ${Styles.dBlock} ${Styles.inter}`}
                    >
                      $20,0
                    </Text>
                  </div>
                </div>
                <Button variant="redBtn" className={`${Styles.productAddBtn}`}>
                  Add
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        </div> */}

        {/* <div
          className={`${Styles.card} ${Styles.productCardSection} detailAcordion`}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={
                <span class="material-symbols-rounded">expand_more</span>
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Text
                color="black"
                strong="strong6"
                className={`${Styles.inter} ${Styles.acordionHeader}`}
              >
                Personal Slice Veg Pizza. (33)
              </Text>
            </AccordionSummary>
            <AccordionDetails>
              <div
                className={`${Styles.alignBetween} ${Styles.alignItemsCenter} ${Styles.productCardWrapper}`}
              >
                <div className={`${Styles.dFlex} ${Styles.productCard}`}>
                  <div className={`${Styles.productImg}`}>
                    <Image
                      src="/assets/image/category/pinoz-pizza.jpg"
                      alt="product"
                    />
                  </div>
                  <div className={`${Styles.productInfo}`}>
                    <Text
                      color="black"
                      strong="strong5"
                      className={`${Styles.productName} ${Styles.dBlock} ${Styles.inter}`}
                    >
                      Combo Of Chocolava & Coke
                    </Text>
                    <Text
                      strong="strong4"
                      variant="mdText"
                      className={`${Styles.productCombo} ${Styles.dBlock} ${Styles.inter}`}
                    >
                      Chocolava + Coke
                    </Text>
                    <Text
                      color="black"
                      strong="strong7"
                      variant="mdText"
                      className={`${Styles.productPrice} ${Styles.dBlock} ${Styles.inter}`}
                    >
                      $20,0
                    </Text>
                  </div>
                </div>
                <Button variant="redBtn" className={`${Styles.productAddBtn}`}>
                  1 <span class="material-symbols-rounded">add</span>
                </Button>
              </div>
              <div
                className={`${Styles.alignBetween} ${Styles.alignItemsCenter} ${Styles.productCardWrapper}`}
              >
                <div className={`${Styles.dFlex} ${Styles.productCard}`}>
                  <div className={`${Styles.productImg}`}>
                    <Image
                      src="/assets/image/category/pinoz-pizza.jpg"
                      alt="product"
                    />
                  </div>
                  <div className={`${Styles.productInfo}`}>
                    <Text
                      color="black"
                      strong="strong5"
                      className={`${Styles.productName} ${Styles.dBlock} ${Styles.inter}`}
                    >
                      Combo Of Chocolava & Coke
                    </Text>
                    <Text
                      strong="strong4"
                      variant="mdText"
                      className={`${Styles.productCombo} ${Styles.dBlock} ${Styles.inter}`}
                    >
                      Chocolava + Coke
                    </Text>
                    <Text
                      color="black"
                      strong="strong7"
                      variant="mdText"
                      className={`${Styles.productPrice} ${Styles.dBlock} ${Styles.inter}`}
                    >
                      $20,0
                    </Text>
                  </div>
                </div>
                <Button variant="redBtn" className={`${Styles.productAddBtn}`}>
                  Add
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        </div> */}
      </div>
    </Layout>
  );
};

export default Details;
