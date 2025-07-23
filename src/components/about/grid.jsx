"use client";
import Image from "next/image";
import { motion } from "framer-motion";

// Variants for orchestrating the mobile animations
const mobileGridContainer = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemLeft = {
  hidden: { x: -40, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemRight = {
  hidden: { x: 40, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const itemCenter = {
  hidden: { scale: 0.7, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", type: "spring", stiffness: 100 },
  },
};

// Variants for the nested text inside the center block
const centerTextContainer = {
    show: {
        transition: {
            staggerChildren: 0.2,
        }
    }
}
const centerTextH2 = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
}
const centerTextP = {
    hidden: { y: 10, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
}


export default function Grid() {
  return (
    <motion.section
      className="min-h-[30vh] md:h-[50vw] p-2.5 px-4 sm:px-8 md:px-16 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Mobile Layout -- REFACTORED */}
      <motion.div
        className="md:hidden grid grid-cols-2 gap-2.5 h-full"
        variants={mobileGridContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Top row - two images */}
        <motion.div
          className="aspect-square overflow-hidden rounded-tl-xl relative"
          variants={itemLeft}
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
            sizes="50vw"
          />
        </motion.div>

        <motion.div
          className="aspect-square overflow-hidden rounded-tr-xl relative"
          variants={itemRight}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src="/images/grid2.png"
            className="object-cover"
            alt="placeholder"
            fill
            sizes="50vw"
          />
        </motion.div>

        {/* Center logo */}
        <motion.div
          className="col-span-2 aspect-[2/1] flex items-center justify-center bg-sky-100"
          variants={itemCenter}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          <motion.div
            className="flex flex-col gap-1 text-center"
            variants={centerTextContainer}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-[#4065DD]"
              variants={centerTextH2}
            >
              Mamiko
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-[#4c6dd9]"
              variants={centerTextP}
            >
              まみこ
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Bottom row - two images */}
        <motion.div
          className="aspect-square overflow-hidden rounded-bl-xl relative"
          variants={itemLeft}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src="/images/grid3.png"
            className="object-cover"
            alt="placeholder"
            fill
            sizes="50vw"
          />
        </motion.div>

        <motion.div
          className="aspect-square overflow-hidden rounded-br-xl relative"
          variants={itemRight}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src="/images/grid4.png"
            className="object-cover"
            alt="placeholder"
            fill
            sizes="50vw"
          />
        </motion.div>
      </motion.div>

      {/* Desktop Layout -- UNCHANGED */}
      <div className="hidden md:grid h-full grid-cols-5 grid-rows-3 gap-2.5">
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
            sizes="20vw"
          />
        </motion.div>

        {/* Right-side */}
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
            sizes="40vw"
          />
        </motion.div>

        {/* Left-side image */}
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
            sizes="40vw"
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
              className="lg:text-4xl md:text-3xl font-bold text-[#4065DD]"
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
              className="lg:text-2xl md:text-xl text-[#4c6dd9]"
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
            sizes="40vw"
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
            sizes="20vw"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
