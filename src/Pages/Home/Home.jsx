import React, { useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useRecipes } from "../../context/RecipeContext"
import { Link } from "react-router-dom"
import Sidebar from "../../Components/Sidebar/Sidebar"
import RecipeList from "../../Components/RecipeList/RecipeList"
import "./Home.css"

const Home = () => {
  const { user } = useAuth()
  const { loadRecipes } = useRecipes()

  useEffect(() => {
    loadRecipes()
  }, [loadRecipes])

  return (
    <div className="home-page">
      {user && <Sidebar />}
      <div className={`home-content ${user ? "with-sidebar" : ""}`}>
        <div className="container">
          <section className="hero-section">
            <h1 className="hero-title">Welcome to TastyBoard</h1>
            <p className="hero-description">
              Discover, create, and share delicious recipes from around the world!
            </p>
            <div className="hero-actions">
              <Link to="/browse-recipes" className="hero-btn">
                Browse Recipes
              </Link>
              {!user && (
                <Link to="/signup" className="hero-btn secondary">
                  Get Started
                </Link>
              )}
            </div>
          </section>
          <section className="featured-recipes">
            <h2 className="section-title">Featured Recipes</h2>
            <RecipeList />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Home