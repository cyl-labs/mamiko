"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroAbout() {
  return (
    <motion.section
      className="pb-[100px] px-16 min-h-[600px] rounded-3xl text-[#3D3C3B]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="relative min-h-[600px] rounded-3xl overflow-visible"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      >
        {/* Background Image */}
        <Image
          src="/images/heroabout.png"
          width={1312}
          height={600}
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          alt="About Hero Image"
        />

        {/* Glow effect */}
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
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] text-center pb-24">
          <motion.div
            className="rounded-4xl bg-[#B1D5ED] items-center justify-center flex px-6 py-3 mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <p className="harmonia-bold text-2xl text-[#4065DD]">About Us</p>
          </motion.div>

          <motion.h2
            className="text-6xl mb-4 harmonia-bold"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          >
            Changing <span className="italic text-[#E6B724]">Little Lives</span>
            ,
            <br />
            One Product at a Time
          </motion.h2>

          <motion.h4
            className="text-2xl harmonia-regular"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
          >
            Join the growing community who choose Mamiko every day
          </motion.h4>
        </div>
      </motion.div>
    </motion.section>
  );
}
