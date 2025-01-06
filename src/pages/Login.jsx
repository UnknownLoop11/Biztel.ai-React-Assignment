// React
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

// MUI icons
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import CustomInput from "../components/CustomInput";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Form
  const validateForm = () => {
    let errors = {};

    // Email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    // Password
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      console.log(formData);
      try {
        setLoading(true);
        // API Call
        const res = fetch(
          `${import.meta.env.VITE_API_BASE_URL}:8080/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await res.json();

        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setErrors({ general: "An error occurred. Please try again." });
        setLoading(false);
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        {/* Heading  */}
        <div className={styles.headingContainer}>
          <h1 className={styles.heading}>Login</h1>
          <p className={styles.helperText}>
            Make sure you have an account before logging in.
          </p>
        </div>

        {/* Email  */}
        <CustomInput
          startEndorment={<Email />}
          type="email"
          name="email"
          value={formData.email}
          placeholder="Email"
          handleChange={handleChange}
        />

        {/* Password and Forgot Password Link  */}
        <div>
          <CustomInput
            startEndorment={<Lock />}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="Password"
            handleChange={handleChange}
            endEndorment={
              showPassword ? (
                <VisibilityOff
                  className={styles.endorment}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Visibility
                  className={styles.endorment}
                  onClick={() => setShowPassword(true)}
                />
              )
            }
          />
          <p className={styles.link}>
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        </div>

        {/* Errors  */}
        <div className={styles.errorContainer}>
          {errors.email && <p className={styles.error}>{errors.email}</p>}
          {errors.password && <p className={styles.error}>{errors.password}</p>}
          {errors.general && <p className={styles.error}>{errors.general}</p>}
        </div>

        {/* Submit Button  */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className={styles.bodyText}>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
        <p className={styles.bodyText}>&copy; 2024 Biztel.ai</p>
      </form>
    </div>
  );
};

export default Login;
