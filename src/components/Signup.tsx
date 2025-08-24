import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "../components/Button";

interface SignupProps {
  onSwitchToLogin: () => void;
}

interface SignupForm {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup = ({ onSwitchToLogin }: SignupProps) => {
  const [formData, setFormData] = useState<SignupForm>({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain alphabets";
    }

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (
      !/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(formData.username)
    ) {
      newErrors.username =
        "Username can only contain alphanumeric characters and special characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Only Gmail addresses are allowed";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+\d{1,3}\d{6,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone =
        "Enter valid phone number with country code (e.g., +91XXXXXXXXXX)";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password === formData.username) {
      newErrors.password = "Password cannot be the same as username";
    } else if (
      !/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain alphanumeric and special characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Signup form submitted:", formData);
      onSwitchToLogin();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create new Account</h1>
        </div>

        <div className="divider"></div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? "error" : ""}`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
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
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? "error" : ""}`}
                placeholder="Email"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${errors.phone ? "error" : ""}`}
                placeholder="PHONE NO"
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group password-group">
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? "error" : ""}`}
                  placeholder="NEW PASSWORD"
                />
                <span
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-group password-group">
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-input ${
                    errors.confirmPassword ? "error" : ""
                  }`}
                  placeholder="CONFIRM NEW PASSWORD"
                />
                <span
                  className="password-toggle"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          <div className="auth-button-container">
            <Button type="submit" className="auth-button">
              SIGN UP
            </Button>
          </div>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={onSwitchToLogin} className="auth-link">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
