import React, { useState } from "react";
import { AiOutlineHome, AiOutlineSearch, AiOutlineSend } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdSpaceDashboard, MdCreateNewFolder } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { GiConvergenceTarget } from "react-icons/gi";

import { Link } from "react-router-dom";
import control from "../../assets/control.png";
import logo from "../../assets/logo.png";

const Sidebar = ({ isAuthenticated = false, user }) => {
  const [open, setOpen] = useState(false);

  const Menus = [
    { title: "Home", src: <AiOutlineHome />, link: "/" },
    { title: "Browse courses", src: <AiOutlineSearch />, link: "/courses" },
    { title: "Request a course", src: <AiOutlineSend />, link: "/request" },
    { title: "Contact us", src: <BsFillTelephoneFill />, link: "/contact" },
   
  ];

  const notAuthMenus = [
    { title: "Home", src: <AiOutlineHome />, link: "/" },
    { title: "Browse courses", src: <AiOutlineSearch />, link: "/courses" },
    
  ];

  const adminMenus = [
    { title: "Dashboard", src: <MdSpaceDashboard />, link: "/admin/dashboard" },
    {
      title: "Create course",
      src: <MdCreateNewFolder />,
      link: "/admin/createcourse",
    },
    { title: "Courses", src: <GiConvergenceTarget />, link: "/admin/courses" },
    { title: "Users", src: <FiUsers />, link: "/admin/users" },
  ];

  /*const user = {
    role: "admin",
  };*/

  return (
    <div
      className={` bg-blue-50 ${
        open ? "w-72" : "w-20 "
      } p-5  pt-8 relative duration-300`}
    >
      <img
        src={control}
        className={` border-dark-black absolute cursor-pointer -right-3 top-9 w-7 
           border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
        alt={"control"}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src={logo}
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
          alt={"logo"}
        />
        <Link to={"/"}>
          <h1
            className={` origin-left  text-xl font-extrabold duration-200 ${
              !open && "scale-0"
            }`}
          >
            Academy
          </h1>
        </Link>
      </div>

      <ul className="pt-6">
        {isAuthenticated
          ? Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 font-medium cursor-pointer hover:bg-light-white  text-base items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <Link to={Menu.link}>
                  <p>{Menu.src}</p>
                </Link>
                <Link to={Menu.link}>
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </Link>
              </li>
            ))
          : notAuthMenus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 font-medium cursor-pointer hover:bg-light-white  text-base items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <Link to={Menu.link}>
                  <p>{Menu.src}</p>
                </Link>
                <Link to={Menu.link}>
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    {Menu.title}
                  </span>
                </Link>
              </li>
            ))}

        {isAuthenticated &&
          user &&
          user.role === "admin" &&
          adminMenus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 font-medium cursor-pointer hover:bg-light-white  text-base items-center gap-x-4 
                    ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <Link to={Menu.link}>
                <p>{Menu.src}</p>
              </Link>
              <Link to={Menu.link}>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
