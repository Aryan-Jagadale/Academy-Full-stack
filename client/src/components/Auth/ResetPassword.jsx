import React from "react";
import Button from "../Button/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../redux/actions/profile";
import { toast } from "react-hot-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const {  message, error } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(params.token,password);
    dispatch(resetPassword(params.token, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/login");
    }
  }, [dispatch, error, message,navigate]);

  return (
    <div className="p-7 h-[85vh]">
      <div className="mb-6  text-xl text-center font-semibold ">
        Reset password
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-xl m-auto">
        <div className="col-span-2 lg:col-span-1">
          <input
            type="text"
            className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="col-span-2 text-left">
          <Button text={"Reset password"} onClick={submitHandler} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
