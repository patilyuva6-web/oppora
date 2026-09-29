"use client";

import { useState } from "react";

export default function LoginPage() {
  const [screen, setScreen] = useState<"login" | "signup" | "otp">("login");

  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [fullName, setFullName] = useState("");
  const [signupIdentifier, setSignupIdentifier] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState(["", "", "", ""]);

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const validateIdentifier = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "Mobile number or email is required.";
    }

    const mobile = /^[6-9][0-9]{9}$/;
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!mobile.test(trimmed) && !email.test(trimmed)) {
      return "Enter a valid 10-digit mobile number or email.";
    }

    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return "Password is required.";
    }

    if (value.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    if (!/[A-Z]/.test(value)) {
      return "Password needs an uppercase letter.";
    }

    if (!/[a-z]/.test(value)) {
      return "Password needs a lowercase letter.";
    }

    if (!/[0-9]/.test(value)) {
      return "Password needs a number.";
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-+=;'`~\/\\[\]]/.test(value)) {
      return "Password needs a special character.";
    }

    return "";
  };

  const showMessage = (text: string, isSuccess = false) => {
    setMessage(text);
    setSuccess(isSuccess);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleLogin = () => {
    const newErrors: Record<string, string> = {};

    const identifierError = validateIdentifier(loginIdentifier);
    const passwordError = validatePassword(loginPassword);

    if (identifierError) {
      newErrors.loginIdentifier = identifierError;
    }

    if (passwordError) {
      newErrors.loginPassword = passwordError;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showMessage("Please fix the highlighted fields.");
      return;
    }

    window.location.href = "/dashboard/index.html";
  };

  const handleCreateAccount = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    const identifierError = validateIdentifier(signupIdentifier);

    if (identifierError) {
      newErrors.signupIdentifier = identifierError;
    }

    const passwordError = validatePassword(signupPassword);

    if (passwordError) {
      newErrors.signupPassword = passwordError;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== signupPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showMessage("Please fix the highlighted fields.");
      return;
    }

    setScreen("otp");
    setErrors({});
    showMessage("Details verified. Enter the OTP.");
  };

  const handleOtpChange = (
    value: string,
    index: number
  ) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;

    setOtp(newOtp);

    if (digit && index < 3) {
      document
        .getElementById(`otp-${index + 1}`)
        ?.focus();
    }
  };

  const handleOtpKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      document
        .getElementById(`otp-${index - 1}`)
        ?.focus();
    }
  };

  const handleVerifyOtp = () => {
  const code = otp.join("");

  if (code.length !== 4) {
    setErrors({
      otp: "Please enter all 4 OTP digits.",
    });

    showMessage("Enter the complete OTP.");
    return;
  }

  setErrors({});

  // OTP verified successfully
  window.location.href = "/dashboard/index.html";
};

 const handleGoogleLogin = () => {
  window.location.href = "/dashboard/index.html";
};

  const handleGoogleSignup = () => {
    showMessage(
      "Google sign-up will be connected with Firebase."
    );
  };

  return (
    <main className="page">

      {/* POPUP */}
      {message && (
        <div className={`popup ${success ? "success" : ""}`}>
          <span className="popup-icon">
            {success ? "✓" : "!"}
          </span>

          <span>{message}</span>
        </div>
      )}

      <div className="container">

        {/* ================= LOGIN ================= */}

        {screen === "login" && (
          <section>

            {/* LOGO */}
            <div className="logo">
              <span>o</span>
              <span>p</span>
              <span>p</span>
              <span>o</span>
              <span>r</span>
              <span>a</span>
              <span>.</span>
            </div>

            {/* HEADING */}
            <div className="heading">
              <h1>Welcome back</h1>

              <p>
                Sign in to discover your next opportunity.
              </p>
            </div>

            {/* CARD */}
            <div className="card">

              {/* GOOGLE */}
              <button
                className="google-btn"
                onClick={handleGoogleLogin}
                type="button"
              >
                <svg
                  className="google-logo"
                  viewBox="0 0 24 24"
                >
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

              {/* DIVIDER */}
              <div className="divider">
                <span />
                <p>OR CONTINUE WITH EMAIL</p>
                <span />
              </div>

              {/* IDENTIFIER */}
              <div className="group">

                <label>
                  Mobile number or email
                </label>

                <input
                  value={loginIdentifier}
                  onChange={(e) => {
                    setLoginIdentifier(e.target.value);

                    if (errors.loginIdentifier) {
                      setErrors({
                        ...errors,
                        loginIdentifier: "",
                      });
                    }
                  }}
                  placeholder="Mobile number or email"
                  className={
                    errors.loginIdentifier
                      ? "error"
                      : ""
                  }
                />

                {errors.loginIdentifier && (
                  <small className="error-text">
                    {errors.loginIdentifier}
                  </small>
                )}

              </div>

              {/* PASSWORD */}
              <div className="group">

                <label>Password</label>

                <div className="input-wrap">

                  <input
                    value={loginPassword}
                    type={
                      showLoginPassword
                        ? "text"
                        : "password"
                    }
                    onChange={(e) => {
                      setLoginPassword(e.target.value);

                      if (errors.loginPassword) {
                        setErrors({
                          ...errors,
                          loginPassword: "",
                        });
                      }
                    }}
                    className={`password-input ${
                      errors.loginPassword
                        ? "error"
                        : ""
                    }`}
                    placeholder="Enter your password"
                  />

                  <button
                    className="show-btn"
                    type="button"
                    onClick={() =>
                      setShowLoginPassword(
                        !showLoginPassword
                      )
                    }
                  >
                    {showLoginPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                {errors.loginPassword && (
                  <small className="error-text">
                    {errors.loginPassword}
                  </small>
                )}

              </div>

              {/* SIGN IN */}
              <button
                className="main-btn"
                onClick={handleLogin}
                type="button"
              >
                Sign in

                <strong>→</strong>
              </button>

              {/* CREATE ACCOUNT */}
              <p className="switch-text">

                Don't have an account?{" "}

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    setErrors({});

                    setScreen("signup");
                  }}
                >
                  Create one
                </a>

              </p>

            </div>

            <p className="footer">
              By continuing, you agree to Oppora&apos;s
              Terms &amp; Privacy Policy.
            </p>

          </section>
        )}

        {/* ================= SIGNUP ================= */}

        {screen === "signup" && (
          <section>

            {/* LOGO */}
            <div className="logo">
              <span>o</span>
              <span>p</span>
              <span>p</span>
              <span>o</span>
              <span>r</span>
              <span>a</span>
              <span>.</span>
            </div>

            {/* HEADING */}
            <div className="heading">

              <h1>Create account</h1>

              <p>
                Join Oppora and discover your next
                opportunity.
              </p>

            </div>

            <div className="card">

              {/* GOOGLE */}
              <button
                className="google-btn"
                onClick={handleGoogleSignup}
                type="button"
              >
                <svg
                  className="google-logo"
                  viewBox="0 0 24 24"
                >
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

              {/* DIVIDER */}
              <div className="divider">
                <span />
                <p>OR CREATE WITH EMAIL</p>
                <span />
              </div>

              {/* FULL NAME */}
              <div className="group">

                <label>Full name</label>

                <input
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);

                    if (errors.fullName) {
                      setErrors({
                        ...errors,
                        fullName: "",
                      });
                    }
                  }}
                  className={
                    errors.fullName
                      ? "error"
                      : ""
                  }
                  placeholder="Enter your full name"
                />

                {errors.fullName && (
                  <small className="error-text">
                    {errors.fullName}
                  </small>
                )}

              </div>

              {/* MOBILE / EMAIL */}
              <div className="group">

                <label>
                  Mobile number or email
                </label>

                <input
                  value={signupIdentifier}
                  onChange={(e) => {
                    setSignupIdentifier(
                      e.target.value
                    );

                    if (errors.signupIdentifier) {
                      setErrors({
                        ...errors,
                        signupIdentifier: "",
                      });
                    }
                  }}
                  className={
                    errors.signupIdentifier
                      ? "error"
                      : ""
                  }
                  placeholder="Mobile number or email"
                />

                {errors.signupIdentifier && (
                  <small className="error-text">
                    {errors.signupIdentifier}
                  </small>
                )}

              </div>

              {/* PASSWORD */}
              <div className="group">

                <label>Password</label>

                <div className="input-wrap">

                  <input
                    value={signupPassword}
                    type={
                      showSignupPassword
                        ? "text"
                        : "password"
                    }
                    onChange={(e) => {
                      setSignupPassword(
                        e.target.value
                      );

                      if (errors.signupPassword) {
                        setErrors({
                          ...errors,
                          signupPassword: "",
                        });
                      }
                    }}
                    className={`password-input ${
                      errors.signupPassword
                        ? "error"
                        : ""
                    }`}
                    placeholder="Create a strong password"
                  />

                  <button
                    className="show-btn"
                    type="button"
                    onClick={() =>
                      setShowSignupPassword(
                        !showSignupPassword
                      )
                    }
                  >
                    {showSignupPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                {errors.signupPassword && (
                  <small className="error-text">
                    {errors.signupPassword}
                  </small>
                )}

              </div>

              {/* CONFIRM PASSWORD */}
              <div className="group">

                <label>
                  Confirm password
                </label>

                <div className="input-wrap">

                  <input
                    value={confirmPassword}
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    onChange={(e) => {
                      setConfirmPassword(
                        e.target.value
                      );

                      if (errors.confirmPassword) {
                        setErrors({
                          ...errors,
                          confirmPassword: "",
                        });
                      }
                    }}
                    className={`password-input ${
                      errors.confirmPassword
                        ? "error"
                        : ""
                    }`}
                    placeholder="Confirm your password"
                  />

                  <button
                    className="show-btn"
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                {errors.confirmPassword && (
                  <small className="error-text">
                    {errors.confirmPassword}
                  </small>
                )}

              </div>

              {/* CREATE ACCOUNT */}
              <button
                className="main-btn"
                onClick={handleCreateAccount}
                type="button"
              >
                Create account

                <strong>→</strong>
              </button>

              {/* LOGIN */}
              <p className="switch-text">

                Already have an account?{" "}

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    setErrors({});

                    setScreen("login");
                  }}
                >
                  Sign in
                </a>

              </p>

            </div>

            <p className="footer">
              By continuing, you agree to Oppora&apos;s
              Terms &amp; Privacy Policy.
            </p>

          </section>
        )}

        {/* ================= OTP ================= */}

        {screen === "otp" && (
          <section>

            {/* LOGO */}
            <div className="logo">
              <span>o</span>
              <span>p</span>
              <span>p</span>
              <span>o</span>
              <span>r</span>
              <span>a</span>
              <span>.</span>
            </div>

            {/* HEADING */}
            <div className="heading">

              <h1>Enter OTP</h1>

              <p>
                Enter the verification code sent to your
                mobile number or email.
              </p>

            </div>

            <div className="card">

              <p className="otp-description">
                We need to verify your account before
                creating it.
              </p>

              {/* OTP */}
              <div className="otp-underlines">

                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    className="otp-input"
                    value={digit}
                    maxLength={1}
                    inputMode="numeric"
                    onChange={(e) =>
                      handleOtpChange(
                        e.target.value,
                        index
                      )
                    }
                    onKeyDown={(e) =>
                      handleOtpKeyDown(
                        e,
                        index
                      )
                    }
                  />
                ))}

              </div>
              

              {errors.otp && (
                <div className="otp-error">
                  {errors.otp}
                </div>
              )}

              {/* VERIFY */}
              <button
                className="main-btn"
                onClick={handleVerifyOtp}
                type="button"
              >
                Verify &amp; Create Account

                <strong>→</strong>
              </button>

              {/* BACK */}
              <button
                className="back-btn"
                onClick={() => {
                  setScreen("signup");
                  setOtp(["", "", "", ""]);
                  setErrors({});
                }}
                type="button"
              >
                
                ← Back to Create Account
              </button>

            </div>

          </section>
        )}

      </div>
    </main>
  );
}