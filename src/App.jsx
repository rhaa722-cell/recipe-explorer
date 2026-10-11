import { useEffect, useState } from 'react'

const API = 'https://dummyjson.com/recipes?limit=0'

export default function App() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('All')

  const load = async (simulateError = false) => {
    setLoading(true)
    setError('')
    try {
      const url = simulateError ? 'https://dummyjson.com/wrong-url' : API
      const res = await fetch(url)
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setRecipes(data.recipes)
    } catch {
      setError('Oops! We could not load the recipes. Please check your internet and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const cuisines = ['All', ...[...new Set(recipes.map((r) => r.cuisine))].sort()]

  const filtered = recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) &&
      (cuisine === 'All' || r.cuisine === cuisine)
  )

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">Recipe Explorer 🍲</h1>
        <p className="mt-1 text-gray-600">Search recipes and filter by cuisine.</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by recipe name..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none focus:border-indigo-500"
          />
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2"
          >
            {cuisines.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={() => load(true)}
            className="rounded-lg border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Simulate error
          </button>
        </div>

        {loading && (
          <div className="mt-16 flex flex-col items-center gap-3 text-gray-600">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
            <p>Loading recipes...</p>
          </div>
        )}

        {!loading && error && (
          <div className="mt-10 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => load()}
              className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="mt-16 text-center text-gray-500">
            No recipes found for "{search}". Try another name.
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="mt-6 text-sm text-gray-500">{filtered.length} recipes</p>
            <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((r) => (
                <div key={r.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                  <img src={r.image} alt={r.name} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <h2 className="font-semibold text-gray-900">{r.name}</h2>
                    <p className="mt-1 text-sm text-gray-600">Cuisine: {r.cuisine}</p>
                    <p className="text-sm text-gray-600">Difficulty: {r.difficulty}</p>
                    <p className="text-sm text-gray-600">
                      Time: {r.prepTimeMinutes + r.cookTimeMinutes} min
                    </p>
                    <p className="text-sm text-gray-600">Rating: ⭐ {r.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}