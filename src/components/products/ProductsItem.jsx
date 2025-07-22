"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ProductsItem({ product, items, setItems, user }) {
  async function updateCart() {
    const isInCart = items.find((item) => item.id === product.id);
    let newItems;

    if (isInCart) {
      newItems = items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newItems = [...items, { id: product.id, quantity: 1 }];
    }

    setItems(newItems);

    const { error } = await supabase
      .from("Carts")
      .update({ items: newItems })
      .eq("uid", user.id);

    if (error) console.error(error);
  }

  return (
    <motion.div
      className="flex flex-col gap-2"
      initial="rest"
      whileHover="hover"
    >
      <motion.div className="w-full flex justify-center rounded-xl relative aspect-square overflow-hidden">
        <motion.div
          className="w-4/5 absolute bottom-4 z-10"
          variants={{
            rest: { y: 20, opacity: 0 },
            hover: { y: 0, opacity: 1 },
          }}
        >
          <Button
            className="w-full bg-[#4065DD] hover:bg-[#ACB8FE]"
            onClick={updateCart}
          >
            Add to cart
          </Button>
        </motion.div>
        <Link href={`/product/${product.id}`}>
          <Image src={product.image_url} alt="" fill />
        </Link>
        <Link href={`/product/${product.id}`}>
          <motion.div
            className="relative"
            variants={{
              rest: { scale: 1, opacity: 0 },
              hover: { scale: 1.1, opacity: 100 },
            }}
          >
            <img src={product.secondary_image_urls[0]} alt="" />
          </motion.div>
        </Link>
      </motion.div>
      <Link href={`/product/${product.id}`}>
        <motion.div className="flex flex-col text-lg gap-2" whileHover="hover">
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)} SGD</p>
        </motion.div>
      </Link>
    </motion.div>
  );
}
