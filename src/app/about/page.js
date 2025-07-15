"use client";
import Navbar from "@/components/general/navbar";
import Footer from "@/components/general/footer";
import HeroAbout from "@/components/about/hero-about";
import Story from "@/components/about/story";
import Mission from "@/components/about/mission";
import Stats from "@/components/about/stats";
import Grid from "@/components/about/grid";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <HeroAbout />
        <Story />
        <Mission />
        <Stats />
        <Grid />
        <Footer />
      </motion.div>
    </motion.section>
  );
}
