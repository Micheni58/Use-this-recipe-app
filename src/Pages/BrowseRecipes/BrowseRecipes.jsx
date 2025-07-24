import React, { useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useRecipes } from "../../context/RecipeContext"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../Components/Sidebar/Sidebar"
import SearchBar from "../../Components/SearchBar/SearchBar"
import CuisineFilter from "../../Components/CuisineFilter/CuisineFilter"
import RecipeList from "../../Components/RecipeList/RecipeList"
import "./BrowseRecipes.css"

const BrowseRecipes = () => {
  const { user } = useAuth()
  const { filteredRecipes, loading, error } = useRecipes()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <div className="browse-recipes-page">
      <Sidebar />
      <div className="browse-recipes-content">
        <div className="container">
          <h1 className="page-title">Browse Recipes</h1>
          <p className="page-subtitle">Find delicious recipes from around the world</p>
          <div className="filters-section">
            <SearchBar />
            <CuisineFilter />
          </div>
          <RecipeList />
        </div>
      </div>
    </div>
  )
}

export default BrowseRecipes