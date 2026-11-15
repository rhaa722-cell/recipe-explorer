import { useEffect, useState } from "react";

const URL = "https://dummyjson.com/recipes?limit=50";

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [forceError, setForceError] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(forceError ? URL + "-broken" : URL);
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setItems(data.recipes);
    } catch (e) {
      setError("Oops! Something went wrong while loading data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [forceError]);

  const filtered = items.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Explorer</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="border rounded px-3 py-2 text-sm"
          onClick={() => setForceError(!forceError)}
        >
          {forceError ? "Turn Error Off" : "Simulate Error"}
        </button>
      </div>

      {loading && (
        <p className="text-center py-10 animate-pulse">Loading recipes...</p>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded text-center">
          <p>{error}</p>
          <button onClick={load} className="mt-2 underline">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-center py-10">No recipes found.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {!loading &&
          !error &&
          filtered.map((r) => (
            <div key={r.id} className="border rounded p-3 shadow-sm">
              <img
                src={r.image}
                alt={r.name}
                className="w-full h-28 object-cover rounded"
              />
              <h2 className="font-semibold mt-2 text-sm">{r.name}</h2>
              <p className="text-sm">Cuisine: {r.cuisine}</p>
              <p className="text-sm">Rating: {r.rating}</p>
            </div>
          ))}
      </div>
    </div>
  );
}