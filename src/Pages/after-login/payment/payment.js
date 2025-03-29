import React, { useEffect, useRef, useState } from "react";
import Styles from "./payment.module.scss";
import { Layout } from "../../../components/common";
import { Text, Button, RadioBtn, Image, ListGroup } from "../../../components/shared";
import { Link } from "react-router-dom";
import { deleteAddressApi, getCartListApi, handleAddAddressApi, stripurlApi } from "../../../service/payment";
import { useSelector } from "react-redux";
import { getAddressListApi, getCouponsApi } from "../../../service/home";
import { Input, ListItem } from "@mui/material";
import { toast } from "react-toastify";
import { addToCartApi, deleteCartItemAPi } from "../../../service/category";
import AddressAutocomplete from "./AddressAutocomplete";

const Payment = () => {
  const [cardList, setCardList] = useState([]);
  const [loader, setLoader] =useState(true);
  const auth = useSelector((state) => state.auth);
  const [copen, setCopen] = useState({});
  const [address, setAddress] = useState({});

  const[getModal, setModal] = useState(false)
  useEffect(() => {
     if (getModal === false) {
      document.body.style.overflow = 'unset';
     } else {
      document.body.style.overflow = 'hidden';
     }
  }, [getModal]);

  const getCartList = async () => {
    try {
      const { data } = await getCartListApi(auth?.user?.id);
      if (data.success) {
        setCardList(data.data || []);
      } else {
        setCardList([]);
      }
    } catch (error) {}
  };

  const getCoupons = async () => {
    try {
      const { data } = await getCouponsApi();
      if (data.success) {
        setCopen(data.data[0]);
      }
    } catch (error) {}
  };

  const getAddressList = async () => {
    try {
      const { data } = await getAddressListApi( auth.user.id);
      if (data.success) {
        setAddress(data.data);
      }
    } catch (error) {}
  };

  const [address1, setAddress1] = useState('');
  const [phone, setphone] = useState('');
  const handleAddAddress = async (event) => {
  event.preventDefault();
    try {
      const {data} = await handleAddAddressApi({ address:address1, phone }, auth);
      
      if (data.success) {
        getAddressList();
        setModal(false);
        setAddress1("");
        toast.success(data.message, { autoClose: 2000 });
      } else {
        toast.error(data.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  const deleteCartItem = async (card_id) => {
      try {
        const {data} = await deleteCartItemAPi(card_id);
        
        if (data.success) {
          getCartList();
          toast.success(data.message, { autoClose: 2000 });
        } else {
          toast.error(data.message, { autoClose: 2000 });
        }
      } catch (error) {
        console.error('Error calling API:', error);
        // Handle other errors if needed
      }
    };


    const addToCart = async (id, variant_id, product_id, card_qty) => {
      try {
  
        const { data } = await addToCartApi(
          auth?.user?.id,
          product_id,
          Number(card_qty)+ 1,
          variant_id
        );
        if (data.success) {
          getCartList();
          toast.success("Item added success");
        } else {
          toast.error("Item added failed");
        }
      } catch (error) {
        console.log("error: ", error);
        toast.error("Item added failed");
      }
    };
  
  useEffect(async() => {
    try {
      
      setLoader(true);
      await Promise.all([
        getCartList(),
        getCoupons(),
        getAddressList(),
      ]);
      setLoader(false); 
    } catch (error) {
    console.log('error: ', error);
      
    }
    
  }, []);

  const handleDeleteAddress = async (id) => {
    try {
      const {data} = await deleteAddressApi(id);      
      if (data.success) {
        getAddressList();
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };
  const iframeRef = useRef(null);

  const [html, setHtml]= useState('');
  useEffect(async()=>{
    const {data} = await stripurlApi("https://.com/ci/Stripe/index/264/100.0?api_token=682a03f4cd9e0c79b8a1f0e34266b9651ad9821c")
    console.log('data: ', data);
    setHtml(data);
  },[])
  const handleClickInnerIframe = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      const buttonInsideIframe = iframe.contentWindow.document.getElementById('checkout-button');
      if (buttonInsideIframe) {
        buttonInsideIframe.click();
      }
    }
  }

  return (
    <Layout>
     <iframe
        style={{
          display: "none"
        }}
        ref={iframeRef}
        title="MyIframe"
        srcDoc={html}
      />
      {cardList && cardList.items?.length > 0 ?  <div className={`${Styles.paymentWrapper}`}>
        <div className={`${Styles.center}`}>
          <div className={`${Styles.paymentRow} ${Styles.dFlex}`}>
            <div className={`${Styles.paymentMethodCol}`}>
              
              <div className={`${Styles.card}`}>
                <Text
                  strong="strong7"
                  color="black"
                  className={`${Styles.pageTitel}`}
                >
                  Logged in
                </Text>
                <Text className={`${Styles.dBlock} ${Styles.userInfo}`}>
                  {auth.user.name} | {auth.user.phone}
                </Text>
              </div>

              <div className={`${Styles.card}`}>
                <div className={`${Styles.alignBetween}`}>
                  <Text
                    strong="strong7"
                    color="black"
                    className={`${Styles.pageTitel}`}
                  >
                    Delivery address
                  </Text>
                  <Button variant="textBtn" onClick={()=>setModal(!getModal)} className={`${Styles.redBtn}`}>
                    Change
                  </Button>
                </div>
                <div className={`${Styles.addressWrapper}`}>
                  <Text
                    strong="strong6"
                    variant="mdText"
                    color="black"
                    className={`${Styles.dBlock}`}
                  >
                    Home
                  </Text>
                  <Text
                    strong="strong5"
                    variant="smText"
                    color="black"
                    className={`${Styles.dBlock} ${Styles.address}`}
                  >
                     {
                        address[0]?.address
                     }
                     {" "} 
                     <br />
                     {
                       address[0]?.phone
                     }
                    {/* 30, 3, Narayan Sing Saput Marg, Shivaji Market, Nagar Nigam,
                    Indore, Madhya Pradesh 452007, India */}
                  </Text>
                </div>
                <Text
                  variant="lgText"
                  color="black"
                  strong="strong5"
                  className={`${Styles.dBlock}`}
                >
                  27 Mins
                </Text>
              </div>


              <div className={`${Styles.payBtnWrapper}`}>
               <Button onClick={()=> handleClickInnerIframe()} variant="redBtn">Proceed to Pay</Button>
              </div>


              {/* <div className={`${Styles.card}`}>
                <Text
                  strong="strong7"
                  color="black"
                  className={`${Styles.pageTitel} ${Styles.metehodText}`}
                >
                  Choose payment method
                </Text>
                <div
                  className={`${Styles.alignBetween} ${Styles.methodWrapper}`}
                >
                  <div className={`${Styles.radioBtnbox}`}>
                    <RadioBtn
                      labelName="Pay by any UPI App"
                      subLabel="You need to have a registered UPI ID"
                      className={`${Styles.filterCheck}`}
                      id="upi"
                      name="payment"
                      variant="multiLabel"
                    />
                  </div>
                  <Button variant="redBtn" className={`${Styles.plusBtn}`}>
                    <span class="material-symbols-rounded">add</span>
                  </Button>
                </div>
                <div
                  className={`${Styles.alignBetween} ${Styles.methodWrapper}`}
                >
                  <div className={`${Styles.radioBtnbox}`}>
                    <RadioBtn
                      labelName="Credit & Debit Cards"
                      subLabel="Save and Pay via Cards."
                      className={`${Styles.filterCheck}`}
                      id="creaditCard"
                      name="payment"
                      variant="multiLabel"
                    />
                  </div>
                  <Button variant="redBtn" className={`${Styles.plusBtn}`}>
                    <span class="material-symbols-rounded">add</span>
                  </Button>
                </div>
                <div
                  className={`${Styles.alignBetween} ${Styles.methodWrapper}`}
                >
                  <div className={`${Styles.radioBtnbox}`}>
                    <RadioBtn
                      labelName="Cash"
                      subLabel="Cash on delivery"
                      className={`${Styles.filterCheck}`}
                      id="cash"
                      name="payment"
                      variant="multiLabel"
                    />
                  </div>
                </div>
              </div> */}
            </div>
            <div className={`${Styles.paymentCol}`}>
              <div className={`${Styles.card}`}>
                {cardList?.items?.map((item) => {
                  return (
                    <div
                      className={`${Styles.dFlex} ${Styles.productImgWrapper}`}
                    >
                      <Image
                        src={item?.image}
                        alt="product"
                        className={`${Styles.productImg}`}
                      />
                      <div className={`${Styles.width100}`}>
                        <Text
                          color="black"
                          variant="mdText"
                          strong="strong6"
                          className={`${Styles.dBlock} ${Styles.productName}`}
                        >

                        {item?.name}
                        </Text>
                        <div
                          className={`${Styles.alignBetween} ${Styles.alignItemsCenter}`}
                        >
                          <Text
                            strong="strong5"
                            variant="mdText"
                            className={`${Styles.payment}`}
                          >
                            ${item?.sale_price}
                          </Text>
                          <Text
                            strong="strong5"
                            variant="mdText"
                            className={`${Styles.removeItems}`}
                            onClick={()=>deleteCartItem(item.card_id)}
                          >
                            Remove
                          </Text>
                           
                          <div
                            className={`${Styles.productBtnWrapper} ${Styles.dFlex}`}
                          >
                            <Button >
                              <span class="material-symbols-rounded">
                                remove
                              </span>
                            </Button>
                            <Button>{item.card_qty}</Button>
                            <Button onClick={()=>  addToCart(
                                item?.id,
                                item.variant_2_id,
                                item.product_id,
                                item.card_qty
                              )}>
                              <span class="material-symbols-rounded">add</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* <div className={`${Styles.dFlex} ${Styles.productImgWrapper}`}>
                         <Image src="assets/image/category/pinoz-pizza.jpg" alt="product" className={`${Styles.productImg}`} />
                         <div>
                           <Text color="black" variant="mdText" strong="strong6" className={`${Styles.dBlock} ${Styles.productName}`}>
                              Combo Of Chocolava & Coke
                           </Text>
                           <div className={`${Styles.alignBetween} ${Styles.alignItemsCenter}`}>
                              <Text strong="strong7" variant="lgText" className={`${Styles.payment}`}>$20</Text>
                              <div className={`${Styles.productBtnWrapper} ${Styles.dFlex}`}>
                                 <Button><span class="material-symbols-rounded">remove</span></Button>
                                 <Button>1</Button>
                                 <Button><span class="material-symbols-rounded">add</span></Button>
                              </div>
                           </div>
                         </div>
                     </div> */}

                <Link
                  to="#"
                  className={`${Styles.dFlex} ${Styles.alignItemsCenter} ${Styles.coupan}`}
                >
                  <Image
                    src={copen.image || "assets/image/icon/discount.png"}
                    alt="discount"
                    className={`${Styles.discount}`}
                  />
                  <Text strong="strong5" variant="lgText" color="black">
                    Apply Coupan
                  </Text>
                </Link>

                <Text variant="lgText" strong="strong6" color="black">
                  Bill Details
                </Text>
                <div className={`${Styles.productInfoWrapper}`}>
                  <div className={`${Styles.alignBetween} ${Styles.mb10}`}>
                    <Text className={`${Styles.pr5}`}>Item Total</Text>
                    <Text>${cardList?.sub_totel}</Text>
                  </div>
                  <div className={`${Styles.alignBetween} ${Styles.pb5}`}>
                    <Text className={`${Styles.pr5}`}>
                      Delivery Fee | 3.7 kms
                    </Text>
                    <Text>${cardList?.driver_commission}</Text>
                  </div>

                  <div
                    className={`${Styles.alignBetween} ${Styles.serviceCharges}`}
                  >
                    <Text className={`${Styles.pr5}`}>
                      GST and Restaurant Charges
                    </Text>
                    <Text>${cardList?.admin_fee}</Text>
                  </div>
                </div>

                <div className={`${Styles.alignBetween}`}>
                  <Text color="black" strong="strong7" variant="mdText">
                    Total Pay
                  </Text>
                  <Text color="black" strong="strong7" variant="mdText">
                    ${cardList?.grand_totel}
                  </Text>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div> : 
      "No item found !"
      }
     
      {getModal && (
        <div className={`${Styles.modalOverlay}`}>
          <div className={`${Styles.modalBody}`}>
            <div className={`${Styles.modalHeader} ${Styles.textCenter}`}>
              <Text color="black" strong="strong6" className={`${Styles.inter} ${Styles.modalHeading}`}>
                Add Address
              </Text>
              <div className={`${Styles.closeBtn}`} onClick={() => setModal(!getModal)}>
                <span className="material-symbols-rounded">close</span>
              </div>
            </div>
            <div className={`${Styles.dFlex}`}>
            <div className={`${Styles.filterCheckWrapper}`}>
              <form onSubmit={handleAddAddress}>
              <AddressAutocomplete  address={address1} setAddress={setAddress1} />
              <br />
                    <Input
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    placeholder="Enter your phone"
                  />
                  <Button type="submit" variant="redBtn">
                    Add Address
                  </Button>
              </form>
              <ul className={`${Styles.addressList}`} >
        {address.map((address) => (
          <li key={address.id}>
            {address.address}
            <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
          </li>
        ))}
      </ul>

              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Payment;
