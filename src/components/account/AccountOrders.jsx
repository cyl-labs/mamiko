"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AccountOrder from "./AccountOrder";
import { ShoppingBag } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AccountOrders({ user }) {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  async function selectUserOrders() {
    const { data, error } = await supabase
      .from("Orders")
      .select("*")
      .eq("uid", user.id);
    if (error) console.error(error);
    else setOrders(data);
  }

  async function selectProducts() {
    const { data, error } = await supabase.from("Products").select("*");
    if (error) console.error(error);
    else setProducts(data);
  }

  useEffect(() => {
    selectUserOrders();
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

  // Individual order animation variants
  const orderVariants = {
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

  return (
    <motion.div 
      className="w-full flex flex-col gap-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={orderVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Track all your previous orders with Mamiko.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            {orders.length === 0 ? (
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
                  <ShoppingBag className="w-12 h-12 mb-3 text-gray-300" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  You have no previous orders
                </motion.p>
              </motion.div>
            ) : (
              <motion.div 
                className="flex flex-col gap-8"
                variants={containerVariants}
              >
                {orders.map((order, i) => {
                  const total = order.items
                    .reduce((acc, item) => acc + item.price / 100, 0)
                    .toFixed(2);
                  const date = new Date(order.created_at);
                  const day = date.getDate();
                  const month = date.getMonth() + 1;
                  const year = date.getFullYear();

                  return (
                    <motion.div 
                      className="flex flex-col gap-8" 
                      key={i}
                      variants={orderVariants}
                      whileHover={{ 
                        scale: 1.01,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.div 
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: i * 0.1 + 0.2, 
                          duration: 0.3 
                        }}
                      >
                        <h3 className="text-xl">Order {i + 1}</h3>
                        <p className="text-sm">
                          Order date: {day}/{month}/{year}
                        </p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: i * 0.1 + 0.3, 
                          duration: 0.4 
                        }}
                      >
                        <AccountOrder order={order} products={products} />
                      </motion.div>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          delay: i * 0.1 + 0.4, 
                          duration: 0.3 
                        }}
                        className="font-semibold"
                      >
                        Total: ${total}
                      </motion.p>
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
