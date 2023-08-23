import { useState } from 'react';
//import axios from '../../lib/axios';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Layout from '@/components/layouts/layout';

const ForgotPassword = () => {
    const [alert,setAlert] = useState();

    const initialValues = {
        email: ""
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Insert a valid email").required("Please Enter your Email Id")
    });

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        setAlert();

        axios
            .post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/forgot-password`, values)
            .then(response => {
                const message = `Please check your email to reset your password.`;
                setAlert(['success', message]);

                resetForm();
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
        <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='w-full bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800'>
        <Layout>    
        <h1 class="text-xl font-bold leading-tight tracking-tight  text-gray-900 dark:text-white md:text-2xl">Forgot password</h1>
            {/* <h1>Forgot password</h1> */}
            <hr />
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
                    <Form>
                        <div className='md:flex bg-slate-100 rounded-xl p-20 md:p-10'>
                        <div>
                            <div><label htmlFor="email">Email</label></div>
                            <Field  type="email" id="email" name="email" placeholder="Email" class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"/>
                            <div className="text-xs text-red-500"><ErrorMessage name="email" /></div>
                        </div>

                        <div class="flex items-center justify-between md:p-5">&nbsp;</div>

                        <div className='md:p-5'>
                        <button class="w-full rounded-lg bg-blue-700  md:p-2 py-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="submit"
                            disabled={!isValid} >
                            {!isSubmitting && "Send link"}
                            {isSubmitting && "Loading..."}
                        </button>
                        </div>
                        
                        </div>
                        

                        
                    </Form>
                )}
            </Formik>
        </Layout>
        </div>

        </section>
    )
}

export default ForgotPassword;