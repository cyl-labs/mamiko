"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ProductsItem({
  user,
  product,
  items,
  setItems,
  wishlist,
  setWishlist,
}) {
  async function updateCart() {
    if (user) {
      const isInCart = items.find((item) => item.id === product.id);
      let newItems;

      if (isInCart) {
        newItems = items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
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
      else toast(`${product.name} has been added to cart!`);
    } else {
      const guestCart = localStorage.getItem("guestCart");
      const guestItems = guestCart ? JSON.parse(guestCart) : [];
      const isInCart = guestItems.find((item) => item.id === product.id);
      let newItems;

      if (isInCart) {
        newItems = guestItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...guestItems, { id: product.id, quantity: 1 }];
      }

      localStorage.setItem("guestCart", JSON.stringify(newItems));
    }
  }

  async function updateWishlist() {
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    let newWishlist;

    if (isInWishlist)
      newWishlist = wishlist.filter((item) => item.id !== product.id);
    else newWishlist = [...wishlist, { id: product.id }];

    const { error } = await supabase
      .from("Wishlists")
      .update({ items: newWishlist })
      .eq("uid", user.id);

    if (error) console.error(error);
    else setWishlist(newWishlist);
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
            className="w-full hover:cursor-pointer bg-[#4065DD] hover:bg-[#404bdd]"
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
      <div className="flex flex-col gap-1 w-full">
        <Link href={`/product/${product.id}`}>
          <motion.div
            className="flex flex-col text-lg gap-1 max-sm:text-base"
            whileHover="hover"
          >
            <div className="flex justify-between">
              <h3>{product.name}</h3>
              <Button
                variant="link"
                className="w-7 h-7 !p-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateWishlist();
                }}
              >
                <motion.div
                  key={wishlist.some((item) => item.id === product.id)}
                  whileHover={{ scale: 1.2 }}
                >
                  <Heart
                    className={`min-w-5 min-h-5 transition-colors duration-300 ${
                      wishlist.some((item) => item.id === product.id)
                        ? "text-[#ed5471] fill-[#ffbdc0]"
                        : ""
                    }`}
                  />
                </motion.div>
              </Button>
            </div>
            <p>${product.price.toFixed(2)} SGD</p>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
