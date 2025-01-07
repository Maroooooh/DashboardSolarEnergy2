import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig/instance";

export default function AllLessons() {
  const token = localStorage.getItem("token");
  const [lessons, setLessons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLesons, setSelectedLesons] = useState(null);
  const getLessons = async () => {
    try {
      const res = await axiosInstance.get(`products/products`);
      //console.log(res.data);

      setLessons(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getLessons();
  }, []);
  const deleteLesson = async (id) => {
    try {
      const res = await axiosInstance.delete(`products/product/${id}`, {});
      toggleModal(null);
      getLessons();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModal = (lesson = null) => {
    setSelectedLesons(lesson);
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            المنتجات
          </h1>
        </div>
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <Link
            to={`/add_product`}
            className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
          >
            <svg
              className="fill-current shrink-0 xs:hidden"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="max-xs:sr-only">اضافة منتج جديد</span>
          </Link>
        </div>
      </div>
      <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
        <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-gray-800 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50">
                <tr>
                  <td className="p-2 whitespace-nowrap font-bold">
                    <div className="">#</div>
                  </td>
                  <td className="p-2 whitespace-nowrap font-bold">
                    <div className="">الاسم</div>
                  </td>
                  <td className="p-2 whitespace-nowrap font-bold">
                    <div className=""> الوصف </div>
                  </td>
                  <td className="p-2 whitespace-nowrap font-bold">
                    <div className="">السعر </div>
                  </td>

                  <td className="p-2 whitespace-nowrap font-bold"></td>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {lessons.map((lesons, index) => {
                  return (
                    <tr key={lesons.id}>
                      <td className="p-2 whitespace-nowrap">{index + 1}</td>
                      <td className="p-2 whitespace-nowrap">{lesons.name}</td>
                      <td className="p-2 whitespace-nowrap">
                        {lesons.description}
                      </td>

                      <td className="p-2 whitespace-nowrap">{lesons.price}</td>
                      <td className="p-2 whitespace-nowrap flex">
                        <Link
                          className="me-3 font-medium text-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
                          to={`/edit_product/${lesons._id}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </Link>
                        <div onClick={() => toggleModal(lesons)} role="button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-5 text-red-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isOpen && selectedLesons && (
        <div
          id="static-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  تأكيد الحذف
                </h3>
                <button
                  type="button"
                  onClick={() => toggleModal(null)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="false"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">اغلق</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  أنت على وشك حذف المنتج {selectedLesons.lessonName}. هل أنت
                  متأكد؟
                </p>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => {
                    deleteLesson(selectedLesons._id);
                  }}
                  className="text-white bg-red-500 hover:bg-red-600 dark:hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:focus:ring-red-800"
                >
                  تأكيد
                </button>
                <button
                  onClick={() => toggleModal(null)}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
