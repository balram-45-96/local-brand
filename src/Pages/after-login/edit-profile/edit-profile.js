import React, { useEffect, useState } from "react";
import Styles from './edit-profile.module.scss';
import { Layout } from "../../../components/common";
import { Text, Input, Button} from "../../../components/shared";
import { updateUserProfileApi } from "../../../service/editProfile";
import { useSelector } from "react-redux";
// import { updateUserProfileApi } from "../../../service/user"; // Import the API function for updating user profile

const EditProfile = () => {
  const auth = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: auth.user.name,
    phone: auth.user.phone,
    email: auth.user.email,
    address: auth.user.selected_address,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
   try {
     setSaving(true);
     // Validate if newPassword matches confirmNewPassword
     if (formData.newPassword !== formData.confirmNewPassword) {
       throw new Error("New password and confirm password do not match");
     }

     const data = {
      "name":formData.firstName,
      "phone":formData.phone,
      "selected_address":formData.address,
      "latitude":auth.myLat,
      "longitude":auth.myLon,
      "address":formData.address,
      "wishList":"1",
      "id":auth.user.id
    }

     // Call API function to update user profile with formData
     await updateUserProfileApi(data);
    console.log('data: ', data);
     alert('Profile updated successfully!');
   } catch (error) {
     alert(error.message || 'Failed to update profile. Please try again.');
   } finally {
     setSaving(false);
   }
 };
  return (
    <Layout>
        <div className={`${Styles.EditProfileWrapper}`}>
           <div className={`${Styles.pageWrapper}`}>
           <Text strong="strong7" color="black" className={`${Styles.pageTitel}`}>
               Edit Your Profile
            </Text>
            <div className={`${Styles.formWrapper}`}>
               <div className={`${Styles.inputRowWrapper}`}>
                  <div className={`${Styles.inputBox}`}>
                     <Input 
                       placeholder="First Name" 
                       type="text" 
                       variant="secondaryInput" 
                       className={`${Styles.w100}`} 
                       name="firstName"
                       value={formData.firstName}
                       onChange={handleChange}
                     /> 
                  </div>
                  <div className={`${Styles.inputBox}`}>
                     <Input 
                       placeholder="phone" 
                       type="number" 
                       variant="secondaryInput" 
                       className={`${Styles.w100}`} 
                       name="phone"
                       value={formData.lastName}
                       onChange={handleChange}
                     /> 
                  </div>
               </div>

               <div className={`${Styles.inputRowWrapper}`}>
                  <div className={`${Styles.inputBox}`}>
                     <Input 
                       placeholder="Email" 
                       type="text" 
                       variant="secondaryInput" 
                       className={`${Styles.w100}`} 
                       name="email"
                       value={formData.email}
                       onChange={handleChange}
                     /> 
                  </div>
                  <div className={`${Styles.inputBox}`}>
                     <Input 
                       placeholder="Address" 
                       type="text" 
                       variant="secondaryInput" 
                       className={`${Styles.w100}`} 
                       name="address"
                       value={formData.address}
                       onChange={handleChange}
                     /> 
                  </div>
               </div>

               <div className={`${Styles.inputRowWrapper} ${Styles.passwordWrapper}`}>
                  <div className={`${Styles.inputBox} ${Styles.w100}`}>
                     <label>Password Changes</label>
                     <Input 
                       placeholder="Current Password" 
                       type="password" 
                       variant="secondaryInput" 
                       className={`${Styles.w100}`} 
                       name="currentPassword"
                       value={formData.currentPassword}
                       onChange={handleChange}
                     /> 
                  </div>
                  <div className={`${Styles.inputBox}`}>
                     <Input 
                       placeholder="New Password" 
                       type="password" 
                       variant="secondaryInput" 
                       className={`${Styles.w100}`} 
                       name="newPassword"
                       value={formData.newPassword}
                       onChange={handleChange}
                     /> 
                  </div>
                  <div className={`${Styles.inputBox}`}>
                     <Input 
                       placeholder="Confirm New Password" 
                       type="password" 
                       variant="secondaryInput" 
                       className={`${Styles.w100}`} 
                       name="confirmNewPassword"
                       value={formData.confirmNewPassword}
                       onChange={handleChange}
                     /> 
                  </div>
               </div>

               <div className={`${Styles.btnWrapper} ${Styles.dFlex}`}>
                  <Button 
                    variant="textBtn" 
                    className={`${Styles.textBtn}`} 
                    onClick={() => window.history.back()} // Go back to previous page
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="redBtn" 
                    className={`${Styles.redButton}`} 
                    onClick={handleSaveChanges} // Call handleSaveChanges function on click
                    disabled={saving} // Disable button while saving
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
               </div>
            </div>

           </div>
        </div>
        
   </Layout>
  );
};

export default EditProfile;
