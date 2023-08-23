import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import { registerSchema } from "@/schemas";
import axios from 'axios';
import { useRouter } from "next/router";
const initialValues = {
  name: "",
  email: "",
  password: "",
  code: "",
  phone: "",
  organization: "",
  industry: "",
  termsAndConditions: "",
};

const Register = () => {

  const router = useRouter()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registerSchema,
      onSubmit: (values) => {
        console.log(values);
          //axios.post(`${process.env.STRAPI_BASE_URL}/auth/local/register`,
          //http://localhost:3000/undefined/auth/local/register 404
          axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
          {
            username : values.name,
            email    : values.email,
            password : values.password,
            phone    : values.phone,
            //organization : values.organization,
            industry     : values.industry,
            code         : values.code,
            termsAndConditions : values.termsAndConditions
          }).then( response => {
            alert('Wellcome to new User');
            console.log(response.data.user);
            router.push('/profile');
          }).catch( error => {
            console.log('An error occurred:', error.response);
          });

          
        
      },
    });

  //console.log(errors);
 // console.log();
  return (
    <section className="h-screen w-full border bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto my-4 flex flex-col items-center justify-center px-6 py-8 lg:py-0">
        <Image
          src="/logo.svg"
          alt="Picture of the author"
          width={200}
          height={150}
          className="h-18 w-40"
          priority
        />
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="p-6  sm:p-8 md:space-y-2">
            <h1 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Create your account
            </h1>
            <form className="space-y-2 md:space-y-2" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="focus:ring-primary-600 focus:border-primary-600
                   block w-full rounded-lg border border-gray-300 
                   bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 
                   dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                    dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    autoComplete="off"
                  placeholder="Username"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <p className="text-xs text-red-500">{errors.name}</p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  password
                </label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  id="password"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className="text-xs text-red-500">{errors.password}</p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  placeholder="name@company.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="text-xs text-red-500">{errors.email}</p>
                ) : null}
              </div>
              {/* <div className="flex space-x-2">
                <div className="w-3/12 md:w-1/5 lg:w-1/5">
                  <label
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="code"
                  >
                    Code
                  </label>
                  <input
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    type="number"
                    id="code"
                    name="code"
                    placeholder="+91"
                    value={values.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.code && touched.code ? (
                    <p className="text-xs text-red-500">{errors.code}</p>
                  ) : null}
                </div>
                <div className="w-9/12 md:w-4/5 lg:w-4/5">
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="97XX9-98771"
                    maxLength="10"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />{" "}
                  {errors.phone && touched.phone ? (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  ) : null}
                </div>
              </div> */}
              {/* <div>
                <label
                  htmlFor="organization"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  id="organization"
                  placeholder="Company Name"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  value={values.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.organization && touched.organization ? (
                  <p className="text-xs text-red-500">{errors.organization}</p>
                ) : null}
              </div> */}

              <div className="flex space-x-2">
                <div className="w-7/12 md:w-3/5 lg:w-3/5">
                  <label
                    htmlFor="industry"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Industry
                  </label>
                  <input
                    type="text"
                    name="industry"
                    id="industry"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    value={values.industry}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />{" "}
                  {errors.industry && touched.industry ? (
                    <p className="text-xs text-red-500">{errors.industry}</p>
                  ) : null}
                </div>
                <div className="w-5/12 md:w-2/5 lg:w-2/5">
                  <label
                    htmlFor="countries"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Geography
                  </label>
                  <select
                    id="countries"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option value="Americas">Americas</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Europe">Europe</option>
                    <option value="Middle East/Africa">
                      Middle East/Africa
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="termsAndConditions"
                    aria-describedby="terms"
                    name="termsAndConditions"
                    type="checkbox"
                    className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="termsAndConditions"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                {errors.termsAndConditions && touched.termsAndConditions ? (
                  <p className="text-xs text-red-500">
                    {errors.termsAndConditions}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
