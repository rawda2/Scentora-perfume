import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import NavBar from './../NavBar/NavBar';
import Footer from '../Footer/Footer';


export default function LayOut() {
  const location = useLocation();
  // const isAuthenticated = localStorage.getItem('token');

  const noNavBarRoutes = ['/dash','/intro','/','/signup','/login'];

//   console.log('isAuthenticated:', isAuthenticated);
//   console.log('Current Path:', location.pathname);
//   console.log('Should Render NavBar and Footer:', isAuthenticated && !noNavBarRoutes.includes(location.pathname));

 
  return (
    <>
      {/* {isAuthenticated && !noNavBarRoutes.includes(location.pathname) && <NavBar />} */}
   {!noNavBarRoutes.includes(location.pathname)&& <NavBar/>}  
      
      <Outlet />
   

   {!noNavBarRoutes.includes(location.pathname)&&   <Footer/>}  

      {/* {isAuthenticated && !noNavBarRoutes.includes(location.pathname) && <Footer />} */}
    </>
  );
}