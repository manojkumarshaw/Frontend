import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";

import { signIn, useSession } from "next-auth/react";
import { loginSchema } from "@/schemas";
import { ToastContainer , toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
const Login = () => {

  const { data: session, status } = useSession();
  //console.log(session,status);
  const router = useRouter();
  const initialValues = {
    identifier: "",
    password: "",
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
  useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async(values) => {
      console.log("🚀 ~ file: login.js:25 ~ onSubmit:async ~ values", values)
      const res = await signIn('credentials',{
        identifier : values.identifier,
        password : values.password,
        ...values,
        redirect: false,
        callbackUrl: `${window.location.origin}/`,

      }).catch(error=> {
         toast.error(error.error);
        console.log("🚀 ~ file: login.js:43 ~ onSubmit: ~ e", error);
         })
        console.log("🚀 ~ file: login.js:58 ~ onSubmit: ~ res", res)

      if(!res.ok){
        toast.error(res.error);
      } 

      if (res.ok) {
         router.replace('/');
          return;
        }
    },
  }); 

  console.log(errors);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
   

      <ToastContainer position="top-center" autoClose={4000}
      limit={0} hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />

      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <Image
          src="/logo.svg"
          alt="Picture of the author"
          width={200}
          height={150}
          className="h-18 w-40"
        />

        <div className=" w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="identifier"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="identifier"
                  id="identifier"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="email|| username"
                  
                  value={values.identifier}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

              {errors.identifier && touched.identifier ? (
                  <p className="text-xs text-red-500">{errors.identifier}</p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  autoComplete="false"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                 {errors.password && touched.password ? (
                  <p className="text-xs text-red-500">{errors.password}</p>
                ) : null}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                     
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/register"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
