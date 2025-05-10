import { useState } from "react";

export function useRecommendations() {
  const [prompt, setPrompt] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [freshSearch, setFreshSearch] = useState(false);

  const handleSearch = async () => {
    if (!prompt) return;
    setLoading(true);
    setRecommendations([]);
    setFreshSearch(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearRecommendations = () => {
    setRecommendations([]);
    setFreshSearch(false);
  };

  return {
    prompt,
    setPrompt,
    recommendations,
    loading,
    freshSearch,
    handleSearch,
    clearRecommendations,
  };
}
