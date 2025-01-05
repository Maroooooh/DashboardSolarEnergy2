import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from "yup";
import axiosInstance from '../axiosConfig/instance';
import { ToastContainer, toast } from 'react-toastify';
import { loggin } from '../store/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Login() {
    const isLoggedIn = useSelector((state) => state.isLoggin.isLoggin);
    const dispatch = useDispatch();
    const navigate= useNavigate()
    const validationSchema = yup.object().shape({
        phonenumber: yup.string().required("يجب ادخال رقم الهاتف")
        });
    useEffect(() => {
        if(isLoggedIn) {
            navigate(`/`)
        }
    }, []);
    const handleLoginSubmit = async (values, { setSubmitting }) => {try {
            setSubmitting(true);
            console.log(values);
            
            const res = await axiosInstance.post(`users/login`, values);
            console.log(res);
            
            localStorage.setItem("token", res.data.token);
            dispatch(loggin());
            navigate("/");
        } catch (error) {
            if (error.response.data) {
                toast.error(error.response.data.message);
            }
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <Formik
                initialValues={{
                    phonenumber: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) =>
                    handleLoginSubmit(values, { setSubmitting })
                }
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4 md:space-y-6">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800
                            dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        تسجيل الدخول
                                    </h1>
                                        <div>
                                            <label
                                                htmlFor="phoneNumberxx"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                            رقم الهاتف
                                            </label>
                                            <Field
                                                type="text"
                                                name="phonenumber"
                                                id="phonenumber"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600
                                            focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                // placeholder="name@company.com"
                                            />
                                            <ErrorMessage
                                                name="phonenumber"
                                                component="div"
                                                className="text-red-600"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                كلمة المرور
                                            </label>
                                            <Field
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="••••••••"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 
                                            focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                required=""
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-red-600"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full text-indigo-900 bg-violet-200 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                                        focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
                                        dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            disabled={isSubmitting}
                                        >
                                            تسجيل الدخول
                                        </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <ToastContainer position="top-right" autoClose={5000} />
        </section>
    );
}