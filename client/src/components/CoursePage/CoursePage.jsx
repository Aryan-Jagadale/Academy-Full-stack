import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getCourseLectures } from "../../redux/actions/course";
import Loading from "../Loader";

const CoursePage = ({user}) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const { lectures, loading } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== "admin" &&
    (user.subscription === undefined || user.subscription.status !== "active")
  ) {
    return <Navigate to={"/subscribe"} />;
  }




  return loading ? (
    <Loading />
  ) : (
    <div className="grid p-4 grid-cols-2  md:grid-cols-[minmax(500px,_1fr)_300px] md:pl-7 md:pt-7">
      {lectures && lectures.length > 0 ? (
        <>
          <div>
            <video
              width={"100%"}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
              className="border border-blue-800"
            ></video>
            <h4 className="text-3xl text-left font-semibold p-4 pt-3">{`#${
              lectureNumber + 1
            } ${lectures[lectureNumber].title}`}</h4>

            <h5 className="text-2xl text-left font-semibold p-4 pt-2">
              Description
            </h5>
            <p className="text-base text-left pl-4">
              {lectures[lectureNumber].description}
            </p>
          </div>

          <div className="mt-2 md:p-2">
            {lectures.map((element, index) => {
              return (
                <div
                  onClick={() => setLectureNumber(index)}
                  key={element._id}
                  className="shadow-md cursor-pointer border-b-2 text-center p-3 font-medium hover:font-semibold"
                >
                  #{index + 1} {element.title}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h1>No Lectures</h1>
      )}
    </div>
  );
};

export default CoursePage;
