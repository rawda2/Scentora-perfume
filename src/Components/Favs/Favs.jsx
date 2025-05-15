import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Favs.css"; // Optional custom styling
import { useCart } from "../CartContext";
const Favs= () => {
  const [favProducts, setFavProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
    const { addToCart } = useCart();


  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favourites")) || [];
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        const favItems = data.filter((product) => storedFavs.includes(product.id));
        setFavProducts(favItems);
      });
  }, []);

  const handleRemove = (id) => {
    const updatedFavs = favProducts.filter((p) => p.id !== id);
    setFavProducts(updatedFavs);
    localStorage.setItem(
      "favourites",
      JSON.stringify(updatedFavs.map((p) => p.id))
    );
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between py-5 align-items-center mb-4">
        <h2 className="fw-bold h2"> <button
          className="btn  mb-2 me-3"
          onClick={() => navigate("/products")}
        >
          <ArrowBackIcon className=" text-light" /> 
        </button>`Your Favourite <span>Products`</span> ❤️</h2>
       
      </div>

      {favProducts.length === 0 ? (
        <div className="text-center">
          <p className="lead">You have no favourites yet.</p>
          <button
            className="btn btn-dark"
            onClick={() => navigate("/products")}
          >
            Explore Products
          </button>
        </div>
      ) : (
        <div className="row">
          {favProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm position-relative">
                <img
                  src={product.imageUrl} // Or use your imported images
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between">
                    {product.name}
                    <IconButton onClick={() => handleRemove(product.id)}>
                      <FavoriteIcon color="error" />
                    </IconButton>
                  </h5>
                  <div className="details d-flex justify-content-between">
 <p className="card-text text-muted mb-1">
                    Size: {product.size}
                  </p>
                  <p className="card-text text-muted mb-2">
                    Gender: {product.gender}
                  </p>
                  </div>
                 
                 <div className="details d-flex justify-content-between">
  <p className="fw-bold ">${product.price}</p>
                    <button className="btn btn-dark mt-auto" onClick={()=>addToCart(product.id)}>
                      Add to Cart
                    </button>
                 </div>
                
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favs;
