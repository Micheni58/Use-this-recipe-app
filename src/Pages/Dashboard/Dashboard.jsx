import React, { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useToasts } from "../../context/ToastContext"
import { sampleRecipes } from "../../data/data"
import Sidebar from "../../Components/Sidebar/Sidebar"
import RecipeCard from "../../Components/RecipeCard/RecipeCard"
import { Pagination } from "../../Components/Pagination/Pagination"
import "./Dashboard.css"

const Dashboard = () => {
  const { user } = useAuth()
  const { addToast } = useToasts()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const recipesPerPage = 6
  const totalPages = Math.ceil(sampleRecipes.length / recipesPerPage)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const paginatedRecipes = sampleRecipes.slice(
    (currentPage - 1) * recipesPerPage,
    currentPage * recipesPerPage
  )

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <div className="container">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Explore our sample recipes</p>
          <div className="recipe-list">
            {paginatedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard