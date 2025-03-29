import React from "react";
import Styles from './footer.module.scss';
import {Button, Text, Image, ListGroup, ListItem, Heading, Input} from '../../shared'
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <div className={Styles.footerWrapper}>
       <div className={`${Styles.center}`}>
         <div className={`${Styles.row} ${Styles.alignBetween}`}>
            <div className={`${Styles.footerCol}`}>
               <Heading headingText="Exclusive" headingType={"h2"} className={`${Styles.footerHeading}`}/>
               <Text variant="lgText" strong={"strong4"} className={`${Styles.dBlock}`}>Subscribe</Text>
               <Text variant="smText" className={`${Styles.dBlock} ${Styles.offText}`}>Get 10% off your first order</Text>
               <div className={`${Styles.relative} ${Styles.emailWraPPER}`}>
                 <Input placeholder="Enter your email" className={`${Styles.footerInput}`}/>
                 <Button variant="textBtn" className={`${Styles.footerSendBtn}`}>
                   <span class="material-symbols-rounded">send</span>
                  </Button>
               </div>
               
            </div>
            <div className={`${Styles.footerCol}`}>
               <Heading headingText="Support" headingType={"h2"} className={`${Styles.footerHeading}`}/>
               <ListGroup>
                  <ListItem>
                    <Link to={'#'}>111 "local brand" multi-vendor</Link>
                  </ListItem>
                  <ListItem>
                   <Link to={'#'}>local@gmail.com</Link>
                  </ListItem>
                  <ListItem>
                    <Link to={'#'}>+000-000-0000</Link>
                  </ListItem>
               </ListGroup>
            </div>
            <div className={`${Styles.footerCol}`}>
               <Heading headingText="Account" headingType={"h2"} className={`${Styles.footerHeading}`}/>
               <ListGroup>
                  <ListItem>
                    <Link to={'#'}> My Account</Link>
                  </ListItem>
                  <ListItem>
                   <Link to={'#'}>Login/Register</Link>
                  </ListItem>
                  <ListItem>
                    <Link to={'#'}>Cart</Link>
                  </ListItem>
                  <ListItem>
                    <Link to={'#'}> Wishlist</Link>
                  </ListItem>
                  <ListItem>
                    <Link to={'#'}>Shop</Link>
                  </ListItem>
               </ListGroup>
            </div>
            <div className={`${Styles.footerCol}`}>
              <Heading headingText="Quick Link" headingType={"h2"} className={`${Styles.footerHeading}`}/>
              <ListGroup>
                  <ListItem>
                    <Link to={'#'}>Privacy Policy</Link>
                  </ListItem>
                  <ListItem>
                   <Link to={'#'}>Terms Of Use</Link>
                  </ListItem>
                  <ListItem>
                    <Link to={'#'}>FAQ</Link>
                  </ListItem>
                  <ListItem>
                    <Link to={'#'}> Contact</Link>
                  </ListItem>
               </ListGroup>
            </div>
            <div className={`${Styles.footerCol}`}>
              <Heading headingText="Download App" headingType={"h2"} className={`${Styles.footerHeading}`}/>
              <Button variant="textBtn">
                <Image src="assets/image/googlePlay.png" alt="google play" />
              </Button>
              <Button variant="textBtn" className={`${Styles.appleStoreBtn}`}>
                <Image src="assets/image/appleStore.png" alt="apple store" />
              </Button>
              <div className={`${Styles.socialMediaBox}`}>
                <ListGroup className={`${Styles.alignBetween} ${Styles.alignItemsCenter}`}>
                  <ListItem>
                    <Link to={"#"}>
                       <Image src="assets/image/facebook.png" alt="facebook" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to={"#"}>
                       <Image src="assets/image/twitter.png" alt="facebook" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to={"#"}>
                       <Image src="assets/image/instagram.png" alt="facebook" />
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to={"#"}>
                       <Image src="assets/image/linkedin.png" alt="facebook" />
                    </Link>
                  </ListItem>
                </ListGroup>
                 
              </div>
            </div>
         </div>
       </div>
    </div>
  );
};

export default Footer;