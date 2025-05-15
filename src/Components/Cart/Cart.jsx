import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";
import { useState, useEffect } from "react";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import axios from "axios";
import { useCart } from "../CartContext";
const Cart = () => {
  const [products, setProducts] = useState([]);   // All products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products once
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

 

    const { cartItems, removeFromCart,clearCart } = useCart();


  // Get full details for each item in the cart
  const fullCartItems = cartItems.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    return product
      ? { ...product, quantity: cartItem.quantity }
      : null;
  }).filter(Boolean); // Remove nulls in case product isn't found

  const total = fullCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
const handleCheckout = async () => {
  if (fullCartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  try {
    const orderData = {
      userId: 1, // You should get this from authentication
      productIds: fullCartItems.map(item => item.id),
      total: total,
      status: "processing",
      date: new Date().toISOString()
    };

    await axios.post("http://localhost:3000/orders", orderData);
    alert("Order submitted successfully!");
    clearCart();
  } catch (err) {
    console.error("Error submitting order:", err);
    alert("There was a problem submitting your order.");
  }
};

  return (
    <div className="container py-5">
      <h2 className="mt-5 text-center h2">Your <span>Shopping</span> Cart</h2>
      <div className="row py-5">
        <div className="col-md-8">
          {fullCartItems.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            fullCartItems.map((item) => (
              <div
                key={item.id}
                className="card mb-3 p-3 d-flex flex-row align-items-center shadow-sm"
              >
                <img
                  src={item.imageUrl} 
                  alt={item.name}
                  className="cart-img rounded me-3 "
                />
                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-1 text-muted">${item.price} x {item.quantity}</p>
                </div>
                <div>
                  <button
                    className="btn bg-light text-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteSweepIcon />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Summary</h4>
            <p className="mb-2">Items: {fullCartItems.length}</p>
            <h5>Total: ${total.toFixed(2)}</h5>
            <button className="btn btn-dark w-100 mt-3" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
