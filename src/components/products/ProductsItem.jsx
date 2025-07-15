"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

export default function ProductsItem() {
    return (
        <motion.div
            className="flex flex-col gap-2"
            initial="rest"
            whileHover="hover"
        >
            <motion.div
                className="w-full flex justify-center rounded-xl relative aspect-square overflow-hidden"
            >
                <motion.div
                    className="w-4/5 absolute bottom-4 z-10"
                    variants={{
                        rest: { y: 20, opacity: 0 },
                        hover: { y: 0, opacity: 1 }
                    }}  
                >
                    <Button className="w-full bg-[#4065DD] hover:bg-[#ACB8FE]">Add to cart</Button>
                </motion.div>
                <Link href="/product/1">
                    <Image
                        src="/images/bottles.png"
                        alt=""
                        fill
                    />
                </Link>
                <Link href="/product/1">
                    <motion.div
                        className="relative"
                        variants={{
                            rest: { scale: 1, opacity: 0 },
                            hover: { scale: 1.1, opacity: 100 }
                        }} 
                    >
                        <img
                            src="/images/mamiko-bottles.jpg"
                            alt=""
                        />
                    </motion.div>
                </Link>
            </motion.div>
            <Link href="/product/1">
                <motion.div
                    className="flex flex-col text-lg gap-2"
                    whileHover="hover"
                >
                    <h3>Classic SIMONO</h3>
                    <p>$25.<span className="text-sm">00</span> SGD</p>
                </motion.div>
            </Link>
        </motion.div>
    );
}