import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';



// Import pages
import Dashboard from './pages/Dashboard';

import DefaultLayout from './layouts/DefaultLayout';

import AllLessons from './pages/AllProducts';
import AddLesson from './pages/AddProduct';
import AddCourse from './pages/AddCategory';
import AllCourses from './pages/AllCategories';
import Login from './pages/Login';
import Guard from './guard/Guard';

import NotFound from './pages/NotFound';


function App() {
  const location = useLocation();
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]);

  return (
    <div dir='rtl'>
      <Routes>
        <Route exact path="/login" element={<Login />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route exact path="/" element={<Guard><Dashboard /></Guard>} />
        
        <Route exact path="/all_category" element={<Guard><AllCourses /></Guard>} />
        <Route exact path="/add_category" element={<Guard><AddCourse /></Guard>} />
        <Route exact path="/edit_course/:courseId" element={<Guard><AddCourse /></Guard>} />
        <Route exact path="/all_product" element={<Guard><AllLessons /></Guard>} />
        <Route exact path="/add_product" element={<Guard><AddLesson /></Guard>} />
        <Route exact path="/edit_lesson/:lessonId" element={<Guard><AddLesson /></Guard>} />
    </Route>
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
