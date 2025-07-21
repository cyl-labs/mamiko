"use client";

import { useState } from "react";

export default function CheckoutButton({ items }) {
  const [loading, setLoading] = useState(false);
  console.log(items);

  async function handleCheckout() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
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
      className="w-full bg-black text-white py-3 rounded-lg harmonia-regular hover:bg-gray-800 transition-colors"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "Loading..." : "Checkout"}
    </button>
  );
}
