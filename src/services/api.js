const SPOONACULAR_API_KEY = "3af6ca3b09ae4292a28e70fb028914ef" // Replace with your valid API key
const BASE_URL = "https://api.spoonacular.com"



// Handle API errors
const handleApiError = (error) => {
  console.error("API Error:", error)
  if (error.message.includes("401")) {
    throw new Error("Invalid API key. Please check your Spoonacular API key.")
  }
  throw new Error("Failed to fetch data from Spoonacular API")
}

// Get recipes with search and filter options
export const getRecipes = async (query = "", cuisine = "", number = 12) => {
  try {
    const params = new URLSearchParams({
      apiKey: SPOONACULAR_API_KEY,
      number: number.toString(),
      addRecipeInformation: "true",
      fillIngredients: "false", // Changed to false to avoid issues
    })

    if (query) params.append("query", query)
    if (cuisine && cuisine !== "all") params.append("cuisine", cuisine)

    const response = await fetch(`${BASE_URL}/recipes/complexSearch?${params}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.status === "failure") {
      throw new Error(data.message || "API request failed")
    }

    // Transform Spoonacular data to match our app structure with better error handling
    return (
      data.results?.map((recipe) => ({
        id: recipe.id,
        title: recipe.title || "Untitled Recipe",
        imageUrl: recipe.image || "/placeholder.svg?height=300&width=400",
        cuisine: recipe.cuisines?.[0] || "International",
        description: recipe.summary
          ? recipe.summary.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
          : "A delicious recipe to try",
        prepTime: recipe.readyInMinutes || 30,
        ingredients: recipe.extendedIngredients?.map((ing) => ing.original) || [],
        instructions: recipe.analyzedInstructions?.[0]?.steps?.map((step) => step.step) || [],
      })) || []
    )
  } catch (error) {
    console.error("Error fetching recipes:", error)
    // Return empty array instead of throwing to prevent app crash
    return []
  }
}

// Get detailed recipe information
export const getRecipeById = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}&includeNutrition=false`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const recipe = await response.json()

    if (recipe.status === "failure") {
      throw new Error(recipe.message || "Recipe not found")
    }

    // Transform to match our app structure
    return {
      id: recipe.id,
      title: recipe.title,
      imageUrl: recipe.image,
      cuisine: recipe.cuisines?.[0] || "International",
      description: recipe.summary ? recipe.summary.replace(/<[^>]*>/g, "") : "Delicious recipe",
      prepTime: recipe.readyInMinutes || 30,
      ingredients: recipe.extendedIngredients?.map((ing) => ing.original) || [],
      instructions: recipe.analyzedInstructions?.[0]?.steps?.map((step) => step.step) || [],
    }
  } catch (error) {
    handleApiError(error)
  }
}

// Get available cuisines (predefined list since Spoonacular doesn't have a cuisines endpoint)
export const getCuisines = () => {
  return [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ]
}

// Save recipe (for user-submitted recipes - store locally)
export const saveRecipe = async (recipe) => {
  // Since Spoonacular is read-only, we'll store user recipes locally
  const userRecipes = JSON.parse(localStorage.getItem("user-recipes") || "[]")
  const newRecipe = {
    ...recipe,
    id: `user-${Date.now()}`, // Prefix to distinguish from Spoonacular recipes
    isUserRecipe: true,
  }

  userRecipes.push(newRecipe)
  localStorage.setItem("user-recipes", JSON.stringify(userRecipes))

  return newRecipe
}

// Get user-submitted recipes
export const getUserRecipes = () => {
  return JSON.parse(localStorage.getItem("user-recipes") || "[]")
}

// Search recipes by ingredients
export const searchByIngredients = async (ingredients) => {
  try {
    const response = await fetch(
      `${BASE_URL}/recipes/findByIngredients?apiKey=${SPOONACULAR_API_KEY}&ingredients=${ingredients}&number=12`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return data.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      imageUrl: recipe.image,
      cuisine: "International",
      description: `Recipe using ${recipe.usedIngredientCount} of your ingredients`,
      prepTime: 30,
      ingredients: [],
      instructions: [],
    }))
  } catch (error) {
    handleApiError(error)
  }
}
