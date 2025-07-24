"use client";

import { useState, useEffect } from "react";
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

  return (
    <div className="w-full flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Track all your previous orders with Mamiko.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 my-32    ">
              <ShoppingBag className="w-12 h-12 mb-3 text-gray-300" />
              <p>You have no previous orders</p>
            </div>
          ) : (
            orders.map((order, i) => {
              const total = order.items
                .reduce((acc, item) => acc + item.price / 100, 0)
                .toFixed(2);

              const date = new Date(order.created_at);
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();

              return (
                <div className="flex flex-col gap-8" key={i}>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl">Order {i + 1}</h3>
                    <p className="text-sm">
                      Order date: {day}/{month}/{year}
                    </p>
                  </div>
                  <AccountOrder order={order} products={products} />
                  <p>Total: ${total}</p>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
