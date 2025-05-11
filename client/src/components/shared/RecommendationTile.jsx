export default function RecommendationTile({ perfume, index, freshSearch }) {
  return (
    <a
      href={perfume.URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg shadow hover:bg-[rgba(255,255,255,0.9)] transition-colors recommendation-tile"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        animation: freshSearch
          ? `fadeIn 0.5s ease-in ${index * 0.3}s forwards`
          : "none",
        opacity: freshSearch ? 0 : 1,
      }}
    >
      <strong className="text-xl text-[#1D0200]">
        {perfume.Name} by {perfume.Designer}
      </strong>
    </a>
  );
}
