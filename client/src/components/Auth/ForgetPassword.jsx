import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../redux/actions/profile";
import { toast } from "react-hot-toast";
import { useEffect } from "react";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email);
    dispatch(forgetPassword(email));
  };

  const { message, error } = useSelector(state => state.profile);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <div className="p-7 h-[85vh]">
      <div className="mb-6  text-xl text-center font-semibold ">
        Forget password
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-xl m-auto">
        <div className="col-span-2 lg:col-span-1">
          <input
            type="email"
            className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-span-2 text-left">
          <Button text={"Send Reset Link"} onClick={submitHandler} />

          <button className="text-center text-gray-800 bg-white-700 hover:underline  font-medium rounded-lg ml-5 mb-2 ">
            <Link to={"/login"}>Go back</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
