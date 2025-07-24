import React, { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "{}")
    if (storedUsers[username] && storedUsers[username].password === password) {
      const userData = { username }
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
      return true
    }
    return false
  }

  const signup = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "{}")
    if (storedUsers[username]) {
      return false
    }
    storedUsers[username] = { password }
    localStorage.setItem("users", JSON.stringify(storedUsers))
    return true
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
  }

  const value = {
    user,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}