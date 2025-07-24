import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useToasts } from "../../context/ToastContext"
import { useNavigate, Link } from "react-router-dom"
import "./Login.css"

const Login = () => {
  const { user, login } = useAuth()
  const { addToast } = useToasts()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { username, password } = formData
    if (login(username, password)) {
      addToast("Login successful!", "success")
      navigate("/dashboard")
    } else {
      addToast("Invalid username or password", "error")
    }
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <h2 className="login-title">Login to TastyBoard</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login