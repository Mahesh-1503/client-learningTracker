import React, { useState } from "react";
import { signIn, signUp } from "../api/auth";
import "./AuthForm.css";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AuthForm = ({ onAuthSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setFormData(initialFormState);
    setError(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;

      if (isSignup) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }

        if (!formData.name || !formData.email || !formData.password) {
          setError("Please fill in all required fields.");
          setLoading(false);
          return;
        }

        response = await signUp(formData);
      } else {
        response = await signIn({
          email: formData.email,
          password: formData.password,
        });
      }

      const { result, token } = response.data;
      localStorage.setItem("profile", JSON.stringify({ result, token }));
      onAuthSuccess(result, token);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.join(", ") ||
        "An unexpected error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-icon">🔒</div>

        <h2>{isSignup ? "Join Us" : "Welcome Back"}</h2>
        <p className="auth-sub">
          {isSignup ? "Start your learning journey" : "Sign in to continue"}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={handleChange}
            />
          )}

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" disabled={loading} className="auth-btn">
            {loading
              ? "Processing..."
              : isSignup
              ? "Create Account"
              : "Sign In"}
          </button>

          <button type="button" className="auth-switch" onClick={switchMode}>
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
