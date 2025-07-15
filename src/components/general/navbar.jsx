"use client";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const navItems = ["Home", "Products", "About"];

  return (
    <motion.section
      className="py-12 px-16 flex flex-row justify-between text-center items-center"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-left flex flex-row gap-28">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <Image
            src="/images/logo.png"
            width={114}
            height={0}
            alt="Mamiko Logo"
          />
        </motion.div>
        <motion.div
          className="flex flex-row gap-16 text-xl text-center items-center harmonia-regular"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          {navItems.map((item, index) => (
            <motion.p
              key={item}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.4 + index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="cursor-pointer"
            >
              {item}
            </motion.p>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="nav-right flex flex-row gap-9"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <motion.div
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <CircleUserRound size={32} className="cursor-pointer" />
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart size={32} className="cursor-pointer" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
