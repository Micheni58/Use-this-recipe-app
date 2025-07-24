import React, { useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../Components/Sidebar/Sidebar"
import RecipeForm from "../../Components/RecipeForm/RecipeForm"
import "./AddRecipe.css"

const AddRecipe = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <div className="add-recipe-page">
      {user && <Sidebar />}
      <div className="add-recipe-content">
        <div className="container">
          <h2 className="page-title">Add a New Recipe</h2>
          <RecipeForm />
        </div>
      </div>
    </div>
  )
}

export default AddRecipe