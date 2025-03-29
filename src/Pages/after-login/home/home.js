import React, { useEffect, useState } from "react";
import Styles from "./home.module.scss";
import { Layout } from "../../../components/common";
import Slider from "react-slick";
import {
  Button,
  Image,
  Text,
  SlideCard,
  Loader,
} from "../../../components/shared";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  debouncedSearchApi,
  getAllCategoryApiById,
  getAllClasifiedCategoryApi,
  sidlerListApi,
} from "../../../service/home";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../redux/AuthRedux/auth";
import ImageWithText from "../../../components/ImageWithText";
import { hCategoriesApi } from "../../../service/category";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  console.log('auth: ', auth);
  const [loading, setLoading] = useState(true);
  const [sliderList, setSliderList] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allCategory2, setAllCategory2] = useState([]);
  const [allCategory3, setAllCategory3] = useState([]);
  console.log('allCategory3: ', allCategory3);
  const [allCategory4Data, setAllCategory4Data] = useState([]);
  console.log('allCategory4: ', allCategory4Data);
  const [top100Films, setOptions] = useState([]);
  const dispatch = useDispatch();

  console.log('local brand',allCategory4Data);

  let debounceTimeout;
  const getSliderList = async () => {
    try {
      const { data } = await sidlerListApi();
      if (data.success) {
        setSliderList(data.data);
      }
    } catch (error) {}
  };

  const getAllCategory = async () => {
    try {
      const { data } = await getAllCategoryApiById(2);
      if (data.success) {
        setAllCategory(data.data);
      }
    } catch (error) {}
  };

  const getAllCategory2 = async () => {
    try {
      const { data } = await getAllCategoryApiById(1);
      if (data.success) {
        setAllCategory2(data.data);
      }
    } catch (error) {}
  };

  const getAllClasifiedCategory = async () => {
    try {
      const { data } = await getAllClasifiedCategoryApi();
      if (data.success) {
        setAllCategory3(data.data);
      }
    } catch (error) {}
  };


  const hCategories = async () => {
    try {
      const { data } = await hCategoriesApi();
      if (data.success) {
        setAllCategory4Data(data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before API calls
      await Promise.all([
        getSliderList(),
        getAllCategory(),
        getAllCategory2(),
        getAllClasifiedCategory(),
        hCategories(),
      ]);
      setLoading(false); // Set loading to false after API calls
    };
    fetchData();
  }, []);

  const debouncedSearch = async (value) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      try {
        const { data } = await debouncedSearchApi(
          value,
          auth.myLat,
          auth.myLon,
          auth.zone_id,
        );
        if (data.success) {
          const productList = data.data.item?.flatMap((item) => {
            if (item?.productList) {
              return item.productList.map((product) => ({
                label: product.product_name,
              }));
            } else {
              return [];
            }
          });

          setOptions(productList);
        }
      } catch (error) {
        console.error("Error fetching autocomplete options:", error);
      }
    }, 300); // Adjust the debounce delay as needed
  };

  const handleSearch = (event, value) => {
    debouncedSearch(value);
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 7000,
  };
  const cateGorysettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  // const top100Films = [
  //   { label: 'The Shawshank Redemption' },
  //   { label: 'The Godfather' },
  //   { label: 'The Godfather: Part II' },
  //   { label: 'The Dark Knight' },
  //   { label: '12 Angry Men' },
  //   { label: "Schindler's List" },
  // ]
  return (
    <Layout>
      <div className={Styles.home}>
        <div className={`${Styles.center} ${Styles.homeBannerWrpper}`}>
          <div className={`${Styles.homeBannerRow} ${Styles.alignBetween}`}>
            <div className={`whiteDots ${Styles.homeBanenrCol}`}>
              <Slider {...settings}>
                {/* new slider items */}
                {sliderList.map((item) => {
                  return (
                    <div
                      className={`${Styles.homeBannerSlide} ${Styles.relative}`}
                    >
                      <Image
                        src={item.image}
                        alt="food image"
                        className={Styles.w100}
                      />
                      {/* <div className={`${Styles.bannerContentWrapper}`}>
                        <Text
                          color="white"
                          strong="strong4"
                          className={`${Styles.dBlock} ${Styles.inter} ${Styles.bannerFirstTitle}`}
                        >
                           {item.slider_text}
                        </Text>
                        <Text
                          color="white"
                          strong="strong7"
                          className={`${Styles.dBlock} ${Styles.inter} ${Styles.bannerSecondTitle}`}
                        >
                          {item.para}
                        </Text>
                        <Button className={`${Styles.bannerBtn}`}>
                          Start Now
                        </Button>
                      </div> */}
                    </div>
                  );
                })}
                {/* old slider constant */}
                {/* <div className={`${Styles.homeBannerSlide} ${Styles.relative}`}>
                         <Image src="assets/image/food-items.png" alt="food image" className={Styles.w100} />
                         <div className={`${Styles.bannerContentWrapper}`}>
                            <Text color="white" strong="strong4" 
                              className={`${Styles.dBlock} ${Styles.inter} ${Styles.bannerFirstTitle}`}
                            >
                              GROSERIES DELIVERY
                            </Text>
                            <Text color="white" strong="strong7" 
                              className={`${Styles.dBlock} ${Styles.inter} ${Styles.bannerSecondTitle}`}
                            >
                              Food items
                            </Text>
                            <Button className={`${Styles.bannerBtn}`}>Start Now</Button>
                         </div>
                      </div> */}
                {/* <div className={`${Styles.homeBannerSlide} ${Styles.relative}`}>
                          <Image src="assets/image/food-items.png" alt="food image" className={Styles.w100} />
                          <div className={`${Styles.bannerContentWrapper}`}>
                            <Text color="white" strong="strong4" 
                              className={`${Styles.dBlock} ${Styles.inter} ${Styles.bannerFirstTitle}`}
                            >
                              Food DELIVERY
                            </Text>
                            <Text color="white" strong="strong7" 
                              className={`${Styles.dBlock} ${Styles.inter} ${Styles.bannerSecondTitle}`}
                            >
                              Food items
                            </Text>
                            <Button className={`${Styles.bannerBtn}`}>Start Now</Button>
                         </div>
                      </div>
                      <div className={`${Styles.homeBannerSlide} ${Styles.relative}`}>
                        <Image src="assets/image/food-items.png" alt="food image" className={Styles.w100} />
                        <div className={`${Styles.bannerContentWrapper}`}>
                            <Text color="white" strong="strong4" 
                              className={`${Styles.dBlock} ${Styles.inter} ${Styles.bannerFirstTitle}`}
                            >
                              Many offers waiting
                            </Text>
                            <Text color="white" strong="strong7" 
                              className={`${Styles.dBlock} ${Styles.inter} ${Styles.bannerSecondTitle}`}
                            >
                              50% OFF
                            </Text>
                            <Button className={`${Styles.bannerBtn}`}>Start Now</Button>
                         </div>
                      </div> */}
              </Slider>
            </div>
            <div className={`${Styles.homeBannerBtn}`}>
              <Button variant="redBtn" className={`${Styles.w100}`}>
                Sell new product
              </Button>
              <Button variant="redBtn" className={`${Styles.w100}`}>
                Sell used product
              </Button>
              <Button variant="redBtn" className={`${Styles.w100}`}>
                Advertise your service
              </Button>
              <div className={`${Styles.discountBox} ${Styles.centerAlign}`}>
                <Text
                  color="white"
                  strong="strong5"
                  variant="lgText"
                  className={`${Styles.mAuto}`}
                >
                  Become a driver
                  <br /> and get <Text strong="strong7">10%</Text> discount
                </Text>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${Styles.center} ${Styles.SearchBar} ${Styles.centerAlign}`}
        >
          <div
            className={`${Styles.SearchBarCard} ${Styles.w100} ${Styles.mAuto} ${Styles.alignBetween} ${Styles.alignItemsCenter}`}
          >
            <Autocomplete
              forcePopupIcon={false}
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              onInputChange={handleSearch}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Classifieds and services"
                  disableClearable={true}
                />
              )}
            />
            <Text
              variant="smlgText"
              color="black"
              strong="strong4"
              className={`${Styles.dBlock} ${Styles.allCategory}`}
            >
              All category
            </Text>
          </div>
        </div>

        <div className={`${Styles.ctegoryCardWrapper}`}>
          <div className={`${Styles.center}`}>
            <div className={`${Styles.categoryName}`}>
              <Text
                color="black"
                strong="strong6"
                className={`${Styles.categoryTitel} ${Styles.inter}`}
              >
                Popular cuisines
              </Text>
            </div>
            <div className={`categorySliderArrow ${Styles.cateGorySlide}`}>
              <Slider {...cateGorysettings}>
                {loading ? ( // Conditional rendering based on loading state
                  <Loader /> // Show loader while loading
                ) : (
                  allCategory.map((item) => {
                    return (
                      <SlideCard
                        to={`/category/${item.id}/${item.name}`}
                        src={item.banner}
                        product={item.name}
                      />
                    );
                  })
                )}
                {/* <SlideCard to={"#"} src="assets/image/category/burger.png" product="Burger " />
                    <SlideCard to={"#"} src="assets/image/category/pizza.png" product="Pizza" />
                    <SlideCard to={"#"} src="assets/image/category/paratha.png" product="Paratha" />
                    <SlideCard to={"#"} src="assets/image/category/burger.png" product="Burger" />
                    <SlideCard to={"#"} src="assets/image/category/pizza.png" product="Pizza" />
                    <SlideCard to={"#"} src="assets/image/category/paratha.png" product="Paratha" />
                    <SlideCard to={"#"} src="assets/image/category/burger.png" product="Burger" />
                    <SlideCard to={"#"} src="assets/image/category/pizza.png" product="Pizza" />
                    <SlideCard to={"#"} src="assets/image/category/paratha.png" product="Paratha" /> */}
              </Slider>
            </div>
          </div>
        </div>

        <div className={`${Styles.ctegoryCardWrapper}`}>
          <div className={`${Styles.center}`}>
            <div className={`${Styles.categoryName}`}>
              <Text
                color="black"
                strong="strong6"
                className={`${Styles.categoryTitel} ${Styles.inter}`}
              >
                Store in top categories
              </Text>
            </div>
            <div className={`categorySliderArrow ${Styles.cateGorySlide}`}>
              <Slider {...cateGorysettings}>
                {loading ? ( // Conditional rendering based on loading state
                  <Loader /> // Show loader while loading
                ) : (
                  allCategory2.map((item) => {
                    return (
                      <SlideCard
                        to={`/top-product/${item.id}`}
                        src={item.banner}
                        product={item.name}
                      />
                    );
                  })
                )}
                {/* <SlideCard to={"#"} src="assets/image/category/watch.png" product="Smart watches" />
                    <SlideCard to={"#"} src="assets/image/category/laptop.png" product="Laptops" />
                    <SlideCard to={"#"} src="assets/image/category/camera.png" product="GoPro cameras " />
                    <SlideCard to={"#"} src="assets/image/category/headphone.png" product="Headphones" />
                    <SlideCard to={"#"} src="assets/image/category/canon.png" product="Canon camreras" />
                    <SlideCard to={"#"} src="assets/image/category/boat.png" product="boAt Airdopes" />
                    <SlideCard to={"#"} src="assets/image/category/watch.png" product="Smart watches" />
                    <SlideCard to={"#"} src="assets/image/category/laptop.png" product="Laptops" />
                    <SlideCard to={"#"} src="assets/image/category/camera.png" product="GoPro cameras " /> */}
              </Slider>
            </div>
          </div>
        </div>

        <div className={`${Styles.ctegoryCardWrapper}`}>
          <div className={`${Styles.center}`}>
            <div className={`${Styles.categoryName}`}>
              <Text
                color="black"
                strong="strong6"
                className={`${Styles.categoryTitel} ${Styles.inter}`}
              >
                local brand Service
              </Text>
            </div>
            <div className={`categorySliderArrow ${Styles.cateGorySlide}`}>
              <Slider {...cateGorysettings}>
                {loading ? ( // Conditional rendering based on loading state
                  <Loader /> // Show loader while loading
                ) : (
                  allCategory4Data.map((item) => {
                    return (
                      <SlideCard
                        to={`#`}
                        src={item.image}
                        product={item.name}
                      />
                    );
                  })
                )}
                {/* <SlideCard to={"#"} src="assets/image/category/watch.png" product="Smart watches" />
                    <SlideCard to={"#"} src="assets/image/category/laptop.png" product="Laptops" />
                    <SlideCard to={"#"} src="assets/image/category/camera.png" product="GoPro cameras " />
                    <SlideCard to={"#"} src="assets/image/category/headphone.png" product="Headphones" />
                    <SlideCard to={"#"} src="assets/image/category/canon.png" product="Canon camreras" />
                    <SlideCard to={"#"} src="assets/image/category/boat.png" product="boAt Airdopes" />
                    <SlideCard to={"#"} src="assets/image/category/watch.png" product="Smart watches" />
                    <SlideCard to={"#"} src="assets/image/category/laptop.png" product="Laptops" />
                    <SlideCard to={"#"} src="assets/image/category/camera.png" product="GoPro cameras " /> */}
              </Slider>
            </div>
          </div>
        </div>

        <div className={`${Styles.ctegoryCardWrapper}`}>
          <div className={`${Styles.center}`}>
            <div className={`${Styles.categoryName}`}>
              <Text
                color="black"
                strong="strong6"
                className={`${Styles.categoryTitel} ${Styles.inter}`}
              >
                Classifieds and services
              </Text>
            </div>
            <div className={`categorySliderArrow ${Styles.cateGorySlide}`}>
              <Slider {...cateGorysettings}>
                {loading ? ( // Conditional rendering based on loading state
                  <Loader /> // Show loader while loading
                ) : (
                  allCategory3.map((item) => {
                    return (
                      <SlideCard
                        to={`/classified-product/${item.id}`}
                        src={item.image}
                        product={item.name}
                      />
                    );
                  })
                )}
                {/* <SlideCard to={"#"} src="assets/image/category/cars.png" product="Cars" />
                    <SlideCard to={"#"} src="assets/image/category/mobiles.png" product="Mobiles" />
                    <SlideCard to={"#"} src="assets/image/category/bikes.png" product="Bikes" />
                    <SlideCard to={"#"} src="assets/image/category/furniture.png" product="Furniture" />
                    <SlideCard to={"#"} src="assets/image/category/electronics.png" product="Electronics" />
                    <SlideCard to={"#"} src="assets/image/category/sports.png" product="Sports" />
                    <SlideCard to={"#"} src="assets/image/category/cars.png" product="Cars" />
                    <SlideCard to={"#"} src="assets/image/category/mobiles.png" product="Mobiles" />
                    <SlideCard to={"#"} src="assets/image/category/bikes.png" product="Bikes" /> */}
              </Slider>
            </div>
          </div>
        </div>

        <div className={`${Styles.center} ${Styles.getVoucherWrapper}`}>
          <div className={`${Styles.row}`}>
            <div className={`${Styles.col50} ${Styles.voucherContentBox}`}>
              <Text
                color="black"
                strong="strong9"
                className={`${Styles.dBlock} ${Styles.downloadVoucherText}`}
              >
                DOWNLOAD APP & GET THE VOUCHER!
              </Text>
              <Text
                color="black"
                strong="strong5"
                className={`${Styles.dBlock} ${Styles.getOff}`}
              >
                Get 30% off for first transaction using local brand mobile app
                for now.
              </Text>
              <div>
                <Link to="https://play.google.com/store/apps/details?id=com.local_brand.userapp" target="_blank" className={`${Styles.mr20}`}>
                  <Image src="assets/image/appleBlack.png" alt="apple store" />
                </Link>
                <Link to="https://play.google.com/store/apps/details?id=com.local_brand.userapp" target="_blank">
                  <Image
                    src="assets/image/playStoreBlack.png"
                    alt="google store"
                  />
                </Link>
              </div>
            </div>

            <div className={`${Styles.col50} ${Styles.imgApp}`}>
              <Image
                src="assets/image/appmobile.png"
                alt="mobile image"
                className={`${Styles.mAuto} ${Styles.dBlock} ${Styles.w100}`}
              />
            </div>
          </div>
        </div>

        <div className={`${Styles.center} ${Styles.serviceWrapper}`}>
          <div className={`${Styles.row} ${Styles.justifyContentCenter}`}>
            <div className={`${Styles.col4}`}>
              <div
                className={`${Styles.serviceCard} ${Styles.mAuto} ${Styles.textCenter}`}
              >
                <div
                  className={`${Styles.serviceImgWrapper} ${Styles.centerAlign} ${Styles.mAuto}`}
                >
                  <div
                    className={`${Styles.serviceImgbox} ${Styles.centerAlign}`}
                  >
                    <Image
                      src="assets/image/icon/delivery.png"
                      alt="delivery"
                    />
                  </div>
                </div>
                <Text
                  color="black"
                  strong="strong6"
                  className={`${Styles.dBlock} ${Styles.ServicTitle}`}
                >
                  FREE AND FAST DELIVERY
                </Text>
                <Text color="black" strong="strong4" variant="smText">
                  Free delivery for all orders over $140
                </Text>
              </div>
            </div>
            <div className={`${Styles.col4}`}>
              <div
                className={`${Styles.serviceCard} ${Styles.mAuto} ${Styles.textCenter}`}
              >
                <div
                  className={`${Styles.serviceImgWrapper} ${Styles.centerAlign} ${Styles.mAuto}`}
                >
                  <div
                    className={`${Styles.serviceImgbox} ${Styles.centerAlign}`}
                  >
                    <Image
                      src="assets/image/icon/customer-service.svg"
                      alt="customer-servicey"
                    />
                  </div>
                </div>
                <Text
                  color="black"
                  strong="strong6"
                  className={`${Styles.dBlock} ${Styles.ServicTitle}`}
                >
                  24/7 CUSTOMER SERVICE
                </Text>
                <Text color="black" strong="strong4" variant="smText">
                  Friendly 24/7 customer support
                </Text>
              </div>
            </div>
            <div className={`${Styles.col4}`}>
              <div
                className={`${Styles.serviceCard} ${Styles.mAuto} ${Styles.textCenter}`}
              >
                <div
                  className={`${Styles.serviceImgWrapper} ${Styles.centerAlign} ${Styles.mAuto}`}
                >
                  <div
                    className={`${Styles.serviceImgbox} ${Styles.centerAlign}`}
                  >
                    <Image src="assets/image/icon/secure.png" alt="secure" />
                  </div>
                </div>
                <Text
                  color="black"
                  strong="strong6"
                  className={`${Styles.dBlock} ${Styles.ServicTitle}`}
                >
                  MONEY BACK GUARANTEE
                </Text>
                <Text color="black" strong="strong4" variant="smText">
                  We reurn money within 30 days
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
