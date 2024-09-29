import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut, FiUpload } from "react-icons/fi"
import { MdDelete } from "react-icons/md"

import IconBtn from './IconBtn';
import { removeProfilePicture, updateDisplayPicture, setPreferedCountry } from "../services/operations/authAPI"
import { logout } from "../services/operations/authAPI";
import toast from 'react-hot-toast';
import Dropdown from './Dropdown';
import UpdatePassword from './UpdatePassword';
import { useNavigate } from 'react-router-dom';
import DeleteAccount from './DeleteAccount';

const Profile = () => {
  const {user} = useSelector((state)=>state.auth);
  const [country, setCountry] = useState(user?.preferedCountry || 'us');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(true);
  const [whatClicked, setWhatClicked] = useState(null);
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e?.target?.files[0]

    const supportedTypes = ['jpg', 'jpeg', 'png'];
    const fileType = file?.name?.split('.')[1]?.toLowerCase();
    //if file formated is not supported
    if(!supportedTypes.includes(fileType)){
        toast.error('File type not supported');
        return ;
    }

    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
      setIsDisabled(false);
    }
  }
  
  const handleCancel = () => {
    setImageFile(null);
    setPreviewSource(null);
    setIsDisabled(true);

    // Reset the file input element's value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    if(isDisabled){
        toast.error('Select a file first');
        return ;
    }

    try {
      // console.log("uploading...")
      setWhatClicked('Upload');
      setLoading(true)
      dispatch(updateDisplayPicture(user?.email, user?.image, imageFile)).then(() => {
        setImageFile(null);
        setWhatClicked(null);
        setLoading(false)
        setPreviewSource(null)
        setIsDisabled(true);
        // Reset the file input element's value
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      })

    } catch (error) {
      // console.log("ERROR MESSAGE - ", error.message)
      toast.error("Error updating profile picture")
    }
  }

  const handleFileRemove = async()=>{
    try{
        setLoading(true)
        setWhatClicked('Remove')
        await dispatch(removeProfilePicture(user?.email));
        setPreviewSource(null)
        setLoading(false)
        setWhatClicked(null);
        setImageFile(null)
        setIsDisabled(true);
        // Reset the file input element's value
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
    }
    catch(error){
        // console.log("ERROR MESSAGE - ", error.message)
        toast.error('Error removing profile picture')
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile]);

  useEffect(() => {
    if (user?.preferedCountry && user.preferedCountry !== country) {
      dispatch(setPreferedCountry(user?.email, country));
    }
    // eslint-disable-next-line
  }, [country]);

  return (
    <div className="mt-8 mx-4 flex justify-center items-center">
      <div className='w-full max-w-5xl'>
        <div className='flex justify-between'>
          <h1 className="text-3xl font-medium">Your Profile </h1>
          <button onClick={()=>dispatch(logout(navigate))} className='flex items-center justify-center gap-2 bg-black hover:bg-gray-700 active:bg-gray-500 text-white py-1 px-3 rounded-lg'>Logout <FiLogOut/></button>
        </div>
        
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-x-4 gap-y-4 mt-8 border-2 p-4 border-black rounded-lg">
          <div className='flex gap-x-4 items-center justify-center'>
            <img
              src={previewSource || user?.image}
              alt={`profile-${user?.username}`}
              className="aspect-square w-[60px] sm:w-[100px] rounded-full object-cover"
            />
            <div className="space-y-1">
              <p className="text-2xl font-semibold">
                {user?.username}
              </p>
              <p className="text-lg">{user?.email}</p>
            </div>
          </div>
          <div className="space-y-2 text-center lg:text-start">
            <p>Change Profile Picture</p>
            <div className="flex flex-row flex-wrap justify-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={imageFile ? handleCancel : handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md py-2 px-5 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 font-semibold"
              >
                {imageFile ? "Cancel" : "Select"}
              </button>

              <IconBtn
                text={(loading && whatClicked === "Upload") ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                disabled={loading}
                customClasses={"bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500"}
              >
                {!(loading && whatClicked === "Upload") && (
                  <FiUpload className="text-lg" />
                )}
              </IconBtn>
              <IconBtn
                text={(loading && whatClicked === "Remove") ? "Removing..." : "Remove"}
                onclick={handleFileRemove}
                disabled={loading}
                customClasses={"bg-pink-300  hover:bg-pink-400 active:bg-pink-500"}
              >
                {!(loading && whatClicked === "Remove") && (
                  <MdDelete className="text-lg"/>
                )}
              </IconBtn>
            </div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row md:justify-between items-center border-2 gap-y-2 border-black p-4 mt-8 rounded-lg'>
          <p className='text-lg'>Choose Your Prefered Country</p> <Dropdown country={country} setCountry={setCountry}/>
        </div>

        <UpdatePassword/>
        <DeleteAccount/>
      </div>
    </div>
  );
};

export default Profile;
