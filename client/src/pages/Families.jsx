import React, { useState } from "react";
import familiesData from "../assets/families.json";

const Families = () => {
  const [expandedFamily, setExpandedFamily] = useState(null);
  const [showScentsFor, setShowScentsFor] = useState(null);

  const toggleFamily = (family) => {
    if (expandedFamily === family) {
      setExpandedFamily(null);
      setShowScentsFor(null);
    } else {
      setExpandedFamily(family);
      setShowScentsFor(null);
    }
  };

  const toggleScents = (family) => {
    if (showScentsFor === family) {
      setShowScentsFor(null);
    } else {
      setShowScentsFor(family);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-work-sans mb-16">
      <h1 className="text-4xl font-extrabold mb-4 text-center text-[black] tracking-wide select-none">
        Fragrance Families
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-8 max-w-5xl mx-auto">
        <p className="text-lg text-center md:text-left text-gray-700 max-w-2xl">
          Perfumes can express your personality, mood and vibe. Choosing the right fragrance is about finding one that truly resonates with how you feel - here you can get inspired. 
          Explore the most prominent fragrance families and click on any that interest you to learn more and discover example scents, which can later be included in your prompt.
        </p>
        <img
          src="/logo_standing.png"
          alt="Perfume illustration"
          className="w-48 h-48 object-contain rounded-lg"
        />
      </div>

      <ul className="space-y-6 mt-10">
        {familiesData.map(({ family, description, nodes }) => (
          <li
            key={family}
            className="rounded-2xl transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer p-6 text-center"
          >
            <div
              className="text-3xl font-semibold text-[black] hover:text-[#a88c61] select-none"
              aria-expanded={expandedFamily === family}
              role="button"
              tabIndex={0}
              onClick={() => toggleFamily(family)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  toggleFamily(family);
                }
              }}
            >
              {family}
            </div>

            <div
              className={`mt-4 max-h-0 overflow-hidden transition-all duration-500 ease-in-out ${
                expandedFamily === family ? "max-h-96 opacity-100" : "opacity-0"
              }`}
              style={{ transitionProperty: "max-height, opacity" }}
            >
              <p className="text-gray-700 text-lg leading-relaxed select-text">
                {description}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent toggling family collapse
                  toggleScents(family);
                }}
                className="mt-5 inline-block bg-[#c4a075] text-white px-5 py-2 rounded-full font-medium tracking-wide shadow-md hover:bg-[#a88c61] transition-colors duration-300 select-none"
                aria-expanded={showScentsFor === family}
              >
                {showScentsFor === family
                  ? "hide"
                  : "examples"}
              </button>

              <ul
                className={`list-disc list-inside mt-4 text-gray-800 space-y-1 overflow-hidden transition-all duration-500 ease-in-out ${
                  showScentsFor === family
                    ? "max-h-72 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
                style={{ transitionProperty: "max-height, opacity" }}
              >
                {nodes.map((node, i) => (
                  <li key={i} className="select-text">
                    {node}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Families;