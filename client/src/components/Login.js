import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../JS/userSlice";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    dispatch(userLogin({ email, password }));
  };

  return (
    <main className="auth">
      <div className="auth__card">
        <span className="auth__eyebrow">Welcome Back</span>
        <h1 className="auth__title">Sign In</h1>
        <p className="auth__subtitle">
          Access your account to manage orders and reservations.
        </p>

        {error && (
          <p className="auth__error">
            {typeof error === "object" ? error.msg : error}
          </p>
        )}

        <form className="auth__form" onSubmit={handleSubmit}>
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
              autoComplete="current-password"
            />
          </label>

          <button
            type="submit"
            className="auth__submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="auth__switch">
          Don&rsquo;t have an account?{" "}
          <Link to="/register" className="auth__link">
            Create One
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;