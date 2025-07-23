"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ProductDescription({ product, items, setItems, user }) {
  const [quantity, setQuantity] = useState(1);

  function incrementQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function decrementQuantity() {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  }

  async function updateCart() {
    if (user) {
      const isInCart = items.find((item) => item.id === product.id);
      let newItems;

      if (isInCart) {
        newItems = items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...items, { id: product.id, quantity: quantity }];
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
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...guestItems, { id: product.id, quantity: quantity }];
      }

      localStorage.setItem("guestCart", JSON.stringify(newItems));
    }
  }

  if (product) {
    return (
      <div className="w-1/2 flex flex-col gap-8 max-md:w-full">
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <p className="text-3xl">${product.price.toFixed(2)} SGD</p>
        <p>
          Mamiko Pure Water Baby Wipes are specially designed for newborns and
          babies with sensitive skin. These wipes will leave your baby feeling
          clean and comfortable without irritating their skin with each use,
          providing a gentle and safe cleansing experience for both mother and
          baby.
        </p>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Product Specifications</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col list-disc pl-4 gap-4">
                {product.specifications.map((specification, index) => {
                  return <li key={index}>{specification}</li>;
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center gap-8 max-sm:flex-col max-sm:items-start">
          <div className="h-10 flex items-center gap-6">
            <Button
              className="h-full font-semibold hover:cursor-pointer bg-[#4065DD] hover:bg-[#404bdd] rounded-full shadow-none"
              onClick={decrementQuantity}
            >
              <Minus />
            </Button>
            <p>{quantity}</p>
            <Button
              className="h-full font-semibold hover:cursor-pointer bg-[#4065DD] hover:bg-[#404bdd] rounded-full shadow-none"
              onClick={incrementQuantity}
            >
              <Plus />
            </Button>
          </div>
          <Button
            className="h-full flex-1 font-semibold hover:cursor-pointer bg-[#4065DD] hover:bg-[#404bdd] max-sm:w-full"
            onClick={updateCart}
          >
            Add to cart
          </Button>
        </div>
      </div>
    );
  }
}
