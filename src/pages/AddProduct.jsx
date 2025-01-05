import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import axiosInstance from '../axiosConfig/instance';
import { toast, ToastContainer } from 'react-toastify';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export default function AddProduct() {
  const { productId } = useParams(); // For editing, if needed
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch product data if editing
  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const res = await axiosInstance.get(`products/${productId}`);
          setProduct(res.data.product);
        } catch (error) {
          toast.error(error.response?.data?.message || 'Product not found');
        }
      } else {
        setProduct({});
      }
    };

    fetchProduct();
  }, [productId]);

  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('products/categories');
        setCategories(res.data.data);
      } catch (error) {
        toast.error('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  // Validation schema for the form
  const validationSchema = yup.object().shape({
    name: yup.string().required('Product name is required'),
    price: yup
      .number()
      .required('Price is required')
      .positive('Price must be a positive number'),
    description: yup.string(),
    inStock: yup.boolean().required('Stock status is required'),
    categoryId: yup.string().required('Category is required'),
    img: yup.mixed().required('Image is required'),
  });

  const handleProductSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('inStock', values.inStock);
      formData.append('categoryId', values.categoryId);
      formData.append('img', values.img);

      console.log(formData);
      
      const res = productId
        ? await axiosInstance.put(`products/products/${productId}`, formData)
        : await axiosInstance.post('products/product', formData);

      toast.success(productId ? 'Product updated successfully!' : 'Product added successfully!');
      navigate('/all_product');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  if (product === null) {
    return <div className="text-center mt-24">Loading...</div>;
  }

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold">
        {productId ? 'تعديل منتج' : 'اضافة منتج جديد'}
      </h1>
      <Formik
        initialValues={{
          name: product?.name || '',
          price: product?.price || '',
          description: product?.description || '',
          inStock: product?.inStock || false,
          categoryId: product?.categoryId || '',
          img: null, // For new uploads
        }}
        validationSchema={validationSchema}
        onSubmit={handleProductSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="space-y-6">
              <div>
                <label htmlFor="name">اسم المنتج</label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className="block w-full border border-gray-300 rounded-md"
                />
                <ErrorMessage name="name" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="price">السعر</label>
                <Field
                  id="price"
                  name="price"
                  type="number"
                  className="block w-full border border-gray-300 rounded-md"
                />
                <ErrorMessage name="price" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="description">الوصف</label>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  className="block w-full border border-gray-300 rounded-md"
                />
                <ErrorMessage name="description" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="inStock">موجود</label>
                <Field
                  id="inStock"
                  name="inStock"
                  type="checkbox"
                  className="ml-2"
                />
                <ErrorMessage name="inStock" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="categoryId">الفئة</label>
                <Field
                  id="categoryId"
                  name="categoryId"
                  as="select"
                  className="block w-full border border-gray-300 rounded-md"
                >
                  <option value="">اختر الفئة</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="categoryId" component="div" className="text-red-600" />
              </div>

              <div>
                <label htmlFor="img">اضف صورة</label>
                <input
                  id="img"
                  name="img"
                  type="file"
                  onChange={(event) => setFieldValue('img', event.currentTarget.files[0])}
                  className="block w-full border border-gray-300 rounded-md"
                />
                <ErrorMessage name="img" component="div" className="text-red-600" />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                disabled={isSubmitting}
              >
               حفظ
               
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => navigate(-1)}
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
