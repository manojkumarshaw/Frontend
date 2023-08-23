import { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import Layout from '@/components/layouts/layout';
const ResetPassword = () => {
    const { push, query } = useRouter();
    const [alert,setAlert] = useState();

    const initialValues = {
        password: "",
        passwordConfirmation: "",
    }

    const validationSchema = Yup.object({
        password: Yup.string().required("Please Enter Password"),
        passwordConfirmation: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Please Enter Confirm Password"),
    });

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        setAlert();

        values.code = query.code;

        axios
            //.post('auth/reset-password', values)
            .post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/reset-password`, values)
            .then(response => {
                const message = `Your password has been resetted. In a few second you'll be redirected to login page.`;
                setAlert(['success', message]);

                resetForm();
                
                setTimeout(() => { push('/auth/login') }, 5000);
            })
            .catch(error => {
                if ( !error.response.data.message ) {
                    setAlert(['alert', "Something went wrong"])
                } else {
                    const messages = error.response.data.message[0].messages;

                    const list = [];
                    messages.map((message,i) => {
                        let item = "";
                        if (i === 0) item += `<ul>`;
                        
                        item += `<li>${message.id}</li>`;

                        if (i === messages.length - 1) item += `</ul>`
                        list.push(item);
                    });

                    setAlert(['alert', list]);
                }
            })
            .finally(() => {
                setSubmitting(false);
            }); 
    }

    return (
        <>
        <Layout>
            
            {alert && (
                <div style={{ backgroundColor: alert[0] === "success" ? "lightgreen" : "lightcoral" }}>
                    <div dangerouslySetInnerHTML={{ __html: alert[1] }} />
                </div>
            )}
            <br />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => onSubmit(values, { setSubmitting, resetForm })} >
                { ({ isSubmitting, isValid }) => (
                    <Form className=''>
                           <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>Reset password</h1>
                           
                        <div className='md:flex bg-slate-100 rounded-xl p-20 md:p-10'>
                                <div >
                                    <div><label htmlFor="password">Password</label></div>
                                    <Field type="password" id="password" name="password" placeholder="Password" className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"/>
                                    <div className="error text-red-500 text-xs"><ErrorMessage name="password"  /></div>
                                </div>

                                <div className='flex items-center justify-between md:p-5'>&nbsp;<br /></div>

                                <div>
                                    <div><label htmlFor="passwordConfirmation">Repeat Password</label></div>
                                    <Field type="password" id="passwordConfirmation" name="passwordConfirmation" placeholder="Repeat password" className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"/>
                                    <div className="error text-red-500 text-xs"><ErrorMessage name="passwordConfirmation"  /></div>
                                </div>

                                <div className='md:p-5'>
                                    <button class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-small text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        type="submit"
                                        disabled={!isValid} >
                                        {!isSubmitting && "Reset password"}
                                        {isSubmitting && "Loading..."}
                                    </button>
                                    </div>
                        </div>
                        

                        {/* <button 
                            type="submit"
                            disabled={!isValid} >
                            {!isSubmitting && "Reset password"}
                            {isSubmitting && "Loading..."}
                        </button> */}
                      
                        
                    </Form>
                )}
            </Formik>
            </Layout>
        </>
    )
}

export default ResetPassword;