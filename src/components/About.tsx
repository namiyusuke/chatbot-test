import Lottie from "lottie-react";
import logoAnimation from "../assets/animations/heroAnimation.json";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });
  console.log(isInView);
  return (
    <section id="about">
      <div ref={ref} className="max-w-[50rem] mx-auto text-center space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
          transition={{
            duration: 0.8,
            damping: 10,
          }}
          className="lg:text-5xl text-2xl leading-[3.5rem] font-bold"
        >
          About
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
          transition={{
            duration: 0.8,
            damping: 10,
          }}
          className="text-xl"
        >
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti suscipit modi, obcaecati aut non sapiente
            nisi esse omnis consequuntur asperiores. Nam aliquid, hic atque in officia harum. Ab, aspernatur placeat!
          </p>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti suscipit modi, obcaecati aut non sapiente
            nisi esse omnis consequuntur asperiores. Nam aliquid, hic atque in officia harum. Ab, aspernatur placeat!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
          transition={{
            duration: 0.8,
            damping: 10,
          }}
          className="py-2"
        >
          <Lottie animationData={logoAnimation} />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
