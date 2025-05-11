import { motion } from "framer-motion";

export default function FeatureSection({
  title,
  description,
  buttonText,
  image,
  imagePosition = "right",
  onClick,
}) {
  const isImageLeft = imagePosition === "left";

  return (
    <motion.section
      className="mt-16 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative max-w-5xl mx-auto bg-[#fdf5f2] rounded-xl shadow-md py-20 px-10 overflow-hidden flex flex-col md:flex-row items-center min-h-[400px]">
        {/* Image */}
        <div
          className={`md:w-1/2 h-full absolute top-0 ${isImageLeft ? "left-0" : "right-0"} hidden md:block`}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(to ${
                isImageLeft ? "left" : "right"
              }, rgba(253, 245, 242, 1) 0%, rgba(253, 245, 242, 0.6) 20%, rgba(253, 245, 242, 0) 40%), url(${image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: `center ${isImageLeft ? "left" : "right"}`,
            }}
          />
        </div>

        {/* Text */}
        <div
          className={`md:w-1/2 z-10 ${
            isImageLeft ? "md:ml-auto text-right" : "text-left"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600 text-2xl mb-8">{description}</p>
          <button
            onClick={onClick}
            className="bg-[#c4a075] text-white font-semibold px-8 py-4 rounded-full text-3xl hover:bg-[#b18b60] transition"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
