import quizImg from "../../../assets/QuizImage.png";
import FeatureSection from "../../shared/FeatureSection";

export default function QuizSection() {
  return (
    <FeatureSection
      title="Not sure what to choose?"
      description="Take our short quiz, tell us about your preferences and we will recommend a personalized scent just for you."
      buttonText="Start quiz"
      image={quizImg}
      imagePosition="right"
      buttonLink="/quiz"
    />
  );
}
