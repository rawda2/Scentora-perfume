import "bootstrap/dist/css/bootstrap.min.css";
import "./Products.css";
import axios from "axios";
import { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const { addToCart } = useCart();


  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handlePriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.gender);
    const matchesBrand =
      selectedBrand === "All" || product.brandId === parseInt(selectedBrand);
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesBrand && matchesPrice;
  });
  const [Favs, setFavs] = useState(() => {
    const stored = localStorage.getItem("favourites");
    return stored ? JSON.parse(stored) : [];
  });
  const handleFa = (productId) => {
    setFavs((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(Favs));
  }, [Favs]);

  

  return (
    <div className="container-fluid mt-5 py-5">
      <div className="row">
        {/* Sidebar */}
        <aside className="col-md-3 mb-4">
          <div className="px-3 bg-light rounded shadow-sm ">
            <h5 className="mb-3 h2 ">Filter By</h5>

            {/* Categories */}
            <div className="mb-4">
              <h6 className="fw-bold">Categories</h6>
              <ul className="list-unstyled">
                <li>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange("Men")}
                  />{" "}
                  Men
                </li>
                <li>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange("Women")}
                  />{" "}
                  Women
                </li>
                <li>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange("Unisex")}
                  />{" "}
                  Unisex
                </li>
                <li>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange("Luxury")}
                  />{" "}
                  Luxury
                </li>
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-4">
              <h6 className="fw-bold">Price Range</h6>
              <input
                type="range"
                className="form-range"
                min="0"
                max="200"
                value={maxPrice}
                onChange={handlePriceChange}
              />{" "}
              <div className="d-flex justify-content-between">
                <small>$0</small>
                <small>$200</small>
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h6 className="fw-bold">Brands</h6>
              <select className="form-select" onChange={handleBrandChange}>
                <option value="All">All</option>
                <option value="1">Chanel</option>
                <option value="2">Dior</option>
                <option value="3">Gucci</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold h2">All Products</h4>
          </div>

          {/* Product Grid */}
          <div className="row bg-transparent">
            {/* Example Product Card */}
            {filteredProducts.map((product, index) => (
              <div className="col-md-4 mb-4 " key={index}>
                <div className="card h-100 shadow-lg ">
                  <div className="img-container position-relative w-100">
                    <div className="icon ">
   <IconButton
                      className="favorite-icon"
                      onClick={() => handleFa(product.id)}
                    >

                      <FavoriteIcon
                        sx={{
                          color: Favs.includes(product.id) ? "red" : "white",
                        }}
                      />
                    </IconButton>
                    </div>
                   
                    <img
                      src={product.imageUrl}
                      className="card-img-top"
                      alt="Product"
                    />
                  
                  </div>

                  <div className="card-body d-flex flex-column">
                    <div className="title d-flex justify-content-between">
                      <h6 className="card-title">{product.name}</h6>

                      <p className="card-text text-muted">{product.size}</p>
                    </div>
                    <div className="bottom d-flex justify-content-between">
                      <p className="card-text text-muted">{product.price}$</p>
                      <p className="card-text text-muted">{product.gender}</p>
                    </div>

                    <button className="btn btn-dark mt-auto" onClick={()=>addToCart(product.id)}>
                      Add to Cart
                    </button>
                    <Fab
                      onClick={() => navigate("/favourite")}
                      sx={{
                        position: "fixed",
                        bottom: 20,
                        right: 20,
                        backgroundColor: "#cecece",
                        color: "#b92020",
                      }}
                    >
                      <FavoriteIcon />
                    </Fab>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
