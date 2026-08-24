import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../JS/userSlice";
import "./Account.css";

const Account = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return (
      <main className="account">
        <div className="account__card">
          <p className="account__subtitle">Please sign in to view your profile details.</p>
        </div>
      </main>
    );
  }

  const initialLetter = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <main className="account">
      <div className="account__card">
        {/* Luxury Initial Avatar */}
        <div className="account__avatar-wrapper">
          <div className="account__avatar">
            <span>{initialLetter}</span>
          </div>
        </div>

        <span className="account__eyebrow">Personal Profile</span>
        <h1 className="account__title">{user.name}</h1>
        <p className="account__subtitle">{user.email}</p>

        <div className="account__info-grid">
          <div className="account__info-item">
            <span className="account__label">Account Status</span>
            <span className="account_value account_value--badge">Active Member</span>
          </div>
          <div className="account__info-item">
            <span className="account__label">Role</span>
            <span className="account__value">{user.role || "Customer"}</span>
          </div>
        </div>

        <button type="button" className="account__logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </main>
  );
};

export default Account;