import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Alphabetically sorted scent options
const ALL_SCENTS = [
  "aldehydic", "almond", "amber", "animalic", "aquatic", "aromatic", "balsamic", "cacao", "caramel", "cherry",
  "chocolate", "cinnamon", "citrus", "coconut", "coffee", "earthy", "floral", "fresh", "fresh spicy", "fruity",
  "green", "honey", "iris", "lactonic", "lavender", "leather", "marine", "metallic", "mossy", "musky", "nutty",
  "ozonic", "patchouli", "powdery", "rose", "rum", "salty", "smoky", "soft spicy", "sweet", "tobacco",
  "tropical", "tuberose", "vanilla", "violet", "warm spicy", "white floral", "woody", "yellow floral"
].sort();

const QuizPage = () => {
  const [preferences, setPreferences] = useState({
    scents: [],
    dislikedScents: [],
    context: [],
    season: "",
    intensity: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [dislikeSearchQuery, setDislikeSearchQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const sectionRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-4");
          } else {
            entry.target.classList.remove("opacity-100", "translate-y-0");
            entry.target.classList.add("opacity-0", "translate-y-4");
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const handleChange = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { preferences };
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/quiz", payload);
      setRecommendations(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to get recommendations.");
    }
  };

  // Filter scents based on search query
  const filteredScents = ALL_SCENTS.filter((scent) =>
    scent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDislikeScents = ALL_SCENTS.filter((scent) =>
    scent.toLowerCase().includes(dislikeSearchQuery.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto p-4 font-work-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">Prompt Crafter</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
        <p className="text-lg text-center md:text-left text-gray-700 max-w-2xl">
          Welcome to the Prompt Crafter! This place is perfect if you're struggling with creating your prompt from scratch.
          Explore and select notes that sounds good for you and some that are not exactly in your style - you exclude them.
          You can also provide a context, season and intensity although it is not necessary.
        </p>
        <img
          src="/logo_standing.png"
          alt="Perfume logo"
          className="w-40 h-40 object-contain rounded-lg"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          ref={(el) => sectionRefs.current[0] = el}
          className="bg-[#fdfaf7] border border-[#e3dac9] p-4 rounded-lg mb-4 opacity-0 translate-y-4 transition-all duration-700"
        >
          <label className="block font-medium">I am looking for perfumes with ... notes</label>
          <input
            type="text"
            placeholder="Search scents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <div className="mb-2">
            <button
              type="button"
              onClick={() =>
                handleChange(
                  "scents",
                  preferences.scents.length === 0 ? [...ALL_SCENTS] : []
                )
              }
              className="text-sm px-3 py-1 rounded text-white bg-[#c4a075] hover:bg-[#a88c61] transition"
            >
              {preferences.scents.length === 0 ? "Select All" : "Clear All"}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-2 max-h-48 overflow-y-auto">
            {filteredScents.map((scent) => (
              <label
                key={scent}
                onClick={() =>
                  handleChange(
                    "scents",
                    preferences.scents.includes(scent)
                      ? preferences.scents.filter((v) => v !== scent)
                      : [...preferences.scents, scent]
                  )
                }
                className={`cursor-pointer transition p-2 rounded ${
                  preferences.scents.includes(scent)
                    ? "bg-[#c4a075] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {scent}
              </label>
            ))}
          </div>
        </div>

        <div
          ref={(el) => sectionRefs.current[1] = el}
          className="bg-[#fdfaf7] border border-[#e3dac9] p-4 rounded-lg mb-4 opacity-0 translate-y-4 transition-all duration-700"
        >
          <label className="block font-medium">although I am not a fan of ...</label>
          <input
            type="text"
            placeholder="Search scents..."
            value={dislikeSearchQuery}
            onChange={(e) => setDislikeSearchQuery(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <div className="mb-2">
            <button
              type="button"
              onClick={() =>
                handleChange(
                  "dislikedScents",
                  preferences.dislikedScents.length === ALL_SCENTS.length ? [] : [...ALL_SCENTS]
                )
              }
              className="text-sm px-3 py-1 rounded text-white bg-[#c4a075] hover:bg-[#a88c61] transition"
            >
              {preferences.dislikedScents.length === ALL_SCENTS.length ? "Clear All" : "Select All"}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-2 max-h-48 overflow-y-auto">
            {filteredDislikeScents.map((scent) => (
              <label
                key={scent}
                onClick={() =>
                  handleChange(
                    "dislikedScents",
                    preferences.dislikedScents.includes(scent)
                      ? preferences.dislikedScents.filter((v) => v !== scent)
                      : [...preferences.dislikedScents, scent]
                  )
                }
                className={`cursor-pointer transition p-2 rounded ${
                  preferences.dislikedScents.includes(scent)
                    ? "bg-[#c4a075] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {scent}
              </label>
            ))}
          </div>
        </div>

        <div
          ref={(el) => sectionRefs.current[2] = el}
          className="bg-[#fdfaf7] border border-[#e3dac9] p-4 rounded-lg mb-4 opacity-0 translate-y-4 transition-all duration-700"
        >
          <label className="block font-medium">I will need them for...</label>
          <select
            onChange={(e) => handleChange("context", [e.target.value])}
            value={preferences.context[0] || ""}
            className="w-full border p-2 rounded mt-2"
          >
            <option value=""> </option>
            <option value="evening">evening</option>
            <option value="daytime">daytime</option>
            <option value="work">work</option>
            <option value="date night">date night</option>
          </select>
        </div>

        <div
          ref={(el) => sectionRefs.current[3] = el}
          className="bg-[#fdfaf7] border border-[#e3dac9] p-4 rounded-lg mb-4 opacity-0 translate-y-4 transition-all duration-700"
        >
          <label className="block font-medium">and use during...</label>
          <select
            onChange={(e) => handleChange("season", e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value=""> </option>
            <option value="summer">summer</option>
            <option value="winter">winter</option>
            <option value="spring">spring</option>
            <option value="autumn">autumn</option>
          </select>
        </div>

        <div
          ref={(el) => sectionRefs.current[4] = el}
          className="bg-[#fdfaf7] border border-[#e3dac9] p-4 rounded-lg mb-4 opacity-0 translate-y-4 transition-all duration-700"
        >
          <label className="block font-medium">with ... intensity:</label>
          <select
            onChange={(e) => handleChange("intensity", e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value=""> </option>
            <option value="light">light</option>
            <option value="moderate">moderate</option>
            <option value="strong">strong</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-[#c4a075] text-white px-6 py-3 text-lg rounded hover:bg-[#a88c61] transition"
        >
          Get Recommendations
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {recommendations.length > 0 && (
        <div
          ref={(el) => sectionRefs.current[5] = el}
          className="bg-transparent p-4 rounded-lg mt-8 relative opacity-100 translate-y-0 transition-all duration-700"
        >
          <button
            onClick={() => setRecommendations([])}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close recommendations"
          >
            ✕
          </button>
          {recommendations.length > 0 && (
            <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
          )}
          <ul>
            {recommendations.map((perfume, i) => (
              <li
                key={i}
                className="bg-transparent p-4 rounded-lg mb-4 transition-all duration-700 opacity-100 translate-y-0 hover:scale-[1.02]"
              >
                <a
                  href={perfume.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-black"
                >
                  {perfume.Name} <span className="font-word-sans">by</span> {perfume.Designer}
                </a>
                <a
                  href={perfume.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline"
                >
                  {perfume.Brand} {perfume.Gender}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
