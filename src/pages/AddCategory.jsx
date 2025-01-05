import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../axiosConfig/instance";
import { useEffect, useState } from "react";

export default function AddCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  const goBack = () => {
    navigate(-1);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("يجب ادخال اسم الفئة"),
  });

  useEffect(() => {
    const getCourse = async () => {
      if (courseId) {
        try {
          const res = await axiosInstance.post(`courses/${courseId}`);
          setCourse(res.data);
        } catch (error) {
          if (error.response?.data?.message === "Failed to fetch course") {
            navigate("*");
          } else {
            // toast.error("حدث خطأ أثناء جلب بيانات الكورس.");
          }
        }
      } else {
        setCourse({});
      }
    };
    getCourse();
  }, [courseId, navigate]);

  const handleCourseSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
  
      // Prepare the category data as a JSON object
      const categoryData = {
        name: values.name,
      };
     console.log(categoryData);
     
      // Send a POST request with the JSON payload
      await axiosInstance.post(`products/category`, categoryData);
  
      toast.success("تمت إضافة الفئة بنجاح!");
      navigate("/all_category");
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء حفظ الفئة.");
    } finally {
      setSubmitting(false);
    }
  };
  
  if (course === null) {
    return <div className="text-center mt-24">Loading...</div>;
  }

  return (
    <>
      <div className="mb-4 sm:mb-0">
        {courseId ? (
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            تحرير الفئة
          </h1>
        ) : (
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">  
            إضافة فئة جديدة
          </h1>
        )}
      </div>
      <Formik
        initialValues={{
          name: course.name || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleCourseSubmit(values, { setSubmitting })
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="space-y-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="dark:text-gray-100 block text-base font-medium leading-6 text-gray-900"
                  >
                    اسم الفئة
                  </label>
                  <div className="mt-2">
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="text-indigo-900 bg-violet-200 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                  focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 
                  dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={isSubmitting}
              >
                حفظ
              </button>
              <button
                type="button"
                onClick={goBack}
                className="text-indigo-900 bg-red-400 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                  focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 
                  dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                الغاء
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}
