"use client";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "About", link: "/about" }
  ];

  return (
    <motion.section
      className="py-12 px-16 flex flex-row justify-between text-center items-center"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-left flex flex-row gap-28">
        <Link href="/">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <Image
              src="/images/logo.png"
              width={120}
              height={0}
              alt="Mamiko Logo"
            />
          </motion.div>
        </Link>
        <motion.div
          className="flex flex-row gap-16 text-xl text-center items-center harmonia-regular"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          {navItems.map((item, index) => (
            <Link key={index} href={item.link}>
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                whileHover={{
                  scale: 1.1
                }}
              >
                {item.name}
              </motion.p>
            </Link>
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
            scale: 1.1
          }}
          whileTap={{ scale: 0.95 }}
        >
          <CircleUserRound size={28} className="cursor-pointer" />
        </motion.div>
        <motion.div
          whileHover={{
            scale: 1.1
          }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingCart size={28} className="cursor-pointer" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
