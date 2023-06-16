import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Link } from "react-router-dom";
import { getAllCourses } from "../../redux/actions/course";
import { toast } from "react-hot-toast";
import { addToPlaylist } from "../../redux/actions/profile";
import { loadUser } from "../../redux/actions/user";

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
}) => {
  return (
    <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
      <div className=" h-[25vh] border-2 relative flex items-end overflow-hidden rounded-xl">
        <img
          src={
            imageSrc ||
            "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          }
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="mt-1 p-2">
        <h2 className="text-slate-700">{title}</h2>
        <p className="mt-1 text-sm text-slate-400">
          <bold>{description}</bold>
        </p>

        <p className="mt-1 text-sm text-slate-400">
          <strong>{creator}</strong>
        </p>

        <p className="mt-1 text-sm text-slate-400">{lectureCount} lectures</p>

        <p className="mt-1 text-sm text-slate-400">{views} views</p>

        <div className="mt-3 flex items-end justify-between">
          <p className="text-lg font-bold text-blue-500">Watch now</p>

          <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
            <svg
              fill="#fff"
              height="20px"
              width="20px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 471.701 471.701"
              stroke="#3276c3"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1 c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3 l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4 C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3 s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4 c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3 C444.801,187.101,434.001,213.101,414.401,232.701z"></path>{" "}
                </g>{" "}
              </g>
            </svg>

            <button
              className="text-sm"
              onClick={() => addToPlaylistHandler(id)}
            >
              Add to playlist
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const categories = ["Web Dev", "A.I.", "DSA", "Data_Sci"];

  const { loading, courses, error, message } = useSelector(
    (state) => state.course
  );

  const addToPlaylistHandler = async (couseId) => {
    await dispatch(addToPlaylist(couseId));
    dispatch(loadUser());
  };

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [category, keyword, dispatch, error, message]);

  return (
    <div>
      <div className="pt-32  bg-white">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          All Courses
        </h1>
      </div>

      <div className="flex flex-wrap items-center  overflow-x-auto overflow-y-hidden py-10 justify-center   bg-white text-gray-800">
        {categories.map((item) => {
          return (
            <button
              className="flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-gray-500 hover:text-black"
              key={item}
              onClick={() => setCategory(item)}
            >
              <span>{item}</span>
            </button>
          );
        })}
      </div>
      <br />

      <div className="mb-6 w-1/2 m-auto">
        <input
          type="text"
          className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
          placeholder="Search a course"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <section className="py-10 bg-gray-50">
        <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
          {courses.length > 0 ? (
            courses.map((item) => (
              <Course
                key={item._id}
                title={item.title}
                description={item.description}
                views={item.views}
                imageSrc={item.poster.url}
                id={item._id}
                creator={item.createdBy}
                lectureCount={item.numOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
              />
            ))
          ) : (
            <div>Course not found</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
