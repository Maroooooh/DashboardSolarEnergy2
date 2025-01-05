import { ErrorMessage, Field, Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import axiosInstance from './../axiosConfig/instance';
import CourseSelect from '../components/CourseSelect';
import LessonSelect from '../components/LessonSelect';
import Question from '../components/Question';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function AddExam() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState('')
  const [isErrors, setIsErrors] = useState(false)
  useEffect(() => {
    const getExam = async () => {
      if (examId) {
        try {
          const res = await axiosInstance.get(`exams/exams/${examId}`);
          setExam(res.data.exam);
        } catch (error) {
          toast.error(error.response.data.message);
          if (error.response.data.message=='Exam not found') {
            navigate(`*`)
        }
        }
      } else {
        setExam({});
      }
    };
    getExam();
  }, [examId]);

  const validationSchema = yup.object().shape({
    title: yup.string().required("يجب ادخال اسم الامتحان"),
    courseId: yup.string().required("يجب اختيار الكورس"),
    lessonId: yup.string().required("يجب اختيار الدرس"),
    duration: yup.string().required("يجب ادخال وقت الامتحان"),
    question: yup.array().of(
      yup.object().shape({
        questionTitle: yup.string().required("يجب ادخال سوال"),
        options: yup.object().shape({
          A: yup.string().required("يجب ادخال الاختيار الاول"),
          B: yup.string().required("يجب ادخال الاختيار الثاني"),
          C: yup.string().required("يجب ادخال الاختيار الثالث"),
          D: yup.string().required("يجب ادخال الاختيار الرابع"),
        }),
        answer: yup.string().oneOf(['A', 'B', 'C', 'D']).required("يجب ادخال الاجابة المناسبة"),
      })
    ),
  });

const formData = new FormData();
const handleExamSubmit = async (values, { setSubmitting }) => {
  try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("courseId", values.courseId);
      formData.append("lessonId", values.lessonId);
      formData.append("duration", values.duration);
      values.question.forEach((question, index) => {
          formData.append(`question[${index}][questionTitle]`, question.questionTitle);
          formData.append(`question[${index}][answer]`, question.answer);
          Object.keys(question.options).forEach(option => {
              formData.append(`question[${index}][options][${option}]`, question.options[option]);
          });
          if (question.questionImage) {
              formData.append(`question[${index}][questionImage]`, question.questionImage);
          }
      });
      examId
          ? await axiosInstance.put(`exams/update/${examId}`, values)
          :
           await axiosInstance.post(`exams/create`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
      navigate("/all_exam");
  } catch (error) {
      setErrors(error.response.data.message)
      setIsErrors(true)
  } finally {
      setSubmitting(false);
  }
};

  if (exam === null) {
    return <div className="text-center mt-24">Loading...</div>;
  }

  return (
    <>
      <div className="mb-4 sm:mb-0">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
          {examId ? "تحرير الامتحان" : "اضافة امتحان جديد"}
        </h1>
      </div>
      {isErrors&&examId&&
      <div className="bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        {errors}
      </div>
      }
      <Formik
        initialValues={{
          title: exam?.title || "",
          courseId: exam?.courseId?._id || "",
          lessonId: exam?.lessonId?._id || "",
          duration: exam?.duration|| "",
          question: exam?.question || [{ questionTitle: "", options: { A: "", B: "", C: "", D: "" }, answer: "" ,questionImage:""}],
        }}
        validationSchema={validationSchema}
        onSubmit={handleExamSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="space-y-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="title" className="block text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                    عنوان الامتحان
                  </label>
                  <Field
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="given-title"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-600" />
                </div>
                <div className="sm:col-span-4">
                  <label htmlFor="title" className="block text-base font-medium leading-6 text-gray-900 dark:text-gray-100">
                    وقت الامتحان
                  </label>
                  <Field
                    id="duration"
                    name="duration"
                    type="number"
                    min={1}
                    autoComplete="given-duration"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                  />
                  <ErrorMessage name="duration" component="div" className="text-red-600" />
                </div>
                <div className="sm:col-span-4 justify-between flex">
                <CourseSelect />
                <LessonSelect />
                </div>
                <Question image={image} setImage={setImage} imageurl={exam} pageUrl={examId}/>
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
                onClick={() => navigate(-1)}
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