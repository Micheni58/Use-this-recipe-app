import React from "react"
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import "./Sidebar.css"

const Sidebar = () => {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>TastyBoard</h2>
      </div>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
        <Link to="/browse-recipes" className="sidebar-link">Browse Recipes</Link>
        <Link to="/favorites" className="sidebar-link">Favorites</Link>
        <Link to="/add-recipe" className="sidebar-link">Add Recipe</Link>
        <button onClick={logout} className="sidebar-link logout-btn">Logout</button>
      </nav>
    </aside>
  )
}

export default Sidebar