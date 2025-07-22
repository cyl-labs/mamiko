"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Mission() {
  return (
    <motion.section
      className="px-8 md:px-16 pb-[40px] md:pb-[100px] flex md:flex-row flex-col justify-center gap-8 md:gap-12 lg:gap-28 items-center max-w-[1600px] mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="story-right relative overflow-visible"
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* Glow effect*/}
        <motion.div
          className="absolute rounded-3xl"
          style={{
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            boxShadow: `
              0 0 20px rgba(230, 183, 36, 0.4),
              0 0 40px rgba(230, 183, 36, 0.3),
              0 0 60px rgba(230, 183, 36, 0.2),
              inset 0 0 20px rgba(230, 183, 36, 0.1)
            `,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Image
            alt="Story Image"
            src="/images/mission.png"
            width={544}
            height={544}
            className="rounded-3xl relative z-10 xl:max-w-[544px] lg:max-w-[480px] max-w-[288px] aspect-square"
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="story-left max-w-[800px]"
        initial={{ x: 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <motion.h2
          className="text-[#E6B724] xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <b>私たちの使命</b>
        </motion.h2>
        <motion.div
          className="rounded-4xl bg-[#B1D5ED] items-center justify-center flex px-5 md:px-6 py-2 md:py-3 my-4 lg:my-6 xl:my-8 w-fit"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
        >
          <p className="harmonia-bold md:text-2xl text-md text-[#4065DD]">Our Mission</p>
        </motion.div>
        <motion.p
          className="xl:text-2xl lg:text-xl md:text-lg text-md harmonia-regular"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
        >
          MothersCo began with a simple but powerful idea, that everyday kitchen
          tools should offer more than just function. They should be
          thoughtfully designed, beautifully crafted, and built to last.
          Frustrated by cluttered countertops and uninspired storage solutions,
          we set out to create something better.
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
