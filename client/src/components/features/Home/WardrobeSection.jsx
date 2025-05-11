import wardrobeImg from "../../../assets/WardrobeImage.png";
import FeatureSection from "../../shared/FeatureSection";

export default function WardrobeSection() {
  return (
    <FeatureSection
      title="Perfume wardrobe"
      description="Curated collections of perfumes for every mood and occasion"
      buttonText="Explore"
      image={wardrobeImg}
      imagePosition="left"
    />
  );
}
