import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const {user} = useSelector((state)=>state.auth);
  
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
    </div>
  );
};

export default Profile;
