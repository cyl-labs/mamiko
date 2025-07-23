"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HandHeart, Baby } from "lucide-react";

export default function HomeWhyUs() {
  return (
    <div className="mt-24 flex items-center gap-16 max-lg:gap-8 max-md:flex-col">
      <div className="w-1/2 flex flex-col max-md:w-full max-md:items-center">
        <h2 className="text-8xl text-[#e6b724] font-bold max-lg:text-5xl max-md:text-center">
          なぜ私たち
        </h2>
        <div className="rounded-4xl bg-[#b1d5ed] justify-center items-center flex px-8 py-3 my-8 w-fit max-lg:px-6 max-lg:py-2">
          <p className="text-2xl text-[#4065dd] font-bold max-lg:text-lg">
            Why Us?
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-md:text-center">
            <motion.h3
              className="text-5xl font-bold max-xl:text-4xl max-lg:text-3xl"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Thoughtfully made for{" "}
              <span className="text-[#e6b724] dm-serif-text font-normal">
                everyday comfort
              </span>{" "}
              and{" "}
              <span className="text-[#e6b724] dm-serif-text font-normal">
                convenience
              </span>
            </motion.h3>
            <motion.p
              className="text-xl max-xl:text-lg max-lg:text-base"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Where little moments make lasting memories, welcome to Mamiko,
              your home for everyday essentials built with love.
            </motion.p>
          </div>
          <div className="flex flex-col gap-10 max-md:flex-row max-sm:flex-col">
            <motion.div
              className="flex items-center gap-4 max-md:w-1/2 max-md:justify-center max-sm:w-full"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <HandHeart size={48} />
              <div>
                <p className="text-2xl font-bold max-lg:text-xl max-lg:text-lg">
                  Comfort Comes First
                </p>
                <p className="text-xl max-xl:text-lg max-lg:text-base">
                  Everything we make puts your baby's comfort first.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center gap-4 max-md:w-1/2 max-md:justify-center max-sm:w-full"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Baby size={48} />
              <div>
                <p className="text-2xl font-bold max-xl:text-xl max-lg:text-lg">
                  Built for Busy Days
                </p>
                <p className="text-xl max-xl:text-lg max-lg:text-base">
                  Smart designs that support you through everyday.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-center max-md:w-full">
        <div
          className="
            w-full min-w-[600px] max-w-[600px] min-h-[600px] max-h-[600px] relative
            max-xl:min-w-[500px] max-xl:max-w-[500px] max-xl:min-h-[500px] max-xl:max-h-[500px]
            max-lg:min-w-[400px] max-lg:max-w-[400px] max-lg:min-h-[400px] max-lg:max-h-[400px]
        "
        >
          <div className="w-full absolute aspect-square top-1/2 left-1/2 -translate-x-2/5 -translate-y-1/2 z-10 max-md:-translate-x-1/2">
            <Image src="/images/why-us-baby.png" alt="" fill />
          </div>
          <motion.div
            className="w-1/2 absolute aspect-square left-[0%] top-[15%] rotate-310 max-md:left-[-10%] max-sm:hidden"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Image src="/images/bottles.png" alt="" fill />
          </motion.div>
          <motion.div
            className="w-2/3 absolute aspect-square left-[-10%] bottom-[-25%] rotate-235 max-md:left-[-20%] max-sm:hidden"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Image src="/images/training-cups.png" alt="" fill />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
