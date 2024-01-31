import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { ImageUpload } from "../../../Utils/ImageUpload";
import { useState } from "react";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";

const Register = () => {
  const { createUser, updateUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [userLoading, setUserLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setUserLoading(true);

    const form = e.target;
    const imageFile = form.image.files[0];
    const imageData = await ImageUpload(imageFile);
    const image = imageData.display_url;
    const name = form.name.value;
    const email = form.email.value;
    const batch = form.batch.value;
    const shift = form.shift.value;
    const roll = form.roll.value;
    const number = form.number.value;
    const password = form.password.value;
    const depertment = form.depertment.value;

    const userInfo = {
      name,
      email,
      image,
      batch,
      shift,
      roll,
      number,
      password,
      depertment,
    };

    createUser(email, password)
      .then((res) => {
        if (res.user) {
          updateUser(name, image)
          .then(() => {
            axiosPublic.post("/users", userInfo).then((res) => {
              console.log(res.data);
              if (res.data.insertedId) {
                setUserLoading(false);
                toast.success("Account Created 👏");
              }
            });
          })
          .catch(error => {
            console.log(error);
            setUserLoading(false)
            toast.error("Something went wrong")
          })
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setUserLoading(false);
          toast.error("Password must be 6 characters");
        } else if (
          error.message === "Firebase: Error (auth/email-already-in-use)."
        ) {
          setUserLoading(false);
          toast.error("Email already in use");
        } else {
          setUserLoading(false);
          toast.error("Something went wrong");
        }
      });
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                Sign Up to Talent Trail!
              </h1>
              <form
                className="space-y-5 md:space-y-5"
                onSubmit={handleFormSubmit}
              >
                <div className="flex gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300  ">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300 ">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium  text-gray-300 ">
                      Batch
                    </label>
                    <input
                      type="number"
                      name="batch"
                      min="0"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your batch"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Shift
                    </label>
                    <input
                      type="text"
                      name="shift"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your shift"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Roll
                    </label>
                    <input
                      type="number"
                      name="roll"
                      min="0"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Academic Roll"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300 ">
                      Number
                    </label>
                    <input
                      type="number"
                      name="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                      Depertment
                    </label>
                    <input
                      type="text"
                      name="depertment"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Depertment"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300 ">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="file-input file-input-bordered dark:bg-gray-500 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full  flex items-center justify-center gap-2 text-white btn btn-outline"
                >
                  {userLoading && (
                    <span className="loading loading-dots loading-md"></span>
                  )}
                  Sign Up
                </button>
                <p className="font-light text-center font-semibold text-gray-500 dark:text-gray-400">
                  Have an account?{" "}
                  <Link className="text-primary" to={"/login"}>
                    Sign In
                  </Link>
                </p>
              </form>
              <div>
                <GoogleSignIn />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
