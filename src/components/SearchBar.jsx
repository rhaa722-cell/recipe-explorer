import { useStore } from "../store";

export default function SearchBar() {
  const search = useStore((s) => s.search);
  const cuisine = useStore((s) => s.cuisine);
  const recipes = useStore((s) => s.recipes);
  const showFavs = useStore((s) => s.showFavs);
  const favCount = useStore((s) => s.favorites.length);
  const setSearch = useStore((s) => s.setSearch);
  const setCuisine = useStore((s) => s.setCuisine);
  const toggleShowFavs = useStore((s) => s.toggleShowFavs);
  const simulateError = useStore((s) => s.simulateError);
  const toggleSimulateError = useStore((s) => s.toggleSimulateError);

  const cuisines = ["All", ...new Set(recipes.map((r) => r.cuisine))];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        className="border rounded px-3 py-2 flex-1 min-w-[200px]"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="border rounded px-3 py-2"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
      >
        {cuisines.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <button
        className={`border rounded px-3 py-2 text-sm ${showFavs ? "bg-red-100" : ""}`}
        onClick={toggleShowFavs}
      >
        ❤️ Favorites ({favCount})
      </button>
      <button className="border rounded px-3 py-2 text-sm" onClick={toggleSimulateError}>
        {simulateError ? "Turn Error Off" : "Simulate Error"}
      </button>
    </div>
  );
}