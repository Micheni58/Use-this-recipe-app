import React, { createContext, useContext, useState, useEffect } from "react"
import { getRecipes, getCuisines, saveRecipe } from "../services/api"

const RecipeContext = createContext()

export const useRecipes = () => {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider")
  }
  return context
}

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cuisines, setCuisines] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("")

  const loadRecipes = async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedRecipes = await getRecipes(searchQuery, selectedCuisine)
      setRecipes(fetchedRecipes)
      setFilteredRecipes(fetchedRecipes)
    } catch (err) {
      setError("Failed to load recipes")
      setFilteredRecipes([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecipes()
    setCuisines(getCuisines())
  }, [searchQuery, selectedCuisine])

  const addRecipe = async (recipe) => {
    try {
      const newRecipe = await saveRecipe(recipe)
      setRecipes((prev) => [...prev, newRecipe])
      setFilteredRecipes((prev) => [...prev, newRecipe])
      return newRecipe
    } catch (err) {
      setError("Failed to save recipe")
      return null
    }
  }

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        filteredRecipes,
        loading,
        error,
        cuisines,
        searchQuery,
        setSearchQuery,
        selectedCuisine,
        setSelectedCuisine,
        loadRecipes,
        addRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}