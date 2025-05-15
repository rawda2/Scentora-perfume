import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import bg from './../../assets/h4.jpg'
import { Link } from 'react-router-dom';
const Intro = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-dark text-white position-relative">
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.4,
        zIndex: 0
      }}></div>

      <motion.div 
        className="text-center z-1 container px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, ease: 'easeOut' }}
      >
        <motion.h1 
          className="display-3 fw-bold mb-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Scentrora
        </motion.h1>

        <motion.p 
          className="lead mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Where Elegance Meets Essence
        </motion.p>

        <motion.button 
          className="btn btn-outline-light btn-lg px-5"
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255,255,255,0.4)" }}
          transition={{ type: 'spring', stiffness: 300 }}
        >

<Link to={'/login'} className=' text-decoration-none text-light'>          Explore Collection
</Link>        </motion.button>
      </motion.div>
    </div>
  );
};

export default Intro;
