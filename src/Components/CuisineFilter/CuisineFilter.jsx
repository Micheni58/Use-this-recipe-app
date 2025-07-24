import React from "react";
import { useRecipes } from "../../context/RecipeContext";
import "./CuisineFilter.css";

const CuisineFilter = () => {
  const { selectedCuisine, setSelectedCuisine, cuisines } = useRecipes();

  return (
    <div className="cuisine-filter">
      <select
        value={selectedCuisine}
        onChange={(e) => setSelectedCuisine(e.target.value)}
        className="cuisine-select"
      >
        <option value="">All Cuisines</option>
        {cuisines.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CuisineFilter;