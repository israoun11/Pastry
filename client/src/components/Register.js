import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../JS/userSlice";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    setFormError("");
    dispatch(userRegister({ name, email, password }));
  };

  return (
    <main className="auth">
      <div className="auth__card">
        <span className="auth__eyebrow">Join the Maison</span>
        <h1 className="auth__title">Create Account</h1>
        <p className="auth__subtitle">
          Register to reserve tables, order online, and follow our latest
          creations.
        </p>

        {(formError || error) && (
          <p className="auth__error">{formError || (typeof error == "object" ? error?.msg || error?.message || "An error occurred" : error)}</p>
        )}

        <form className="auth__form" onSubmit={handleSubmit}>
          <label className="auth__field">
            <span className="auth__label">Full Name</span>
            <input
              type="text"
              className="auth__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </label>

          <label className="auth__field">
            <span className="auth__label">Email Address</span>
            <input
              type="email"
              className="auth__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className="auth__field">
            <span className="auth__label">Password</span>
            <input
              type="password"
              className="auth__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </label>

          <label className="auth__field">
            <span className="auth__label">Confirm Password</span>
            <input
              type="password"
              className="auth__input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </label>

          <button type="submit" className="auth__submit" disabled={loading}>
            {loading ? "Creating Account…" : "Create Account"}
          </button>
        </form>

        <p className="auth__switch">
          Already have an account?{" "}
          <Link to="/login" className="auth__link">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;