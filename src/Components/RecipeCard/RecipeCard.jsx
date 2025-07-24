import React from "react"
import { useToasts } from "../../context/ToastContext"
import { useNavigate } from "react-router-dom"
import "./RecipeCard.css"

const RecipeCard = ({ recipe }) => {
  const { addToast } = useToasts()
  const navigate = useNavigate()

  if (!recipe) {
    return null
  }

  const {
    id,
    title = "Untitled Recipe",
    imageUrl = "",
    cuisine = "International",
    description = "A delicious recipe",
    prepTime = 30,
  } = recipe

  const handleViewRecipe = () => {
    navigate(`/recipe/${id}`)
  }

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    const isFavorited = favorites.some((fav) => fav.id === id)
    if (isFavorited) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== id)
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
      addToast(`${title} removed from favorites`, "info")
    } else {
      favorites.push(recipe)
      localStorage.setItem("favorites", JSON.stringify(favorites))
      addToast(`${title} added to favorites`, "success")
    }
  }

  const isFavorited = JSON.parse(localStorage.getItem("favorites") || "[]").some(
    (fav) => fav.id === id
  )

  return (
    <div className="recipe-card">
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        className="recipe-card-image"
        onError={(e) => {
          e.target.src = "/placeholder.svg?height=300&width=400"
        }}
      />
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{title}</h3>
        <p className="recipe-card-description">{description}</p>
        <div className="recipe-card-meta">
          <span className="cuisine-tag">{cuisine}</span>
          <span className="prep-time">{prepTime} min</span>
        </div>
        <div className="recipe-card-actions">
          <button onClick={handleViewRecipe} className="view-recipe-btn">
            View Recipe
          </button>
          <button
            onClick={toggleFavorite}
            className={`favorite-btn ${isFavorited ? "favorited" : ""}`}
          >
            {isFavorited ? "★ Remove Favorite" : "☆ Add Favorite"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard