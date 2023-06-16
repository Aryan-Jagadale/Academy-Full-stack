import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassowrd } from "../../redux/actions/profile";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import Loader from "../Loader";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    if (!oldPassword || !newPassword) {
      return toast.error("Please fill all fields!")
    }
    e.preventDefault();
    //console.log(oldPassword, newPassword);
    dispatch(changePassowrd(oldPassword, newPassword));
  };

  const { loading, message, error } = useSelector((state) => state.profile);

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
    <>
    {
      loading ? (
        <Loader/>
      ):(
        <div className="p-7 h-screen">
        <div className="mb-6  text-xl text-center font-semibold ">
          Change Password
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-xl m-auto">
          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              className="border-solid border-blue-400 border-2 outline-none p-3 md:text-sm w-full"
              placeholder="Old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <br />
          <div className="col-span-2 lg:col-span-1">
            <input
              type="text"
              className="border-solid border-blue-400 border-2 outline-none p-3 md:text-sm w-full"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="col-span-2 text-left">
            <Button text={"Change"} onClick={submitHandler} />

            <button className="text-center text-gray-800 bg-white-700 hover:underline  font-medium rounded-lg ml-5 mb-2 ">
              <Link to={"/profile"}>Go to profile</Link>
            </button>
          </div>
        </div>
      </div>


      )
    }
      
    </>
  );
};

export default ChangePassword;
