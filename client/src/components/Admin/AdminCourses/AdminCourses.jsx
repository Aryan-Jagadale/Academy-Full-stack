import React, { useEffect, useState } from "react";
import { RiDeleteBin7Fill,RiEditLine } from "react-icons/ri";

import CourseModal from "./CourseModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCourses,
  getCourseLectures,
} from "../../../redux/actions/course";
import { toast } from "react-hot-toast";
import { addLecture, deleteCourse, deleteLecture } from "../../../redux/actions/admin";
import Loader from "../../Loader";

const AdminCourses = () => {
  const { courses, lectures } = useSelector((state) => state.course);

  const { loading, error, message } = useSelector((state) => state.admin);

  const [showModal, setShowModal] = useState(false);

  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  const dispatch = useDispatch();

  const coureDetailsHandler = (courseId, title) => {
    //console.log("Handler");
    dispatch(getCourseLectures(courseId));
    setShowModal(true);
    setCourseId(courseId);
    setCourseTitle(title);
  };

  const deleteButtonHandler = (courseId) => {
    //console.log("Delete course", courseId);
    dispatch(deleteCourse(courseId));
  };

  const deleteLectureButtonHandler = async (couresId, lectureId) => {
    //console.log(couresId, lectureId);
    await dispatch(deleteLecture(couresId,lectureId));
    dispatch(getCourseLectures(couresId))

  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);
    //console.log(courseId);
    await dispatch(addLecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));
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

    dispatch(getAllCourses());
  }, [dispatch, error, message]);

  //console.log("Admin", showModal, setShowModal);

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen">
      <h2 className="text-center text-xl">All users</h2>

      <section className="p-10 pb-0">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="pt-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        id
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Poster
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Title
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Category
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Creator
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Views
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Lectures
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((item) => (
                      <Row
                        coureDetailsHandler={coureDetailsHandler}
                        deleteButtonHandler={deleteButtonHandler}
                        key={item._id}
                        item={item}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {showModal ? (
                <>
                  <CourseModal
                    setShowModal={setShowModal}
                    id={courseId}
                    deleteButtonHandler={deleteLectureButtonHandler}
                    courseTitle={courseTitle}
                    addLectureHandler={addLectureHandler}
                    lectures={lectures}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminCourses;

function Row({ item, coureDetailsHandler, deleteButtonHandler, loading }) {
  return (
    <tr className="border-b">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {item._id}
      </td>

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <img
          src={item.poster.url}
          alt={item.poster.url}
          className="rounded-lg border h-[30vh] w-[30vw] object-contain"
        />
      </td>

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.title}
      </td>

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.category}
      </td>

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.createdBy}
      </td>

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.views}
      </td>

      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {item.numOfVideos}
      </td>

      <td>
        <div className="flex items-center justify-evenly">
          <button onClick={() => coureDetailsHandler(item._id, item.title)}>
            <RiEditLine color="blue" />
          </button>

          <button onClick={() => deleteButtonHandler(item._id)}>
            <RiDeleteBin7Fill color="red" />
          </button>
        </div>
      </td>
    </tr>
  );
}
