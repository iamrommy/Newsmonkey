import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"

import { changePassword } from "../services/operations/authAPI"
import IconBtn from "./IconBtn"
import toast from "react-hot-toast"

export default function UpdatePassword() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    // console.log("password Data - ", data)
    data.email = user.email;
    try {
      const res = await changePassword(data)
      if(res){
        reset({
            oldPassword: "",
            newPassword: ""
        })
      }
    } catch (error) {
      // console.log("ERROR MESSAGE - ", error.message)
      toast.error('Error updating password');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-2 border-black p-8 px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start lg:items-center">
            <h2 className="text-lg font-semibold">Update Password</h2>
            <div className="text-[12px] flex flex-col xs:flex-row sm:flex-col lg:flex-row">
              <p>Don't remember Current Password?&nbsp;</p><Link to="/reset-password" className="text-blue-600 text-[13px] hover:underline ">Reset Password</Link>
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="border-[1px] border-black p-1 rounded-lg"
                {...register("oldPassword", { required: true })}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-red-600">
                  Please enter your Current Password.
                </span>
              )}
            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                className="border-[1px] border-black p-1 rounded-lg"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                {...register("newPassword", { required: true })}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-red-500">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
         <div className="flex justify-end gap-2">
         <button
             onClick={() => {
             navigate("/dashboard/my-profile")
             }}
             className="cursor-pointer rounded-md py-2 px-5 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 font-semibold"
         >
             Cancel
         </button>
         <IconBtn type="submit" text="Update" customClasses="bg-yellow-300  hover:bg-yellow-400 active:bg-yellow-500" />
         </div>
        </div>
      </form>
    </>
  )
}