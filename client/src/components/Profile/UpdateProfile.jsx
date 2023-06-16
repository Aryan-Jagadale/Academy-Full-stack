import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { loadUser, updateProfile } from "../../redux/actions/user";
import { toast } from "react-hot-toast";


const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    if (!email || !name) {
      return toast.error("Please fill all fields!")
    }
    e.preventDefault();
    //console.log(name,email);
    await dispatch(updateProfile(name,email))
    dispatch(loadUser())
    navigate("/profile");
  };

  return (
    <div className="p-7 w-full m-auto h-[85vh]">
      <div className="mb-6  text-xl text-center font-semibold ">
        Update Profile
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-xl m-auto">
        <div className="col-span-2">
          <input
            type="text"
            className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-span-2">
          <input
            type="email"
            className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-span-2 text-left">
          <Button text={"Update"} onClick={submitHandler} />

          <button className="text-center text-gray-800 bg-white-700 hover:underline  font-medium rounded-lg ml-5 mb-2 ">
            <Link to={"/profile"}>Go back</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
