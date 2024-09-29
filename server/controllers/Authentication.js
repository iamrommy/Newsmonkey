const User = require('../models/User');
const OTP = require('../models/OTP');

const { uploadImageToCloudinary } = require('../utils/imageUploader');
const { deleteImageFromCloudinary } = require('../utils/deleteImage');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const crypto = require('crypto');

require('dotenv').config();

//send otp
exports.sendOTP = async(req, res) =>{
    try{
        //fetch email from req body
        const {email} = req.body;

        //check if user already exists
        const checkUserPresent = await User.findOne({email:email});
        //if user already exists then return 
        
        if(checkUserPresent?.googleId){
            return res.json({
                success:false,
                message:"User already exists with google signup"
            });
        }

        if(checkUserPresent){
            return res.json({
                success:false,
                message:"User already exists"
            });
        }

        //generate otp
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        let result = await OTP.findOne({otp: otp});

        while(result){ //this brute force approach of checking again and again that wether this otp exists in DB or not is not good. Must use something else 
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result = await OTP.findOne({otp: otp});

        }
        console.log('OTP generated : ',otp);
        
        const otpPayload = {email, otp};

        // create an entry for otp in DB
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return response successfull
        return res.status(200).json({
            success: true,
            message: "OTP generated successfully",
            otp
        });
    }
    catch(error){
        console.log("Error in otp generation", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//SignUp controller for registering users
exports.signUp = async (req, res)=>{
    try{
        //data fetch from request's body
        const {
            email,
            username,
            password,
            otp
        } = req.body;

        //validate data
        if(!username || !email || !password || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are not present"
            });
        }

        //check user already exists or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User is already registered'
            });
        }

        //find most recent otp for the user
        const response = await OTP.find({email:email}).sort({createdAt:-1}).limit(1);
        console.log('this is response', response);

        //validate OTP
        if(response.length === 0){
            //OTP not found
            return res.json({
                success:false,
                message:"OTP not valid",
            });
        }
        else if(otp !== response[0].otp){
            //Invalid OTP
            return res.json({
                success:false,
                message:"Invalid OTP"
            });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create entry in DB

        let user = await User.create({
            username,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${username}`,
            preferedCountry: 'us'
        });

        user = await User.findById(user._id);
        
        return res.status(200).json({
            success:true,
            message:'User is registered successfully',
            user,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "User cannot be registered please try again",
        });
    }
};

//log in
exports.logIn = async (req, res)=>{
    try{
        //get data from user 
        const {email, password} = req.body;

        //validate data
        if(!email || !password){
            return res.status(403).json({
                success: false,
                message: 'All fields are required, please try again'
            });
        }

        //user check exist or not
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"User is not registered, please try again"
            });
        }

        //if the user has a google signed up account then it will not have a password
        if(!user.password){
            return res.json({
                success:false,
                message:"User has a google account with no password, Log in with google"
            });
        }

        // console.log(password, user.password);
        //Match password and generate JWT 
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
            }
            const token = JWT.sign(payload, process.env.JWT_SECRET, {
                // expiresIn: "3h",            
            })

            user.token = token;
            user.password = undefined
            
            //create cookie
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            
            res.cookie('token', token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully'
            });
        }
        else{ //password not matched
            return res.json({
                success: false,
                message: 'Password is incorrect'
            });
        }

    }
    catch(error){
        console.log('Error in Log in ',error);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again'
        });
    }
};

exports.myProfile = async(req, res)=>{
    res.status(200).json({
        success: true,
        user: req.user,
    });
}

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
      if (err) {
        res.json({
            success:false,
            message:"Error logging out"
        })
      }
  
      const isDevelopment = process.env.NODE_ENV === "development";
      
      res.clearCookie("connect.sid", {
        secure: !isDevelopment,
        httpOnly: !isDevelopment,
        sameSite: isDevelopment ? false : "none",
      });
      
      res.status(200).json({
        success:true,
        message: "Logged Out",
      });
    });
  };
  
exports.updateProfilePicture = async(req, res)=>{
    try{
        //fetch data
        const profilePicture = req.files.displayPicture;
        const email = req.body.email;

        //validation
        const supportedTypes = ['jpg', 'jpeg', 'png'];
        const fileType = profilePicture.name.split('.')[1].toLowerCase();
        //if file formated is not supported
        if(!supportedTypes.includes(fileType)){
            return res.json({
                success: false,
                message: 'File format not supported'
            });
        }
        
        //file Upload
        const image = await uploadImageToCloudinary(
            profilePicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        // console.log(image);
        
        if(req.body.image && req.body.image.includes('cloudinary')){
            const Cloudinaryres = await deleteImageFromCloudinary(req.body.image ,process.env.FOLDER_NAME);
            console.log(Cloudinaryres);
        }

        //url update in DB
        const updatedProfile = await User.findOneAndUpdate(
            { email: email },
            { image: image.secure_url },
            { new: true }
        );

        //return response
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        });
    }
    catch(error){
        console.log('Error in updating Profile picture', error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

exports.removeProfilePicture = async(req, res)=>{
    try{
        //fetch id
        const email = req.body.email;
        
        //get user details
        const userDetails = await User.findOne({email : email});
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        //delete user image from cloudinary
        if(userDetails.image.includes('cloudinary')){
            const  response = await deleteImageFromCloudinary(userDetails.image ,process.env.FOLDER_NAME);
            console.log(response);
        }

        userDetails.image = `https://api.dicebear.com/5.x/initials/svg?seed=${userDetails.username}`;
        await userDetails.save();

        res.json({
            success: true,
            message: 'User image is removed successfully',
            user: userDetails
        });
    }
    catch(error){
        console.log('Error in removing Profile picture', error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.setPreferedCountry = async(req, res)=>{
    try{
        //fetch id
        const email = req.body.email;
        const country = req.body.country;
        //get user details
        const userDetails = await User.findOne({email : email});
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        const user = await User.findOneAndUpdate(
            {email: email},
            {preferedCountry: country}, 
            {new: true}
        )
        res.json({
            success: true,
            message: 'prefered country is set successfully',
            user: user
        });
    }
    catch(error){
        console.log('Error in setting preferd country', error);
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

exports.changePassword = async(req,res)=>{

    try{
        //fetch data
        const {oldPassword, newPassword, email} = req.body;
        //validate data
        if(!oldPassword || !newPassword){
            return res.status(403).json({
                success:false,
                message:'All fields are required, Please try again'
            });
        }

        const user = await User.findOne({email});

        if(!user?.password){
            return res.json({
                success:false,
                message : "Google accounts have No password. Click reset Password to set a Password", 
            });
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isPasswordMatch){
            return res.json({
                success:false,
                message:'Current Password is Wrong, Try again'
            });
        }
    
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        // create entry in DB
        const updatedUserDetails = await User.findOneAndUpdate(
                                    {email: user.email},
                                    {
                                        password: newHashedPassword
                                    },
                                    {new:true}      
                                );

        //send mail
        try{
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                `Password updated successfully for ${updatedUserDetails.username}`
                )
                console.log("Email sent successfully:", emailResponse.response)

        }
        catch(error){
            console.log("error occured while sending mails", error);
            throw error;
        }
        //return response
        return res.json({
            success: true,
            message: 'Your password is updated successfully'
        });

    }
    catch(error){
        console.log('Error in Changing password ', error);
        return res.status(400).json({
            success:true,
            message: error.message
        });
    }   
};

exports.deleteProfile = async(req, res)=>{
    try{
        const email = req.body.email;

        // validation
        const userDetails = await User.findOne({email: email});
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }
        //delete user image from cloudinary
        if(userDetails.image){
            const Cloudinaryres = await deleteImageFromCloudinary(userDetails.image ,process.env.FOLDER_NAME);
            // console.log(Cloudinaryres);
        }

        //delete user
        await User.findOneAndDelete({email: email});

        // return response
        return res.status(200).json({
            success:true,
            message: 'Account deleted Successfully'
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User cannot be deleted successfully'
        });
    }
}

exports.resetPasswordToken = async(req,res)=>{
    try {
        //fetch email from request's body
        const email = req.body.email;
        //check user for this email, email verification
        const user = await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:"Your Email is not registered with us"
            });
        }

        //generate token
        const token = crypto.randomUUID();

        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                                {email:email},
                                                {
                                                    token:token,
                                                    resetPasswordExpires: Date.now() + 5*60*1000,
                                                },
                                                {new:true}
                                            );

        //create url
        const url = `${process.env.FRONTEND_URL}/update-password/${token}`
        //send mail containing the url
        await mailSender(email, 'Reset Password | NewsMonkey', `Your Password Reset Link :${url}`);

        //return response
        return res.json({
            success:true,
            message:'Email sent successfully, please check email and change password',
            url
        });    
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while reset Password mail"
        });
    }

};

//reset password
exports.resetPassword = async (req,res)=>{
    try {
        //data fetch
        const {password, confirmPassword, token} = req.body;

        //validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:'Password not matching'
            });
        }
        //get userdetails from db using token
        const userDetails = await User.findOne({token:token});
        console.log('userDetails', userDetails)
        
        //if no entry - invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"user is invalid"
            });
        }
        
        //token time expired
        if(userDetails.resetPasswordExpires < Date.now() || userDetails === undefined){
            return res.json({
                success:false,
                message:"Token is expired, please regenerate token"
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //update password
        await User.findOneAndUpdate(
            { email: userDetails?.email },
            {
              $set: { password: hashedPassword, token: null },
            },
            { new: true }
        );
          
        //return response
        return res.status(200).json({
            success:true,
            message: 'Password reset successfull'
        });
    
    } 
    catch (error) {
        return res.status(500).json({
            success:false,
            message:'Something went wrong while resetting password'
        });
    }
};