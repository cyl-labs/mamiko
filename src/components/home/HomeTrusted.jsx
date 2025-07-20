"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Button } from "../ui/button";

export default function HomeTrusted() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotationOffset = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div className="mt-32">
      <div className="relative w-full h-[1000px] flex justify-center items-center">
        <div className="flex flex-col items-center absolute gap-4 top-[25%] z-10">
          <h3 className="flex flex-col text-5xl font-bold text-center gap-4 max-xl:text-4xl">
            <span className="text-[#e6b724] dm-serif-text font-normal">
              Over 3,000
            </span>
            <p>Products Sold Last Month</p>
          </h3>
          <p className="text-xl text-center max-xl:text-lg max-lg:text-base">
            Join the growing community who choose Mamiko every day.
          </p>
          <Button className="w-fit mt-4">Store</Button>
        </div>
        <motion.div
          className="absolute flex items-center justify-center pt-24"
          style={{ rotate: rotationOffset }}
          ref={ref}
        >
          {[...Array(12)].map((_, i) => {
            const radius = 1440 / 3;
            const angle = (Math.PI / 10) * i - Math.PI;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);

            return (
              <div
                key={i}
                className="absolute w-[100px] h-[100px] rounded-full border-2 border-[#b1d5ed] bg-white overflow-hidden"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
              >
                <Image src="/images/mamiko-bottles.jpg" alt="" fill />
              </div>
            );
          })}
        </motion.div>
        <div className="w-screen h-1/3 absolute bg-white blur-2xl bottom-[-5%] z-20"></div>
        <div className="w-1/6 h-1/2 absolute bg-white blur-xl left-[-10%] bottom-0 z-20"></div>
        <div className="w-1/6 h-1/2 absolute bg-white blur-xl right-[-10%] bottom-0 z-20"></div>
        <div className="w-full h-1/2 absolute bottom-[10%] z-10 max-lg:bottom-[15%]">
          <Image
            className="object-cover"
            src="/images/clouds.png"
            alt=""
            fill
          />
        </div>
        <div className="h-1/4 absolute right-[20%] bottom-[30%] rotate-10 aspect-[3/4] max-xl:right-[15%] max-md:right-[5%]">
          <Image
            className="object-cover"
            src="/images/lion-stick.png"
            alt=""
            fill
          />
        </div>
        <div className="h-1/4 absolute left-[20%] bottom-[30%] rotate-350 aspect-[3/4] max-xl:left-[15%] max-md:left-[5%]">
          <Image
            className="object-cover"
            src="/images/elephant-stick.png"
            alt=""
            fill
          />
        </div>
      </div>
    </div>
  );
}
