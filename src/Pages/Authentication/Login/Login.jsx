import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const {logIn} = useAuth();
  const [userLoading, setUserLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUserLoading(true)

    const email = e.target.email.value;
    const password = e.target.password.value;

    logIn(email, password)
    .then(res => {
      if(res.user){
        setUserLoading(false)
        toast.success('Successfully Logged in')
      }
    })
    .catch(error => {
      if(error.message === 'Firebase: Error (auth/invalid-credential).'){
        setUserLoading(false)
        toast.error('Invalid Email or Password')
      }
      setUserLoading(false);
      toast.error("Something went wrong")
    })

  }
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                Sign in to Talent Trail!
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                <div className="flex items-center justify-between">
                  {/* <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-xs"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div> */}
                  <Link
                    href=""
                    className="text-sm text-primary justify-end hover:underline dark:text-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 text-white border btn btn-outline"
                >
                  {userLoading && <span className="loading loading-dots loading-md"></span>}
                  Sign in
                </button>
                <p className="font-semibold font-light text-center text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link className="text-primary" to={"/register"}>
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
