import { motion } from "framer-motion";
const Hero = () => {
  return (
    <div>
      <main>
        <div className="text-center py-14 max-w-[50rem] mx-auto mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold leading-[3.5rem]"
          >
            With React coding interface coding interface
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.2,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="md:w-[440px] mx-auto"
          ></motion.div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
