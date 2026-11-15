import { useEffect, useState } from "react";
import { useStore } from "./store";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";

export default function App() {
  const fetchRecipes = useStore((s) => s.fetchRecipes);
  const [tab, setTab] = useState("recipes");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Explorer 🍲</h1>

      <div className="flex gap-2 mb-4">
        {["recipes", "submit"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`border rounded px-3 py-1 text-sm ${tab === t ? "bg-black text-white" : ""}`}>
            {t === "recipes" ? "Recipes" : "Submit a Recipe"}
          </button>
        ))}
      </div>

      {tab === "recipes" ? (
        <>
          <SearchBar />
          <RecipeList />
        </>
      ) : (
        <RecipeForm onToast={showToast} />
      )}

      {toast && (
        <div role="alert"
          className={`fixed top-4 right-4 px-4 py-3 rounded shadow text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
