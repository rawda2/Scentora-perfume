import { useState, useContext } from "react";
import "./Login.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import * as Yup from "yup";
import img from "./../../assets/sign.jpg";

export default function Login() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{6,12}$/,
        "Password must be 6-12 characters, start with a capital letter, and contain only lowercase letters and digits"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleLogin,
  });

  const navigate = useNavigate();
  const [apiError, SetapiError] = useState("");
  const { SetIsLogin } = useContext(UserContext);

async function handleLogin(formData) {
  try {
    const res = await fetch(
      `http://localhost:3000/users?email=${formData.email}&password=${formData.password}`
    );

    const data = await res.json();

    if (data.length > 0) {
      // Simulate token for demo purposes
      const token = "dummy-token-" + Date.now();

      localStorage.setItem("UserToken", token);
      SetIsLogin(token);
      navigate("/home");
    } else {
      SetapiError("Invalid email or password.");
    }
  } catch (error) {
    SetapiError("Something went wrong. Please try again later.");
  }
}


  return (
    <section className="login">
  <div className="container-fluid p-0">
    <div className="row m-0 w-100">
      {/* Left Form Section */}
      <div className="left col-md-6 d-flex  align-items-center justify-content-center">
      
 <form
              className="mx-1 mx-md-4 w-100 px-5"
              onSubmit={formik.handleSubmit}
            >
              <h3 className="i h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log In</h3>

              {apiError ? (
                <div className="api text-danger bg-light px-2 my-2 py-2 rounded">
                  {apiError}
                </div>
              ) : null}

              {/* Email Field */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas i fa-envelope fa-lg me-3 fa-fw"></i>
                <div
                  data-mdb-input-init
                  className="form-outline flex-fill mb-0"
                >
                  <input
                    type="email"
                    id="formMail"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Your Email"
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger small mt-1">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Password Field */}
              <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-lock i fa-lg me-3 fa-fw"></i>
                <div
                  data-mdb-input-init
                  className="form-outline flex-fill mb-0"
                >
                  <input
                    type="password"
                    id="formPass"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    required
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger small mt-1">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Submit Button */}
              <div className="d-flex justify-content-center mx-4 mb-3 mt-5 mb-lg-4 flex-column align-items-center">
                <button
                  type="submit"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg mb-3"
                >
                  LogIn
                </button>
                <p className="i">
                  Create New Account? <Link to={"/signup"}>SignUp</Link>{" "}
                </p>
              </div>
            </form>
      </div>

      {/* Right Image Section */}
      <div className="right col-md-6 p-0">
        <img src={img} className="image" alt="Login Illustration" />
      </div>
    </div>
  </div>
</section>

  );
}









