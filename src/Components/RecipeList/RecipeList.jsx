import React from "react"
import RecipeCard from "../RecipeCard/RecipeCard"
import { useRecipes } from "../../context/RecipeContext"
import "./RecipeList.css"

const RecipeList = () => {
  const { filteredRecipes, loading, error } = useRecipes()

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading delicious recipes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <p>Showing locally saved recipes instead.</p>
      </div>
    )
  }

  if (!filteredRecipes || filteredRecipes.length === 0) {
    return (
      <div className="no-recipes">
        <p>No recipes found. Try adjusting your search or filter.</p>
      </div>
    )
  }

  return (
    <div className="recipe-list">
      {filteredRecipes.map((recipe) => {
        if (!recipe || !recipe.id) {
          console.warn("Invalid recipe data:", recipe)
          return null
        }

        return <RecipeCard key={recipe.id} recipe={recipe} />
      })}
    </div>
  )
}

export default RecipeList