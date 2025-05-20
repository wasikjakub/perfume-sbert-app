import React, { useState } from 'react';
import axios from 'axios';

const QuizPage = () => {
  const [preferences, setPreferences] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/quiz', { preferences });
      setRecommendations(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to get recommendations.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Perfume Preference Quiz</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Preferred scents:</label>
          <select multiple onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, o => o.value);
            handleChange('scents', values);
          }} className="w-full border p-2 rounded">
            <option value="Woody">Woody</option>
            <option value="Amber">Amber</option>
            <option value="Floral">Floral</option>
            <option value="Citrus">Citrus</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Preferred context:</label>
          <select multiple onChange={(e) => {
            const values = Array.from(e.target.selectedOptions, o => o.value);
            handleChange('context', values);
          }} className="w-full border p-2 rounded">
            <option value="Evening">Evening</option>
            <option value="Daytime">Daytime</option>
            <option value="Work">Work</option>
            <option value="Date night">Date night</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Preferred season:</label>
          <select onChange={(e) => handleChange('season', e.target.value)} className="w-full border p-2 rounded">
            <option value="">Select</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="autumn">Autumn</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Preferred intensity:</label>
          <select onChange={(e) => handleChange('intensity', e.target.value)} className="w-full border p-2 rounded">
            <option value="">Select</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Strong">Strong</option>
          </select>
        </div>

        <button type="submit" className="bg-[#c4a075] text-white px-6 py-2 rounded hover:bg-[#a88c61]">
          Get Recommendations
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {recommendations.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recommended Perfumes</h2>
          <ul className="space-y-2">
            {recommendations.map((perfume, i) => (
              <li key={i} className="border p-4 rounded shadow">
                <strong>{perfume.Name}</strong><br />
                {perfume.Brand} - {perfume.Gender}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizPage;