import React, { useState } from "react"
import { useRecipes } from "../../context/RecipeContext"
import { useToasts } from "../../context/ToastContext"
import "./RecipeForm.css"

const RecipeForm = () => {
  const { addRecipe } = useRecipes()
  const { addToast } = useToasts()
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    cuisine: "",
    description: "",
    prepTime: "",
    ingredients: "",
    instructions: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newRecipe = {
      ...formData,
      prepTime: Number.parseInt(formData.prepTime),
      ingredients: formData.ingredients.split("\n").filter((item) => item.trim()),
      instructions: formData.instructions.split("\n").filter((item) => item.trim()),
      id: Date.now(),
    }

    try {
      await addRecipe(newRecipe)
      setFormData({
        title: "",
        imageUrl: "",
        cuisine: "",
        description: "",
        prepTime: "",
        ingredients: "",
        instructions: "",
      })
      setShowSuccess(true)
      addToast("Recipe added successfully!", "success")
      setTimeout(() => setShowSuccess(false), 3000)
      const recipesSection = document.getElementById("recipes")
      if (recipesSection) {
        recipesSection.scrollIntoView({ behavior: "smooth" })
      }
    } catch (err) {
      addToast("Failed to add recipe", "error")
    }
  }

  return (
    <div className="recipe-form-container">
      {showSuccess && (
        <div className="success-message">
          <p>✅ Recipe added successfully! Check it out in the recipes section above.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="title">Recipe Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cuisine">Cuisine Type</label>
            <input
              type="text"
              id="cuisine"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="prepTime">Prep Time (minutes)</label>
            <input
              type="number"
              id="prepTime"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Short Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-textarea"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (one per line)</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            className="form-textarea"
            rows="6"
            placeholder="1 cup flour\n2 eggs\n1/2 cup milk"
          />
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions (one step per line)</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
            className="form-textarea"
            rows="8"
            placeholder="Preheat oven to 350°F\nMix dry ingredients\nAdd wet ingredients"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Recipe
        </button>
      </form>
    </div>
  )
}

export default RecipeForm