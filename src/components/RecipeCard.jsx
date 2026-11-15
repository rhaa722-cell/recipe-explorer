import { useStore } from "../store";

export default function RecipeCard({ recipe }) {
  const isFav = useStore((s) => s.favorites.includes(recipe.id));
  const toggleFavorite = useStore((s) => s.toggleFavorite);

  return (
    <div className="border rounded p-3 shadow-sm relative">
      <button
        onClick={() => toggleFavorite(recipe.id)}
        className="absolute top-5 right-5 bg-white rounded-full w-8 h-8 shadow"
      >
        {isFav ? "❤️" : "🤍"}
      </button>
      <img src={recipe.image} alt={recipe.name} className="w-full h-28 object-cover rounded" />
      <h2 className="font-semibold mt-2 text-sm">{recipe.name}</h2>
      <p className="text-sm">Cuisine: {recipe.cuisine}</p>
      <p className="text-sm">Rating: ⭐ {recipe.rating}</p>
    </div>
  );
}