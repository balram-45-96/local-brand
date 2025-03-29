import React from "react";
import Styles from './contact-us.module.scss';
import { Layout } from "../../../components/common";
import { Text, Input, Button} from "../../../components/shared";
import { Link } from "react-router-dom";

const ContactUs = () => {
  
  return (
    <Layout>
        <div className={`${Styles.contactUsWrapper}`}>
           <div className={`${Styles.center}`}>
               <div className={`${Styles.contactRow} ${Styles.alignBetween}`}>
                  <div className={`${Styles.card} ${Styles.contactCard} ${Styles.w100}`}>
                     <div className={`${Styles.cardBox}`}>
                        <div className={`${Styles.dFlex} ${Styles.alignItemsCenter}`}>
                           <div className={`${Styles.contactIcon} ${Styles.centerAlign}`}>
                              <span class="material-symbols-rounded">call</span>
                           </div>
                           <Text color="black" variant="lgText" strong="strong6">Call To Us</Text>
                        </div>
                        <Text color="black" variant="smText" className={`${Styles.dBlock} ${Styles.availabaleText}`}>
                           We are available 24/7, 7 days a week.
                        </Text>
                        <Text color="black" variant="smText" className={`${Styles.dBlock}`}>Phone: 
                           <Link to="tel:+0000000000"><Text color="black" variant="smText">+000 - 0000 - 000</Text></Link>
                        </Text>
                     </div>

                     <div className={`${Styles.dFlex} ${Styles.alignItemsCenter}`}>
                        <div className={`${Styles.contactIcon} ${Styles.centerAlign}`}>
                           <span class="material-symbols-rounded">mail</span>
                        </div>
                        <Text color="black" variant="lgText" strong="strong6">Write To US</Text>
                     </div>
                     <Text color="black" variant="smText" className={`${Styles.dBlock} ${Styles.availabaleText}`}>
                         Fill out our form and we will contact you within 24 hours.
                     </Text>
                     <Text color="black" variant="smText" className={`${Styles.dBlock}`}>Emails:&nbsp; 
                        <Link to="mailto:customer@exclusive.com"><Text color="black" variant="smText">customer@exclusive.com</Text></Link>
                     </Text>
                     <Text color="black" variant="smText" className={`${Styles.dBlock} ${Styles.mt10}`}>Emails:&nbsp; 
                        <Link to="mailto:support@exclusive.com"><Text color="black" variant="smText">support@exclusive.com</Text></Link>
                     </Text>
                      
                  </div>

                  <div className={`${Styles.card} ${Styles.inputCardWrapper} ${Styles.w100}`}>
                     <div className={`${Styles.inputRowWrapper}`}>
                        <div className={`${Styles.inputBox}`}>
                           <Input placeholder="Your Name *" type="text" variant="secondaryInput" className={`${Styles.w100}`}/> 
                        </div>
                        <div className={`${Styles.inputBox}`}>
                           <Input placeholder="Your Email *" type="text" variant="secondaryInput" className={`${Styles.w100}`}/> 
                        </div>
                        <div className={`${Styles.inputBox}`}>
                           <Input placeholder="Your Phone *" type="text" variant="secondaryInput" className={`${Styles.w100}`}/> 
                        </div>
                     </div>

                     <div className={`${Styles.inputRowWrapper} ${Styles.textAreaWrapper}`}>
                        <div className={`${Styles.inputBox}`}>
                           <Input placeholder="Email" type="textarea" variant="secondaryInput" className={`${Styles.w100}`}/> 
                        </div>
                        
                     </div>

                     <div className={`${Styles.btnWrapper} ${Styles.dFlex}`}>
                        <Button variant="redBtn" className={`${Styles.redButton}`}>Save Changes</Button>
                     </div>
                  </div>

               </div>
        
            
           </div>
        </div>
        
   </Layout>
  );
};

export default ContactUs;