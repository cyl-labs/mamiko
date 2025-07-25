"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroAbout() {
  return (
    <div className="relative z-20 mx-8 md:mx-16">
      <div className="bg-[#e0f0f9] rounded-3xl relative overflow-hidden aspect-[13/6] z-10 max-sm:aspect-[4/5]">
        <div className="w-full h-full flex flex-col justify-center items-center gap-8">
          <div className="flex flex-col relative px-4 gap-[clamp(0px,1vw,16px)] z-10">
            <motion.h1
              className="text-6xl font-bold text-[clamp(28px,4vw,64px)] text-center"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Changing{" "}
              <span className="text-[#e6b724] dm-serif-text font-normal">
                Little Lives
              </span>
              ,
              <br /> One Product at a Time
            </motion.h1>
            <motion.p
              className="text-xl text-[clamp(16px,1.5vw,20px)] text-center"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Join the growing community who choose Mamiko every day.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="relative z-10"
          >
          </motion.div>
          <motion.div className="w-3/5 absolute left-[-30%] top-[-55%] rotate-330 aspect-square max-sm:w-2/3 max-sm:left-[-30%] max-sm:top-[-20%]">
            <Image src="/images/wipes.png" alt="" fill />
          </motion.div>
          <div className="w-1/3 absolute left-[-10%] bottom-[-20%] rotate-40 aspect-square max-sm:w-1/2 max-sm:left-[-20%] max-sm:bottom-[-10%] max-sm:rotate-20">
            <Image src="/images/bottles.png" alt="" fill />
          </div>
          <div className="w-1/2 absolute left-[15%] bottom-[-48%] aspect-square max-sm:w-3/5 max-sm:left-[15%] max-sm:bottom-[-15%]">
            <Image src="/images/training-cups.png" alt="" fill />
          </div>
          <div className="w-3/5 absolute right-[-20%] bottom-[-45%] rotate-330 aspect-square max-sm:w-2/3 max-sm:right-[-30%] max-sm:bottom-[-15%]">
            <Image src="/images/crocodile.png" alt="" fill />
          </div>
          <div className="w-1/2 absolute right-[-20%] top-[-30%] rotate-280 aspect-square max-sm:w-3/5 max-sm:right-[-15%] max-sm:top-[-15%] max-sm:rotate-220">
            <Image src="/images/training-bottles.png" alt="" fill />
          </div>
        </div>
      </div>
      <div className="w-full bg-[#e6b724] rounded-3xl absolute blur-xl aspect-[13/6] top-0 max-sm:aspect-[4/5]"></div>
    </div>
  );
}
