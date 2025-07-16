"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Grid() {
  return (
    <motion.section
      className="grid min-h-[720px] grid-cols-5 grid-rows-3 gap-2.5 p-2.5 px-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Top-left image */}
      <motion.div
        className="col-span-2 overflow-hidden rounded-tl-xl relative"
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
      >
        <Image
          src="/images/grid1.png"
          className="object-cover"
          alt="placeholder"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </motion.div>

      {/* Top-middle image */}
      <motion.div
        className="overflow-hidden relative"
        initial={{ y: -40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.3 },
        }}
      >
        <Image
          src="/images/grid2.png"
          className="object-cover"
          alt="placeholder"
          fill
          sizes="(max-width: 768px) 100vw, 20vw"
        />
      </motion.div>

      {/* Right-side image (spans 2 rows) */}
      <motion.div
        className="col-span-2 row-span-2 overflow-hidden rounded-tr-xl relative"
        initial={{ x: 40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.3 },
        }}
      >
        <Image
          src="/images/grid3.png"
          className="object-cover"
          alt="placeholder"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </motion.div>

      {/* Left-side image (spans 2 rows) */}
      <motion.div
        className="col-span-2 row-span-2 overflow-hidden rounded-bl-xl relative"
        initial={{ x: -40, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        whileHover={{
          scale: 1.01,
          transition: { duration: 0.3 },
        }}
      >
        <Image
          src="/images/grid4.png"
          className="object-cover"
          alt="placeholder"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </motion.div>

      {/* Center logo */}
      <motion.div
        className="flex items-center justify-center bg-sky-100"
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        <motion.div
          className="flex flex-col gap-2 text-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: "easeOut",
          }}
        >
          <motion.h2
            className="text-5xl font-bold text-[#4065DD]"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 1,
              ease: "easeOut",
            }}
          >
            Mamiko
          </motion.h2>
          <motion.p
            className="text-3xl text-[#4c6dd9]"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: 1.2,
              ease: "easeOut",
            }}
          >
            まみこ
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Bottom-middle image */}
      <motion.div
        className="col-span-2 overflow-hidden relative"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
      >
        <Image
          src="/images/grid5.png"
          className="object-cover"
          alt="placeholder"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </motion.div>

      {/* Bottom-right image */}
      <motion.div
        className="overflow-hidden rounded-br-xl relative"
        initial={{ x: 40, y: 40, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.3 },
        }}
      >
        <Image
          src="/images/grid6.png"
          className="object-cover"
          alt="placeholder"
          fill
          sizes="(max-width: 768px) 100vw, 20vw"
        />
      </motion.div>
    </motion.section>
  );
}
