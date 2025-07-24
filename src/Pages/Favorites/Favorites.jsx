import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../Components/Sidebar/Sidebar"
import RecipeCard from "../../Components/RecipeCard/RecipeCard"
import "./Favorites.css"

const Favorites = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(storedFavorites)
  }, [user, navigate])

  const openRecipeModal = (id) => {
    navigate(`/recipe/${id}`)
  }

  return (
    <div className="favorites-page">
      <Sidebar />
      <div className="favorites-content">
        <div className="container">
          <h1 className="page-title">Your Favorites</h1>
          <p className="page-subtitle">View your saved recipes</p>
          {favorites.length === 0 ? (
            <div className="no-favorites">
              <p>No favorite recipes yet. Browse recipes to add some!</p>
            </div>
          ) : (
            <div className="recipe-list">
              {favorites.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} openRecipeModal={openRecipeModal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Favorites