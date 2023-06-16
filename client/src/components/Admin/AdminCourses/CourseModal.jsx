import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { RiDeleteBin7Fill } from "react-icons/ri";


function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
  loading,
}) {
  return (
    <div className="flex items-center border p-4 rounded-lg shadow-md justify-between m-2">
      <section>
        <h2>{`#${num} ${title}`}</h2>
        <p>{description}</p>
      </section>

      <button onClick={() => deleteButtonHandler(courseId, lectureId)}>
        <RiDeleteBin7Fill />
      </button>
    </div>
  );
}

const CourseModal = ({
  setShowModal,
  id,
  deleteButtonHandler,
  addLectureHandler,
  courseTitle,
  lectures,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = (e) => {
    if (!title || !description || !video || !videoPrev) {
      return toast.error("Please fill all fields!")
    }
    e.preventDefault();
    addLectureHandler(e, id, title, description, video);
    //console.log(id);
    setShowModal(false);
  };

  return (
    <>
      <div className=" min-w-full justify-center items-center flex overflow-x-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="modal-dialog-scrollable relative w-auto my-6 mx-auto max-w-5xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{courseTitle}</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <div className="grid grid-cols-[500px_minmax(900px,_1fr)_100px]">
                <section>
                  <div>
                    <h4 className="text-sky-800">{id}</h4>
                  </div>
                  <br />
                  <h3>Lectures</h3>
                  {lectures.map((item, i) => {
                    return (
                      <VideoCard
                        key={i}
                        title={item.title}
                        description={item.description}
                        num={i + 1}
                        lectureId={item._id}
                        courseId={id}
                        deleteButtonHandler={deleteButtonHandler}
                      />
                    );
                  })}
                </section>

                <section>
                  <h2>Add lecture</h2>
                  <div>
                    <div className="mb-6">
                      <input
                        type="text"
                        className="form-control block w-[50%] px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="mb-6">
                      <input
                        type="text"
                        className="form-control block w-[50%] px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="mb-6">
                      <input
                        accept="video/mp4"
                        required
                        type={"file"}
                        className="form-control block w-[50%] px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        onChange={changeVideoHandler}
                      />
                    </div>

                    {videoPrev && (
                      <video
                        controlsList="nodownload"
                        controls
                        src={videoPrev}
                        className="h-[25vh] w-1/2 border"
                      ></video>
                    )}

                    <button
                      className="text-blue-500 background-transparent border-blue-500 font-bold uppercase px-6 py-6 hover:font-bold text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={submitHandler}
                    >
                      Upload
                    </button>
                  </div>
                </section>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default CourseModal;
