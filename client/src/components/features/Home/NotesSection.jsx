import notesImage from "../../../assets/NotesImage.png";
import FeatureSection from "../../shared/FeatureSection";

export default function QuizSection() {
  return (
    <FeatureSection
      title="Fragnance families"
      description="Learn more about the different types of fragnance notes."
      buttonText="Learn more"
      image={notesImage}
      imagePosition="right"
    />
  );
}
