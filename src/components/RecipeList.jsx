import { useStore } from "../store";
import RecipeCard from "./RecipeCard";

function SkeletonCard() {
  return (
    <div className="border rounded p-3 animate-pulse">
      <div className="bg-gray-200 h-28 rounded" />
      <div className="bg-gray-200 h-4 rounded mt-3 w-3/4" />
      <div className="bg-gray-200 h-3 rounded mt-2 w-1/2" />
      <div className="bg-gray-200 h-3 rounded mt-2 w-1/3" />
    </div>
  );
}

export default function RecipeList() {
  const { recipes, loading, error, search, cuisine, showFavs, favorites } = useStore();
  const fetchRecipes = useStore((s) => s.fetchRecipes);
  const clearFilters = useStore((s) => s.clearFilters);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded text-center">
        <p>{error}</p>
        <button onClick={fetchRecipes} className="mt-2 underline">Retry</button>
      </div>
    );
  }

  const filtered = recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) &&
      (cuisine === "All" || r.cuisine === cuisine) &&
      (!showFavs || favorites.includes(r.id))
  );

  if (filtered.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-3">{showFavs && favorites.length === 0 ? "💔" : "🍽️"}</div>
        <p className="font-semibold">
          {showFavs && favorites.length === 0 ? "No favorites yet" : "No recipes found"}
        </p>
        <p className="text-sm text-gray-500 mb-3">
          {showFavs && favorites.length === 0
            ? "Tap the heart on a recipe to save it here."
            : "Try a different search or cuisine."}
        </p>
        <button onClick={clearFilters} className="border rounded px-3 py-1 text-sm">
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {filtered.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}