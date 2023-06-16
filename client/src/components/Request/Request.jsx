import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const Request = () => {
  return (
    <div className="p-7 h-screen">

      <div className="mb-6  text-xl text-center font-semibold ">
        Feel free to request
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-xl m-auto">
        <div className="col-span-2 lg:col-span-1">
          <input
            type="text"
            className="border-solid border-blue-400 border-2 outline-none p-3 md:text-sm w-full"
            placeholder="Name"
          />
        </div>

        <div className="col-span-2 lg:col-span-1">
          <input
            type="text"
            className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
            placeholder="Email Address"
          />
        </div>

        <div className="col-span-2">
          <textarea
            cols="30"
            rows="8"
            className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
            placeholder="Message"
          ></textarea>
        </div>

        <div className="col-span-2 text-left">

          <Button text={"Submit"} />

          <button className="text-center text-gray-800 bg-white-700 hover:underline  font-medium rounded-lg ml-5 mb-2 ">
            <Link to={"/courses"}>Avaliable Courses</Link>
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default Request;
