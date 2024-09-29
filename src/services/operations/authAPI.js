import { toast } from "react-hot-toast"

import { setLoading, setToken, setUser } from "../../redux/slices/authSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  GET_PROFILE,
  LOGOUT_API,
  REMOVE_PROFILE_PICTURE_API,
  UPDATE_DISPLAY_PICTURE_API,
  SET_PREFERED_COUNTRY,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API
} = endpoints;


export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {email})
      
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success);

      const message = response.data.message;

      if(message === "User already exists" || message === "User already exists with google signup"){
        if(message === "User already exists with google signup"){
          toast.error("User already signed up with google");
        }
        else if(message === "User already exists"){
          toast.error("Sign Up Failed, User already Exists");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        return;
      }

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      // console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  username,
  email,
  password,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        username,
        email,
        password,
        otp,
      })

      // console.log("SIGNUP API RESPONSE............", response)

      const message = response.data.message;

      if(message === "Invalid OTP" || message === "OTP not valid"){
       if(message === "Invalid OTP"){
          toast.error("Wrong OTP, Please Try again");
        }
       if(message === "OTP not valid"){
          toast.error("OTP is not valid");
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
        return;
      }

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
      
    } catch (error) {
      // console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email, password) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      // console.log("LOGIN API RESPONSE............", response)

      const message = response.data.message;

      if(message === "User is not registered, please try again" || message === "Password is incorrect" || message === "User has a google account with no password, Log in with google"){
        if(message === "User is not registered, please try again"){
          toast.error("User not registered, Login Failed");
        }
        else if(message === "Password is incorrect"){
          toast.error("Incorrect Password");
        }
        else if(message === "User has a google account with no password, Log in with google"){
          toast.error("User has a google account with no password, Log in with google")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
        return;
      }

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      
      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      dispatch(setUser({ ...response.data.user}))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      // console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function logout() {
  return async(dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("GET", LOGOUT_API); 

      console.log("LOGOUT API RESPONSE............", response)

      const message = response.data.message;

      if(message === "Error logging out"){
        toast.error('Error logging out')
        toast.dismiss(toastId)
        return;
      }

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.dismiss(toastId)
      toast.success('Logged out')
    } catch (error) {
      // console.log("LOGIN API ERROR............", error)
      toast.dismiss(toastId);
      toast.error("Logout Failed")
    }
    
  }
}

export function getProfile() {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("GET", GET_PROFILE); 
      console.log("LOGIN API RESPONSE............", response)

      const message = response.data.message;

      if(message === "not Logged in"){
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return;
      }

      if(!response.data.user){
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return;
      }

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setUser({ ...response.data.user}))
      localStorage.setItem("user", JSON.stringify(response.data.user)) 
    } catch (error) {
      // console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    toast.dismiss(toastId)
  }
}

export function updateDisplayPicture(email, image, displayPicture) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    const formData = new FormData();
    formData.append("email", email);
    formData.append("image", image);
    formData.append("displayPicture", displayPicture);
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type header
          }
        }
      )
      // console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............",response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Picture Updated Successfully")
      dispatch(setUser(response.data.data));

      if (document.cookie.includes('user')) {
        document.cookie = `user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`; // Delete the existing cookie
        document.cookie = `user=${JSON.stringify(response.data.data)}; path=/;`;
      }

      localStorage.setItem('user',  JSON.stringify(response.data.data));

    } catch (error) {
      // console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
      toast.error("Could Not Update Profile Picture")
    }
    toast.dismiss(toastId)
  }
}

export function removeProfilePicture(email) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        REMOVE_PROFILE_PICTURE_API,
        {email}
      )
      // console.log("REMOVE_PROFILE_PICTURE API RESPONSE............",response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Picture Removed Successfully")
      // console.log(response.data.user)
      dispatch(setUser(response.data.user));

      if (document.cookie.includes('user')) {
        document.cookie = `user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`; // Delete the existing cookie
        document.cookie = `user=${JSON.stringify(response.data.user)}; path=/;`;
      }

      localStorage.setItem('user',  JSON.stringify(response.data.user));

    } catch (error) {
      // console.log("REMOVE_PROFILE_PICTURE API ERROR............", error)
      toast.error("Could Not Remove Profile Picture")
    }
    toast.dismiss(toastId);
  }
}

export function setPreferedCountry(email, country) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector(
        "PUT",
        SET_PREFERED_COUNTRY,
        {email, country}
      )
      // console.log("REMOVE_PROFILE_PICTURE API RESPONSE............",response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success(`Prefered Country changed successfully`)
      // console.log(response.data.user)
      dispatch(setUser(response.data.user));

      if (document.cookie.includes('user')) {
        document.cookie = `user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`; // Delete the existing cookie
        document.cookie = `user=${JSON.stringify(response.data.user)}; path=/;`;
      }

      localStorage.setItem('user',  JSON.stringify(response.data.user));

    } catch (error) {
      // console.log("REMOVE_PROFILE_PICTURE API ERROR............", error)
      toast.error("Could Not update prefered country")
    }
    toast.dismiss(toastId)
  }
}

export async function changePassword(formData) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT", CHANGE_PASSWORD_API, formData);
    // console.log("CHANGE_PASSWORD_API API RESPONSE............", response);
    
    const message = response.data.message;
    if(message === "Google accounts have No password. Click reset Password to set a Password" || message === "Current Password is Wrong, Try again"){
        toast.error(message);
        toast.dismiss(toastId);
        return false;
    }

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Password Changed Successfully")
    toast.dismiss(toastId);
    return true;
  } catch (error) {
    // console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error('Error in updating password')
    toast.dismiss(toastId)
    return false;
  }
}

export function deleteProfile(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, {email});
      // console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    } catch (error) {
      // console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  const toastId = toast.loading("Loading...")
  return async(dispatch) => {
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});
      // console.log("RESET PASSWORD TOKEN RESPONSE...", response);

      const message = response.data.message;
      if(message === "Your Email is not registered with us"){
        toast.error(message);
        toast.dismiss(toastId);
        return ;
      }
      
      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
      toast.dismiss(toastId);
    } 
    catch (error) {
      // console.log("RESET PASSWORD TOKEN Error ", error);
      toast.error('Failed to Update Password');
      toast.dismiss(toastId);
    }
  }
}

export function resetPassword(password, confirmPassword, token, navigate){
  const toastId = toast.loading("Loading...")
  return async(dispatch) =>{
    try{
      const response = await apiConnector('POST', RESETPASSWORD_API, {password, confirmPassword, token});

      // console.log("RESET Password RESPONSE ...", response);

      const message = response?.data?.message;
      // console.log(message);
      if(message === "user is invalid" || message === "Token is expired, please regenerate token"){
        toast.error('Session Expired');
        toast.dismiss(toastId);
        navigate('/login');
        return;
      }
      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
      navigate('/login');
      toast.dismiss(toastId);
    }
    catch(error){
      // console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to Reset Password");
      toast.dismiss(toastId);
    }
  }
}