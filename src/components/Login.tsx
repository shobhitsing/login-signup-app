import { useState } from "react";
import Button from "../components/Button";

interface LoginProps {
  onSwitchToSignup: () => void;
}

interface LoginForm {
  username: string;
  password: string;
}

interface Errors {
  username?: string;
  password?: string;
}

const Login = ({ onSwitchToSignup }: LoginProps) => {
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (
      !/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(formData.username)
    ) {
      newErrors.username =
        "Username can only contain alphanumeric characters and special characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password === formData.username) {
      newErrors.password = "Password cannot be the same as username";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login form submitted:", formData);
      alert("✅ Login Successful!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Login</h1>
          <p className="auth-subtitle mt-8">Sign in to continue</p>
        </div>

        <div className="divider"></div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group mb-4">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-input ${errors.username ? "error" : ""}`}
              placeholder="USERNAME"
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>

          <div className="form-group mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? "error" : ""}`}
              placeholder="NEW PASSWORD"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <Button type="submit" className="login-button">
            LOGIN
          </Button>
        </form>

        <div className="divider"></div>

        <p className="auth-switch">
          Don't have Account?{" "}
          <span onClick={onSwitchToSignup} className="auth-link">
            SignUp
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
