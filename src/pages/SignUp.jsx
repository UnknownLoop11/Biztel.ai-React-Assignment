// React
import { useState } from "react";
import { Link } from "react-router-dom";

// MUI
import {
  Container,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Lock,
  Redeem,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    inviteCode: "",
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

    // Name
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z ]+$/.test(formData.name)) {
      errors.name = "Name must contain only letters";
    } else if (formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    // Email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    // Password
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    // Set Errors
    setErrors(errors);
    return errors;
  };
  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}:8080/api/auth/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
        setErrors({ general: "An error occurred. Please try again later" });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="container">
      <form
        onSubmit={handleSubmit}
        className="form-container"
        autoComplete="off"
      >
        <Typography variant="h2" align="center" gutterBottom>
          Sign Up
          <Typography variant="body2" align="center" gutterBottom>
            Fill in the form to create an account. Make sure to use the right
            credentials.
          </Typography>
        </Typography>

        {/* Name */}
        <TextField
          type="text"
          variant="outlined"
          label="Name"
          name="name"
          placeholder="John Doe"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            },
          }}
          value={formData.name}
          onChange={handleChange}
          error={errors.name ? true : false}
          helperText={errors.name}
        />

        {/* Email */}
        <TextField
          type="email"
          variant="outlined"
          label="Email"
          name="email"
          placeholder="example@gmail.com"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            },
          }}
          value={formData.email}
          onChange={handleChange}
          error={errors.email ? true : false}
          helperText={errors.email}
        />

        {/* Password */}
        <TextField
          type={showPassword ? "text" : "password"}
          variant="outlined"
          label="Password"
          name="password"
          fullWidth
          placeholder="••••••••"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </InputAdornment>
              ),
            },
          }}
          value={formData.password}
          onChange={handleChange}
          error={errors.password ? true : false}
          helperText={
            errors.password || "Password must be at least 8 characters"
          }
        />

        {/* Confirm Password */}
        <TextField
          type={showPassword ? "text" : "password"}
          variant="outlined"
          label="Confirm Password"
          name="confirmPassword"
          fullWidth
          placeholder="••••••••"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </InputAdornment>
              ),
            },
          }}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword ? true : false}
          helperText={errors.confirmPassword}
        />

        {/* Invite Code */}
        <TextField
          type="text"
          variant="outlined"
          label="Invite Code"
          name="inviteCode"
          placeholder="XXXX-XXXX-XXXX"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Redeem />
                </InputAdornment>
              ),
            },
          }}
          value={formData.inviteCode}
          onChange={handleChange}
        />

        {/* Error  */}
        {errors.general && (
          <Typography variant="body2" color="error" align="center" gutterBottom>
            {errors.general}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          type="submit"
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
          disabled={loading}
        >
          Sign Up
        </Button>

        {/* Login Link */}
        <Typography variant="body2" align="center" gutterBottom>
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </form>
      <Typography variant="body2" align="center" gutterBottom marginTop={2}>
        &copy; 2024 Biztel.ai
      </Typography>
    </Container>
  );
};

export default SignUp;
