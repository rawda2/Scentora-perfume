import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';


export default function LayOut() {
  const location = useLocation();

  const noNavBarRoutes = ['/dash','/intro','/','/signup','/login','/task4'];


 
  return (
    <>
   {!noNavBarRoutes.includes(location.pathname)&& <Navbar/>}  
      
      <Outlet />
   

   {!noNavBarRoutes.includes(location.pathname)&&   <Footer/>}  

    </>
  );
}
