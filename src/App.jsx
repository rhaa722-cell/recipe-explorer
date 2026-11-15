import { useEffect } from "react";
import { useStore } from "./store";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";

export default function App() {
  const fetchRecipes = useStore((s) => s.fetchRecipes);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Explorer 🍲</h1>
      <SearchBar />
      <RecipeList />
    </div>
  );
}