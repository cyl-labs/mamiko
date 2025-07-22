"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Stats() {
  const statsData = [
    { number: "20K+", label: "Satisfied Customers", delay: 0.2 },
    { number: "16K+", label: "Products Sold", delay: 0.4 },
    { number: "2K+", label: "Products Made", delay: 0.6 },
  ];

  return (
    <motion.section
      className="pb-[100px] px-4 sm:px-8 md:px-16 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] rounded-3xl text-[#3D3C3B]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="relative min-h-[350px] sm:min-h-[400px] md:min-h-[500px] rounded-3xl overflow-visible"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* Background Image */}
        <Image
          src="/images/statistics.png"
          width={1312}
          height={500}
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        />

        {/* Stats Content */}
        <div className="absolute inset-0 flex flex-row justify-center items-center z-10 gap-8 sm:gap-16 md:gap-24 lg:gap-36 text-[#4065DD] px-4 sm:px-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.6 + stat.delay,
                ease: "easeOut",
              }}
            >
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-2 sm:mb-3 md:mb-4 harmonia-bold"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + stat.delay,
                  ease: "easeOut",
                }}
              >
                {stat.number}
              </motion.h2>
              <motion.p
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl harmonia-regular leading-tight"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 1 + stat.delay,
                  ease: "easeOut",
                }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
