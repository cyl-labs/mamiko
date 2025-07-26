"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export default function AccountWishlist({ user }) {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);

  async function selectWishlist() {
    const { data, error } = await supabase
      .from("Wishlists")
      .select("*")
      .eq("uid", user.id)
      .single();

    if (error) console.error(error);
    else {
      console.log(data.items);
      setWishlist(data.items);
    }
  }

  async function selectProducts() {
    const { data, error } = await supabase.from("Products").select("*");
    if (error) console.error(error);
    else setProducts(data);
  }

  async function updateWishlist(id) {
    const newWishlist = wishlist.filter((item) => item.id !== id);

    const { error } = await supabase
      .from("Wishlists")
      .update({ items: newWishlist })
      .eq("uid", user.id);

    if (error) console.error(error);
    else setWishlist(newWishlist);
  }

  useEffect(() => {
    selectWishlist();
    selectProducts();
  }, []);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  // Card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Empty state animation variants
  const emptyStateVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Grid container variants for wishlist items
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Individual wishlist item variants
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="w-full flex flex-col gap-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={cardVariants}>
        <Card>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <CardHeader>
              <CardTitle>Wishlist</CardTitle>
              <CardDescription>
                See the items you've saved to your wishlist.
              </CardDescription>
            </CardHeader>
          </motion.div>
          
          <CardContent className="flex flex-col gap-8">
            {wishlist.length === 0 ? (
              <motion.div 
                className="flex flex-col items-center justify-center h-full text-gray-500 my-32"
                variants={emptyStateVariants}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.2, 
                    duration: 0.3, 
                    type: "spring", 
                    stiffness: 200 
                  }}
                >
                  <Heart className="w-12 h-12 mb-3 text-gray-300" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  Your wishlist is empty
                </motion.p>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-3 gap-8 max-sm:grid-cols-2"
                variants={gridVariants}
              >
                {wishlist.map((item, i) => {
                  const product = products.find(
                    (product) => product.id === item.id
                  );

                  if (!product) return null;

                  return (
                    <motion.div
                      className="flex flex-col gap-2"
                      key={i}
                      variants={itemVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="w-full flex justify-center rounded-xl relative aspect-square overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          className="w-4/5 absolute bottom-4 z-10"
                          href={`/product/${product.id}`}
                        >
                          <motion.div
                            variants={{
                              rest: { y: 20, opacity: 0 },
                              hover: { y: 0, opacity: 1 },
                            }}
                          >
                            <Button className="w-full bg-[#4065DD] hover:bg-[#ACB8FE]">
                              View item
                            </Button>
                          </motion.div>
                        </Link>
                        
                        <Link href={`/product/${product.id}`}>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 + 0.3, duration: 0.3 }}
                          >
                            <Image src={product.image_url} alt="" fill />
                          </motion.div>
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
                        <div className="flex justify-between">
                          <Link
                            href={`/product/${product.id}`}
                            className="w-full"
                          >
                            <motion.div
                              className="flex flex-col text-lg gap-1 max-sm:text-base"
                              whileHover="hover"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 + 0.4, duration: 0.3 }}
                            >
                              <h3>{product.name}</h3>
                              <p>${product.price.toFixed(2)} SGD</p>
                            </motion.div>
                          </Link>
                          
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              delay: i * 0.1 + 0.5, 
                              duration: 0.3,
                              type: "spring",
                              stiffness: 200 
                            }}
                          >
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="link" className="w-7 h-7 !p-0">
                                  <motion.div
                                    key={wishlist.some(
                                      (item) => item.id === product.id
                                    )}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Heart
                                      className={`min-w-5 min-h-5 transition-colors duration-300 ${
                                        wishlist.some(
                                          (item) => item.id === product.id
                                        )
                                          ? "text-[#ed5471] fill-[#ffbdc0]"
                                          : ""
                                      }`}
                                    />
                                  </motion.div>
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <DialogHeader>
                                    <DialogTitle>
                                      Are you sure you want to remove this from your
                                      wishlist?
                                    </DialogTitle>
                                    <DialogDescription>
                                      This will remove this item from your wishlist.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter className="max-sm:flex max-sm:flex-row max-sm:gap-4">
                                    <DialogClose className="max-sm:w-1/2" asChild>
                                      <Button type="button" variant="link">
                                        Close
                                      </Button>
                                    </DialogClose>
                                    <DialogClose className="max-sm:w-1/2" asChild>
                                      <Button
                                        className="bg-[#ed5471] text-white"
                                        type="button"
                                        onClick={() => updateWishlist(product.id)}
                                      >
                                        Remove
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </motion.div>
                              </DialogContent>
                            </Dialog>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
