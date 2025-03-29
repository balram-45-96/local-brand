import React from "react";
import PropTypes from 'prop-types'
import Styles from './layout.module.scss'
import Header from "../header/header";
import Footer from "../footer/footer";

const Layout = ({
  children,
  className
}) => {
  return (
    <div className={`${Styles.layout} ${className}`}>
      <Header />
      <div className={Styles.mainSection}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

export default Layout;
