import React from "react";
import { Link } from "react-router-dom";
import main from "../../assets/main.jpg";
import introVideo from "../../assets/intro.mp4";

const Home = () => {
  return (
    <div className="pt-7">
      <div className="flex-col pl-0 md:pl-7 md:flex md:flex-row">
        <section className="w-full flex items-center justify-center  md:w-1/2 ">
          <div>
            <h1 className="text-4xl text-center font-extrabold md:text-5xl md:text-left">
              Crack Coding Interview with Academy
            </h1>
            <p className="text-base text-center leading-10 mt-3 mb-7 md:text-left">
              Over 8,00,000 learners trust us for online and offline coaching
            </p>

            <div className="text-center md:text-left">
              <button
                type="button"
                className="text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <Link to={"/course"} className="text-base hover:underline">
                  Explore now
                </Link>
              </button>
            </div>
          </div>
        </section>

        <section className="w-full object-contain md:w-1/2">
          <img
            className="w-full h-full hidden md:block"
            src={main}
            alt="hero"
          />
        </section>
      </div>

      {/*Demo section */}
      <div className="bg-blue-100 p-0 pl-0 md:pl-7 md:p-5">
        <section className="flex items-center justify-center flex-col">
          <h4 className="text-3xl text-center font-semibold p-4 pt-3">Watch Free classes online</h4>
          <video
            controls
            controlsList="nodownload nofullscreen noremoteplayback"
            //disablePictureInPicture
            disableRemotePlayback
            className="h-2/4 w-full m-0 md:w-2/4 md:mx-3"
            src={introVideo}
          ></video>
        </section>
      </div>
    </div>
  );
};

export default Home;
