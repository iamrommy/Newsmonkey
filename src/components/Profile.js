import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiLogOut } from "react-icons/fi";
import { logout } from "../services/operations/authAPI";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {user} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center p-6 rounded-lg max-w-2xl w-full mx-auto shadow-2xl">
      <h2 className="text-3xl underline underline-offset-2 font-bold mb-4">Your Profile</h2>
      <img 
        src={`https://api.dicebear.com/5.x/initials/svg?seed=${user?.username}`} 
        alt="Profile Pic" 
        className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-white shadow-2xl"
      />
      <div className="text-center">
        <p className="text-2xl font-semibold mb-6">{user?.username}</p>
        <p className="text-black text-xl">{user?.email}</p>
      </div>
      <div className='border-2 border-white p-1 mt-4 hover:bg-gray-800 hover:text-white active:bg-gray-700 cursor-pointer rounded-lg text-2xl mx-3'>
          <span onClick={()=>dispatch(logout(navigate))} className='flex items-center justify-center gap-2'>Logout <FiLogOut/></span> 
      </div>
    </div>
  );
};

export default Profile;
