import { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken !== null) {
      navigate("/products");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted:", { email, password });
    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/products");
      console.log(response.data);
      alert("Login Successful!");
    } catch (error) {
      console.log("Login Error: ", error);
    }
  };
  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Welcome Back</h2>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Sign In
        </button>
        <button
          className="register-btn"
          type="button"
          style={{ marginTop: "12px" }}
          onClick={() => navigate("/register")}
        >
          No account? Sign up here!
        </button>
      </form>
    </div>
  );
}

export default Login;
