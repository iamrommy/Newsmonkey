import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../services/operations/authAPI"
import toast from "react-hot-toast"
import { useState } from "react"

export default function DeleteAccount() {
  const { user } = useSelector((state) => state.auth)
  const [click, setClick] = useState(0);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    setClick((prevClick) => prevClick + 1);
    if(click < 2) return;
    try {
      setClick(0);
      dispatch(deleteProfile(user?.email, navigate))
    } catch (error) {
      // console.log("ERROR MESSAGE - ", error.message)
      toast.error('Error deleting account')
    }
  }

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[2px] p-8 lg:px-12 border-black">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl" />
        </div>
        <div className="flex flex-col space-y-3">
          <h2 className="text-lg font-semibold">
            Delete Account
          </h2>
          <div>
            <p>click below button <span className="font-bold">{3 - click}</span> times to delete account</p>
          </div>
          <span className="bg-red-700 text-white border-[1px] border-black cursor-pointer rounded-lg p-2 text-center" onClick={handleDeleteAccount}>
            I want to delete my account.
          </span>
        </div>
      </div>
    </>
  )
}