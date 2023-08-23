import { default as Layout } from "@/components/layouts/layout";
import React from 'react';
import { useFormik } from "formik";
import { IssueSchema } from "@/schemas";
import {axios} from 'axios';


const Issues = () => 
{
  let initialValues = {
    subject : "",
    description : "",
    category :""
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: IssueSchema,
        onSubmit: async(values) => {
        //alert(values.subject);
        let jwtToken = 'db53c7351fc1e7abc07b431df8ff8598119ee90adfeb31235e94e45fcc1849294d3f56794571ac4380ffb859b414be5963a7f9ae53f58fb97a0deedb9aba9a11eeb430f4bccab8f1220b18a67f71452d8bad0875f5a0ad35abc293b0da9fbfb8eda6f8fd0b001901d2d2fa78d896fa2455fe2ca8a215b02cffa0b991eb979b50';
        const headers = { 
          'Authorization': `Bearer ${jwtToken}`,
       };
        //axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/tickets`,
        // axios.post(`http://127.0.0.1:1337/api/tickets`,
        //   {
        //     data : {
        //       name : values.subject,
        //       description : values.description,
        //       category : values.category,
        //     }
        //   },
        //   { headers }
        //   ).then( response => {
        //     console.log('issue was succesfully generated',response);
        //     //router.push('/profile');
        //   }).catch( error => {
        //     alert(error.response);
        //     console.log('An error occurred:', error.response);
        //   });

          const ticketInfo = {
                "data":{
                        name : values.subject,
                        description : values.description,
                        category : values.category,
                       }
                }

          const add = await fetch(`http://127.0.0.1:1337/api/tickets`,{
            method: "POST",
            headers:  {
              'Authorization': `Bearer ${jwtToken}`,
              'Accept':'application/json',
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify(ticketInfo)
          })
          const addRes = await add.json();
          console.log('addRes=========',addRes);

      },
    });
    //console.log(errors);
  return (

    <div className="container p-4 flex w-full">
    <figure  className="container overflow-y-auto h-[40rem] sm:h-[36rem]">
    
      <form onSubmit={handleSubmit}>
        <div className="w-full bg-slate-100 rounded-xl p-8 md:p-10">
        <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white" >Raise a service request ticket</h3>
          <div className="mb-6">
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
            <input type="input" id="subject" autoComplete="off" name="subject"
             value={values.subject}
             onChange={handleChange}
             onBlur={handleBlur}
         
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
               dark:focus:border-blue-500" placeholder="..Subject" required />

        {errors.subject && touched.subject ? (
                          <p className="text-xs text-red-500">{errors.subject}</p>
                        ) : null}
          </div>

          <div className="mb-6">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <input type="input" id="category" 
             name="category"
             value={values.category}
             onChange={handleChange}
             onBlur={handleBlur}
            autoComplete="off" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          
          {errors.category && touched.category ? (
                          <p className="text-xs text-red-500">{errors.category}</p>
                        ) : null}
          </div>

          <div className="mb-6">
              <label   htmlFor="description"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
              <textarea id="description" rows="4" 
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              autoComplete="off" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
          
              {errors.description && touched.description ? (
                          <p className="text-xs text-red-500">{errors.description}</p>
                        ) : null}
          </div>
        
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </div>
      </form>
       
    </figure>

    </div>
  )
}

export default Issues

Issues.getLayout = function getLayout(page) {
    return (
        <Layout>{page}</Layout>
    )
}