import React, { useEffect, useState } from "react";
import Spinner from './Spinner';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, login} from "../services/operations/authAPI";
import { setLoading } from "../redux/slices/authSlice";

const Login = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const { email, password } = formData;

  const handleOnChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(login(email, password, navigate));
    console.log("email and password after onsubmit, " + email + ", " + password);
  };

  useEffect(() => {
    const fetchProfile = async () => {

      if (!user) {
        dispatch(setLoading(true));
        await dispatch(getProfile());
        dispatch(setLoading(false));
      }
    };
  
    fetchProfile();
    // eslint-disable-next-line
  }, []);
  

  return (
    loading ? (<Spinner/>) : (
      <div className="w-full bg-white p-5 mb-10 flex justify-center">
        <div className="w-full max-w-3xl">
        <div className="mb-6">
          <h1 className="text-4xl font-semibold mb-2 w-[70%]">Login to your account.</h1>
          <p className="text-sm font-medium text-gray-500">Please sign in to your account </p>
        </div>
        <form onSubmit={handleOnSubmit}>
          <label>
            <p className="text-sm font-medium mb-2">
              Email Address
            </p>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email"
              className="w-full border-2 border-gray-100 rounded-[8px] p-4 text-sm mb-5"
              />
          </label>
          <label className="relative">
            <p className="text-sm font-medium mb-2">
              Password
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Password"
              className="w-full border-2 border-gray-100 rounded-[8px] p-4 text-sm"
              />
            <span 
              onClick={() => setShowPassword((prev) => !prev)} 
              className="absolute right-2 top-[105px] z-[10] cursor-pointer"
              >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={19} fill="#000"/>
              ) : (
                <AiOutlineEye fontSize={19} fill="#000"/>
              )}
            </span>
          </label>
          <button className="w-full bg-black p-4 mt-10 mb-4 rounded-full text-white active:bg-gray-700 hover:bg-gray-800" type="submit">Sign In</button>
        </form>

        <div className="relative my-5 h-5 flex justify-center items-center">
            <p className="w-full border-t border-[1px] absolute border-gray-300"></p>
            <span className="absolute text-gray-300 bg-white z-10 px-4">Or sign in with</span>
        </div>
        <a href={`${process.env.REACT_APP_BASE_URL}/api/v1/auth/googlelogin`} className="p-1.5 mx-auto border-2 my-10 rounded-full text-xl border-gray-300 w-min cursor-pointer block">
            <FcGoogle />
        </a>
        <div className="flex justify-center text-sm font-semibold gap-1">
          <span>Don't have an account? </span><Link to="/signup" className="hover:underline cursor-pointer active:text-gray-700 hover:text-gray-800"> Register</Link>
        </div>
        </div>
      </div>
    )
  );
};

export default Login;
