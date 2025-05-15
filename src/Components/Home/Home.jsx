import Header from "./../HomeHeader/Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import img1 from "./../../assets/1.jpeg";
import img2 from "./../../assets/2.jpeg";
import img3 from "./../../assets/3.jpeg";
import img4 from "./../../assets/4.jpeg";
import img5 from "./../../assets/5.jpeg";
import img6 from "./../../assets/6.jpeg";
import img7 from "./../../assets/1.jpeg";
import img8 from "./../../assets/2.jpeg";
import img9 from "./../../assets/3.jpeg";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import img12 from "./../../assets/12.jpeg";

import img16 from "./../../assets/16.jpeg";
import img17 from "./../../assets/17.jpeg";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

import "bootstrap-icons/font/bootstrap-icons.css";

import "./Home.css";

export default function Home() {
  const imgs = [img1, img2, img3, img4, img12, img16, img17, img8, img9];
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [Best, setBest] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useEffect for side effects like data fetching
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:3000/brands");
        setBrands(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []); // Empty dependency array means this runs once on mount
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

  useEffect(() => {
    const fetchBest = async () => {
      try {
        const response = await axios.get("http://localhost:3000/bestSales");
        setBest(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBest();
  }, []);

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
  if (loading) return <div>Loading brands...</div>;
  if (error) return <div>Error: {error}</div>;

  const best = products.filter((p) => Best.includes(p.id));
  const features = [
    {
      icon: "bi-stars",
      title: "Top Quality",
      desc: "We deliver only the finest perfumes crafted with premium ingredients.",
      color: "text-primary",
    },
    {
      icon: "bi-truck",
      title: "Fast Delivery",
      desc: "Reliable and quick shipping to get your products on time, every time.",
      color: "text-success",
    },
    {
      icon: "bi-shield-check",
      title: "Secure & Trusted",
      desc: "Safe payment options and trusted brands for a worry-free shopping experience.",
      color: "text-danger",
    },
  ];

  return (
    <>
      <section className="body w-100 p-0 m-0">
        <div className="header w-100 px-0 mt-5 d-flex justify-content-center text-center align-items-center">
          <div className="caption">
            <h1>Scentora</h1>
            <p className=" w-50 text-center mx-auto">
              {" "}
              Discover timeless elegance and irresistible scents. At Scentora,
              we bring you a curated collection of luxury fragrances from the
              world’s top brands—crafted to captivate your senses and express
              your unique identity.
            </p>
          </div>
        </div>

        <div className="about d-flex justify-content-center flex-column align-items-center mt-5">
          <h2 className=" mb-4 h2">
            ` About<span> US</span> `
          </h2>
          <div className="parts d-flex justify-content-around px-5 mt-4">
            <div className="left w-40 d-flex flex-column justify-content-center">
              <h3 className="hcolor">Scentora</h3>
              <p>
                At Scentora, we believe perfume is more than a fragrance — it's
                an experience. Since our inception, we've been dedicated to
                curating an exclusive collection of premium scents from around
                the world. Whether you're drawn to timeless classics or modern
                niche blends, our mission is to help you discover the fragrance
                that reflects your unique identity. With a passion for quality
                and elegance, we strive to bring you not just perfumes, but
                memories in a bottle.
              </p>
            </div>
            <div className="right w-40">
              <img src={img5} alt="" className=" w-100" />
            </div>
          </div>
        </div>
        <div className="grid mt-4 py-5 px-5 w-100  d-flex justify-content-center align-items-center flex-column">
          <h2 className=" mb-4 h2">
            <span>` OUR</span> Brands `
          </h2>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={6}
              className=" d-flex justify-content-center"
            >
              {brands.map((brand, index) => (
                <Grid item xs={12} sm={6} md={4} key={brand.id}>
                  <Card
                    className="homeCard text-start"
                    sx={{
                      width: 300, // Fixed width in pixels
                      height: 300, // Fixed height in pixels
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      sx={{ height: 140 }}
                      image={imgs[index]} // Use modulo to prevent index overflow
                      title={brand.name || "Brand image"}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        sx={{ fontWeight: "bold" }}
                        component="div"
                      >
                        {brand.name || "Brand Name"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {brand.location}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <span size="small" className=" ms-1 hcolor">
                        {" "}
                        Founded at {brand.founded}
                      </span>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>

        <div className="best d-flex mt-4 justify-content-center flex-column align-items-center p-5">
          <h2 className=" mb-4 h2">
            ` <span>BEST</span> Sales`
          </h2>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={6}
              className=" d-flex justify-content-center"
            >
              {best.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    className="homeCard text-start shadow position-relative pb-3"
                    sx={{
                      width: 300, // Fixed width in pixels
                      height: 370, // Fixed height in pixels
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="img-container position-relative w-100">
                      <div className="icon ">
                        {" "}
                        <IconButton
                          aria-label="add to favorites"
                          className="favourit"
                        >
                          <FavoriteIcon
                            onClick={() => {
                              handleFa(product.id);
                            }}
                            sx={{
                              color: Favs.includes(product.id)
                                ? "red"
                                : "white",
                            }}
                          />
                        </IconButton>
                      </div>
                      <CardMedia
                        sx={{ height: 140 }}
                        image={product.imageUrl}
                        title={product.name || "product image"}
                      />
                    </div>

                    <CardContent>
                      <div className="title d-flex justify-content-between my-3">
                        <Typography
                          gutterBottom
                          variant="h6"
                          sx={{ fontWeight: "bold" }}
                          component="div"
                        >
                          {product.name || "product Name"}
                        </Typography>
                      </div>

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                    <CardActions className=" d-flex justify-content-between pe-3 mt-3">
                      <span size="small" className=" ms-1">
                        {" "}
                        <i className=" fa-solid fa-star text-warning"></i>
                        {product.rating}
                      </span>
                      <span size="small" className=" ms-1">
                        {" "}
                        {product.gender}
                      </span>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
        <section className="py-5 bg-light" id="why-us">
          <div className="container text-center">
            <h2 className="mb-4 h2">
              Why <span>Choose</span> Us
            </h2>
            <p className="mb-5 p">
              We offer high-quality products and a seamless experience that sets
              us apart from the rest.
            </p>

            <div className="row g-4">
              {features.map((feature, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body">
                      <div className={`mb-3`}>
                        <i
                          className={`bi ${feature.icon} fs-1 ${feature.color}`}
                        ></i>
                      </div>
                      <h5 className="card-title">{feature.title}</h5>
                      <p className="card-text text-muted">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <a href="#shop" onClick={()=>navigate("/products")} className="btn btn-primary btn-lg">
                Shop Now
              </a>
            </div>
          </div>
        </section>

        <div className="gallery"></div>
      </section>

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
    </>
  );
}
