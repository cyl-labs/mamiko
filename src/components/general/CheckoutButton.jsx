"use client";

import { useState } from "react";

export default function CheckoutButton({ items, cartProducts }) {
  const [loading, setLoading] = useState(false);

  function findCartProduct(id) {
    return cartProducts.find((product) => product.id === id);
  }

  async function handleCheckout() {
    setLoading(true);

    const checkoutItems = items
      .map((item) => {
        const product = findCartProduct(item.id);
        if (!product) return null;

        return {
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          image_urls: product.image_urls,
        };
      })
      .filter(Boolean);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: checkoutItems }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Failed to start checkout.");
      setLoading(false);
    }
  }

  return (
    <button
      className="w-full bg-[#b1d5ed] text-white py-3 rounded-lg harmonia-regular hover:bg-gray-800 transition-colors"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "Loading..." : "Checkout"}
    </button>
  );
}
