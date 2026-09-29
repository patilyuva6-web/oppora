"use client";

import { useState } from "react";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="signup-page">
      <div className="signup-card">

        {/* Logo */}
        <div className="signup-brand">
          <span className="brand-o">o</span>
          <span className="brand-p">p</span>
          <span className="brand-p2">p</span>
          <span className="brand-o2">o</span>
          <span className="brand-r">r</span>
          <span className="brand-a">a</span>
          <span className="brand-dot">.</span>
        </div>

        <h1>Create Account</h1>
        <p className="signup-subtitle">
          Create your account and discover what comes next.
        </p>

        {/* Google */}
        <button className="signup-google-btn">
          <svg viewBox="0 0 24 24" className="google-logo">
            <path
              fill="#4285F4"
              d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.26z"
            />
            <path
              fill="#34A853"
              d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.75z"
            />
            <path
              fill="#FBBC05"
              d="M6.53 13.84A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.84V7.63H3.29A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.37l3.24-2.53z"
            />
            <path
              fill="#EA4335"
              d="M12 6.13c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.25 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.38l3.24 2.53C7.3 7.85 9.46 6.13 12 6.13z"
            />
          </svg>

          Continue with Google
        </button>

        <div className="signup-divider">
          <span></span>
          <p>OR CONTINUE WITH</p>
          <span></span>
        </div>

        {/* Full Name */}
        <div className="signup-input-group">
          <label>Full name</label>
          <input
            type="text"
            placeholder="Enter your full name"
          />
        </div>

        {/* Mobile / Email */}
        <div className="signup-input-group">
          <label>Mobile number or email</label>
          <input
            type="text"
            placeholder="Mobile number or email"
          />
        </div>

        {/* Password */}
        <div className="signup-input-group">
          <label>Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="signup-input-group">
          <label>Confirm password</label>

          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Create Account */}
        <button className="create-account-btn">
          <span>Create Account</span>
          <strong>→</strong>
        </button>

        <p className="already-account">
          Already have an account?{" "}
          <a href="/login">Sign in</a>
        </p>

        <p className="signup-footer">
          By continuing, you agree to Oppora's Terms &amp; Privacy Policy.
        </p>

      </div>
    </main>
  );
}