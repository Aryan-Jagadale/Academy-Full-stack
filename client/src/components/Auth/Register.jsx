import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../redux/actions/user";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");

  //console.log(name,email,password);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    //console.log(file);
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const dispatch = useDispatch()

  //console.log(image);

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData()

    myForm.append('name',name);
    myForm.append('email',email);
    myForm.append('password',password);
    myForm.append('file',image);

    dispatch(register(myForm))


  }

  return (
    <section className="md:h-full">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">


          {/*Avatar */}
            <div className="flex flex-wrap justify-center">
              <div className="w-6/12 sm:w-4/12 px-4">
                <img
                  src={imagePrev}
                  alt={name}
                  className="shadow rounded-full max-w-full h-auto align-middle border-none"
                />
              </div>
            </div>

            <div className="md:mt-6">
              {/* Name */}
              <div className="mb-6">
                <input
                  type="text"
                  className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <input
                  type="text"
                  className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <input
                  type="text"
                  className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                  //classNameName="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <main className="flex flex-col items-center justify-center bg-gray-100 font-sans py-5">
                <label
                  htmlFor="dropzone-file"
                  className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>

                  <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                    Upload avatar
                  </h2>

                  <p className="mt-2 text-gray-500 tracking-wide">
                    Upload or darg & drop SVG, PNG, JPG or GIF.{" "}
                  </p>

                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={changeImageHandler}
                  />
                </label>
              </main>

              <div className="text-center mt-5 lg:text-left">
                <button
                  type="button"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={submitHandler}
                >
                  Sign up
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Have an account?
                  <Link
                    to="/login"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    {" "}
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
