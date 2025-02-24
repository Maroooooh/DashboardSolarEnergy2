
export default function Image({ image, setImage, imageurl , pageUrl}) {
    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };
    const showImages = () => {
        try {
            return URL.createObjectURL(image);
        } catch (err) {
            if (pageUrl) {
                return imageurl;
            }
        }
    };

    return (
        <div className="col-span-3">
            {!image&&pageUrl &&
                <img
                    src={imageurl}
                    className="rounded w-20"
                    alt="Uploaded"
                />
            }
            <div>

                <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                    الصورة
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    {!image &&
                        <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="image-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600
                                    focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2
                                    hover:text-indigo-500"
                                >
                                    <span>اختر صورة</span>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            </div>
                        </div>}
                    {/* // ) : ( */}
                    {image && <div>
                        <div
                            onClick={() => setImage(null)}
                            role="button"
                            className="absolute rounded p-1 m-3 bg-slate-50"
                        >
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
                        <img
                            src={showImages()}
                            className="rounded w-100"
                            alt="Uploaded"
                        />
                    </div>}
                    {/* // )} */}
                </div>
            </div>
        </div>
    );
}