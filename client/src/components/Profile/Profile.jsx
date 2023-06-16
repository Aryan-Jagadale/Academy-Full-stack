import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelSubscription,
  loadUser,
  //updateProfilePicture,
} from "../../redux/actions/user";
import { removeFromPlaylist } from "../../redux/actions/profile";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Profile = ({ user }) => {
  const dispatch = useDispatch();

  const {
    //loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector((state) => state.subscription);

  const { message, error } = useSelector((state) => state.profile);

  const removeFromPlaylistHandler = async (id) => {
    console.log(id);
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
  };

  /*const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    //console.log(image);
    const myForm = new FormData();
    myForm.append("file", image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };*/

  const cancelSubscriptionHandler = () => {
    console.log("Cancelled");
    dispatch(cancelSubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch({ type: "clearMessage" });
      dispatch(loadUser());
    }

    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, error, message, subscriptionMessage, subscriptionError]);

  return (
    <div className="bg-white-700 w-full py-10 px-10">
      <div>
        <div className="sm:flex space-x-7 md:items-start items-center">
          <div className="mb-4 h-72 bg-indigo-300 rounded-md border-indigo-500 flex items-center justify-center">
            <img
              className="rounded-md h-full md:w-80 object-contain"
              src={user.avatar.url}
              alt={user.name}
            />
          </div>
          <div>
            <h1 className="text-black-100 text-4xl font-bold my-2">
              {user.name}
            </h1>
            <p className="text-black-100 text-lg tracking-wide mb-1 md:max-w-lg">
              <strong>Email Id</strong>: {user.email}
            </p>

            <p className="text-black-100 text-lg tracking-wide mb-6 md:max-w-lg">
              <strong>Created At</strong>: {user.createdAt.split("T")[0]}
            </p>

            {user.role !== "admin" && (
              <div>
                {user.subscription && user.subscription.status === "active" ? (
                  <p className="text-black-100 text-lg tracking-wide mb-6 md:max-w-lg">
                    <button
                      type="button"
                      onClick={cancelSubscriptionHandler}
                      className="px-6 pt-2.5 pb-2 bg-red-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="download"
                        className="w-3 mr-2"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                        ></path>
                      </svg>
                      Cancel Subscription
                    </button>
                  </p>
                ) : (
                  <Link to="/subscribe">
                    <Button text={"Subscribe"} />
                  </Link>
                )}
              </div>
            )}

            <Link to={"/updateprofile"}>
              <Button text={"Update profile"} />
            </Link>
            <Link to={"/changepassword"}>
              <Button text={"Change password"} />
            </Link>
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="mt-5 text-black-100 text-2xl font-semibold text-center">
          Playlist
        </h2>

        {user.playlist.length > 0 && (
          <div className="mt-2 grid ms:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:space-x-4">
            {user.playlist.map((element, i) => (
              <div
                key={i}
                className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg shadow-md duration-300 hover:scale-105 hover:shadow-lg"
              >
                <img
                  className="h-48 w-full object-cover object-center border p-1"
                  src={element.poster}
                  alt={element.course}
                />
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-medium text-gray-900">
                    {element.course}
                  </h2>
                  <p className="mb-2 text-base dark:text-gray-300 text-gray-700 invisible">
                    Product description goes here.
                  </p>
                  <div className="flex items-center">
                    <Link to={`/course/${element.course}`}>
                      <p className="cursor-pointer inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Watch Now
                      </p>
                    </Link>

                    <button
                      className="ml-auto text-base font-medium text-red-500 cursor-pointer"
                      onClick={() => removeFromPlaylistHandler(element.course)}
                    >
                      <RiDeleteBin7Fill />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {user.playlist.length === 0 && (
          <div className="flex items-center justify-center m-5 h-[25vh]">
            No Playlist Subscribed
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
