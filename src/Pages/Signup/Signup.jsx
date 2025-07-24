import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useToasts } from "../../context/ToastContext"
import { useNavigate, Link } from "react-router-dom"
import "./Signup.css"

const Signup = () => {
  const { user, signup } = useAuth()
  const { addToast } = useToasts()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
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
    const { username, password, confirmPassword } = formData
    if (password !== confirmPassword) {
      addToast("Passwords do not match", "error")
      return
    }
    if (signup(username, password)) {
      addToast("Signup successful! Please log in.", "success")
      navigate("/login")
    } else {
      addToast("Username already exists", "error")
    }
  }

  return (
    <div className="signup-page">
      <div className="container">
        <div className="signup-container">
          <h2 className="signup-title">Join TastyBoard</h2>
          <form onSubmit={handleSubmit} className="signup-form">
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup