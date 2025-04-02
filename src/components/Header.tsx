import { motion } from "framer-motion";
const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.2,
        delay: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      className="flex justify-between items-center py-3"
    >
      <h1 className="md:text-2xl lg:text-3xl font-bold">
        <a href="/">React Website</a>
      </h1>
      <nav className="hidden md:block">
        <ul className="flex gap-4 font-medium">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#service">About</a>
          </li>
          <li>
            <a href="#ourmision">Our Mission</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;
