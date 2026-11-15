import { useState } from "react";

const CUISINES = ["Italian", "Pakistani", "Asian", "Mexican", "American", "Other"];
const LEVELS = ["Easy", "Medium", "Hard"];
const empty = {
  name: "", email: "", cuisine: "", difficulty: "",
  date: "", time: "", description: "", image: null,
};

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Recipe name is required.";
  else if (v.name.trim().length < 3) e.name = "Name must be at least 3 characters.";
  if (!v.email.trim()) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (!v.cuisine) e.cuisine = "Please select a cuisine.";
  if (!v.difficulty) e.difficulty = "Please select a difficulty.";
  if (!v.date) e.date = "Date is required.";
  else if (new Date(v.date) > new Date()) e.date = "Date cannot be in the future.";
  if (!v.time) e.time = "Cooking time is required.";
  else if (Number(v.time) < 1 || Number(v.time) > 600) e.time = "Time must be between 1 and 600 minutes.";
  if (!v.description.trim()) e.description = "Description is required.";
  else if (v.description.trim().length < 20) e.description = "Description must be at least 20 characters.";
  if (!v.image) e.image = "Please upload an image.";
  else if (!["image/jpeg", "image/png", "image/webp"].includes(v.image.type))
    e.image = "Only JPG, PNG or WebP images are allowed.";
  else if (v.image.size > 2 * 1024 * 1024) e.image = "Image must be smaller than 2MB.";
  return e;
}

export default function RecipeForm({ onToast }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [simulateFail, setSimulateFail] = useState(false);

  const change = (field, value) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field] || errors[field] !== undefined) setErrors(validate(next));
  };
  const blur = (field) => {
    setTouched({ ...touched, [field]: true });
    setErrors(validate(values));
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched(Object.keys(empty).reduce((a, k) => ({ ...a, [k]: true }), {}));
    if (Object.keys(errs).length > 0) {
      onToast("error", "Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    try {
      const url = simulateFail
        ? "https://dummyjson.com/recipes/add-broken"
        : "https://dummyjson.com/recipes/add";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name, cuisine: values.cuisine,
          difficulty: values.difficulty, cookTimeMinutes: Number(values.time),
        }),
      });
      if (!res.ok) throw new Error("Server error");
      onToast("success", "Recipe submitted successfully!");
      setValues(empty);
      setErrors({});
      setTouched({});
    } catch {
      onToast("error", "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const show = (f) => touched[f] && errors[f];
  const input = (f) =>
    `w-full border rounded px-3 py-2 ${show(f) ? "border-red-500" : "border-gray-300"}`;
  const Err = ({ f }) =>
    show(f) ? <p className="text-red-600 text-sm mt-1">{errors[f]}</p> : null;

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 max-w-2xl">
      <div>
        <label className="block text-sm font-medium mb-1">Recipe name</label>
        <input className={input("name")} value={values.name}
          onChange={(e) => change("name", e.target.value)} onBlur={() => blur("name")} />
        <Err f="name" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input type="email" className={input("email")} value={values.email}
          onChange={(e) => change("email", e.target.value)} onBlur={() => blur("email")} />
        <Err f="email" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cuisine</label>
          <select className={input("cuisine")} value={values.cuisine}
            onChange={(e) => change("cuisine", e.target.value)} onBlur={() => blur("cuisine")}>
            <option value="">Select...</option>
            {CUISINES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <Err f="cuisine" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <select className={input("difficulty")} value={values.difficulty}
            onChange={(e) => change("difficulty", e.target.value)} onBlur={() => blur("difficulty")}>
            <option value="">Select...</option>
            {LEVELS.map((c) => <option key={c}>{c}</option>)}
          </select>
          <Err f="difficulty" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date prepared</label>
          <input type="date" className={input("date")} value={values.date}
            onChange={(e) => change("date", e.target.value)} onBlur={() => blur("date")} />
          <Err f="date" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cooking time (min)</label>
          <input type="number" className={input("time")} value={values.time}
            onChange={(e) => change("time", e.target.value)} onBlur={() => blur("time")} />
          <Err f="time" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea rows={3} className={input("description")} value={values.description}
          onChange={(e) => change("description", e.target.value)} onBlur={() => blur("description")} />
        <Err f="description" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Recipe image (JPG/PNG/WebP, max 2MB)</label>
        <input type="file" accept="image/*" className={input("image")}
          onChange={(e) => change("image", e.target.files[0] || null)} onBlur={() => blur("image")} />
        <Err f="image" />
        {values.image && !errors.image && (
          <img src={URL.createObjectURL(values.image)} alt="Preview"
            className="mt-2 h-24 rounded object-cover" />
        )}
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={simulateFail}
          onChange={(e) => setSimulateFail(e.target.checked)} />
        Simulate server error (demo)
      </label>

      <button type="submit" disabled={submitting}
        className="bg-black text-white rounded px-4 py-2 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
        {submitting && (
          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {submitting ? "Submitting..." : "Submit Recipe"}
      </button>
    </form>
  );
}