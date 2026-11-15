import { create } from "zustand";

const URL = "https://dummyjson.com/recipes?limit=50";

export const useStore = create((set, get) => ({
  recipes: [],
  loading: true,
  error: null,
  search: "",
  cuisine: "All",
  showFavs: false,
  favorites: [],
  simulateError: false,

  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(get().simulateError ? URL + "-broken" : URL);
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      set({ recipes: data.recipes });
    } catch (e) {
      set({ error: "Oops! Something went wrong while loading data." });
    } finally {
      set({ loading: false });
    }
  },

  setSearch: (search) => set({ search }),
  setCuisine: (cuisine) => set({ cuisine }),
  toggleShowFavs: () => set((s) => ({ showFavs: !s.showFavs })),
  clearFilters: () => set({ search: "", cuisine: "All", showFavs: false }),
  toggleFavorite: (id) =>
    set((s) => ({
      favorites: s.favorites.includes(id)
        ? s.favorites.filter((f) => f !== id)
        : [...s.favorites, id],
    })),
  toggleSimulateError: () => {
    set((s) => ({ simulateError: !s.simulateError }));
    get().fetchRecipes();
  },
}));