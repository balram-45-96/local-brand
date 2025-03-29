import React, { useEffect, useRef, useState } from "react";
import Styles from "./header.module.scss";
import { Button, Text, Image } from "../../shared";
import { Link, useNavigate } from "react-router-dom";
import ImageWithText from "../../ImageWithText";
import { useDispatch, useSelector } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { ToastContainer } from "react-toastify";
import { getFavoritesApi } from "../../../service/classifiedProduct";
import { logout, setCardListData, setWishlist } from "../../../redux/AuthRedux/auth";
import { Menu, MenuItem } from "@mui/material";
import store from "../../../redux/store";
import { getCartListApi } from "../../../service/payment";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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


  const getCartList = async () => {
    try {
      const { data } = await getCartListApi(auth?.user?.id);
      if (data.success) {
        dispatch(setCardListData(data.data))
      } else {
        dispatch(setCardListData([]))
      }
    } catch (error) {}
  };
  useEffect(() => {
    if(auth.user.id) {
    getFavorites();
    getCartList();
    }
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/edit-profile");
    handleClose();
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/login");
    handleClose();
  };

  return (
    <div className={Styles.headerWraper}>
        <ToastContainer />
      <div className={`${Styles.statusBarSection}`}>
        <div
          className={`${Styles.statusBarwrapper} ${Styles.w100} ${Styles.alignBetween} ${Styles.mAuto} ${Styles.alignItemsCenter}`}
        >
          <Text color="white">
            Summer Sale For Suits And Free Express Delivery - OFF 50%!
          </Text>
          <div>
            <Button className={`${Styles.shopNowBtn}`}>ShopNow</Button>
          </div>
        </div>
      </div>
      <div className={`${Styles.center}`}>
        <div
          className={`${Styles.row} ${Styles.alignBetween} ${Styles.alignItemsCenter}`}
        >
          <div className={`${Styles.logoBrand} `}>
            <Link to="/">
              <Image src="/assets/image/Logo.png" />
            </Link>
          </div>
          <div className={`${Styles.headerBtnWrapper} ${Styles.centerAlign}`}>
            {auth.token === "" ? (
              <Link
                to="#"
                className={`${Styles.loginRegister} ${Styles.centerAlign}`}
              >
                <span class="material-symbols-rounded">person</span>
                <Link to="/login" style={{ color: "red" }}>
                  Login
                </Link>{" "}
                /
                <Link to="/signup" style={{ color: "red" }}>
                  signup
                </Link>
              </Link>
            ) : (
              <>
              <ImageWithText onClick={handleClick} name={auth?.user?.name || 'Demo'} />
              <div>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfileClick}> <span class="material-symbols-rounded">person</span> Profile</MenuItem>
                <MenuItem onClick={handleLogoutClick}><span class="material-symbols-rounded">logout</span> Logout</MenuItem>
              </Menu>
            </div>
            </>
            )}

            {/* <Link to={"#"} className={`${Styles.loginRegister} ${Styles.centerAlign}`}>
                  <div className={`${Styles.userDP}`}>
                    <Image src="assets/image/user-image.png" alt="user profile" /> 
                  </div>
                  Johan Doe
                </Link> */}
            <Button className={`${Styles.favBtn}`}>
            <Link className={`${Styles.favBtnCounts}`} to={auth.token ? "/wishlist" : "/login"} >
              <span class="material-symbols-rounded">favorite</span>
              {auth?.WishlistDataCount || ''}
               <span className={`${Styles.countsView}`}>5</span>
              </Link>
            </Button>
            <Button>
            <Link className={`${Styles.favBtnCounts}`} to={auth.token ? "/payment" : "/login"} >
              <span class="material-symbols-rounded">shopping_cart</span>
             {auth?.cardList && auth?.cardList?.items?.length > 0 && <span className={`${Styles.countsView}`}>{auth?.cardList && auth?.cardList?.items ? auth?.cardList?.items?.length : 0}</span>} 
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
