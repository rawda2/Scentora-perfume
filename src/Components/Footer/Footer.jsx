import 'bootstrap-icons/font/bootstrap-icons.css';
import './Footer.css'
const Footer = () => {
  return (
    <footer className=" text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Column 1: Logo + Description */}
          <div className="col-md-4 mb-4">
            <h5 className="text-uppercase fw-bold">Scentora</h5>
            <p className="small">
              Discover timeless fragrances that leave a lasting impression. Luxury, elegance, and identity in every bottle.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase fw-semibold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-white text-decoration-none">Home</a></li>
              <li><a href="#about" className="text-white text-decoration-none">About</a></li>
              <li><a href="#brands" className="text-white text-decoration-none">Our Brands</a></li>
              <li><a href="#products" className="text-white text-decoration-none">Products</a></li>
              <li><a href="#contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase fw-semibold mb-3">Contact Us</h6>
            <p className="mb-1"><i className="bi bi-geo-alt-fill me-2"></i>123 Perfume St, New York, NY</p>
            <p className="mb-1"><i className="bi bi-envelope-fill me-2"></i>info@perfumex.com</p>
            <p><i className="bi bi-telephone-fill me-2"></i>+1 (800) 123-4567</p>

            {/* Social Icons */}
            <div className="mt-3">
              <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>

        <hr className="bg-light" />
        <div className="text-center small">
          &copy; {new Date().getFullYear()} Scentora. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
