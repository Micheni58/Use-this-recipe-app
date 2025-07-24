import React from "react"
import { useRecipes } from "../../context/RecipeContext"
import "./SearchBar.css"

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useRecipes()

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar