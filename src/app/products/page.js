"use client";

import { useState, useEffect } from "react";
import ProductsFilters from "@/components/products/ProductsFilters";
import ProductsSearch from "@/components/products/ProductsSearch";
import ProductsBody from "@/components/products/ProductsBody";
import Wrapper from "@/components/Wrapper";
import Navbar from "@/components/general/navbar";
import Footer from "@/components/general/footer";
import { supabase } from "@/lib/supabase";

export default function Page() {
  const [user, setUser] = useState();
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function selectUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) console.error(error);
    else {
      setUser(data.user);
    }
  }

  async function selectProducts() {
    const { data, error } = await supabase.from("Products").select("*");
    if (error) console.error(error);
    else {
      setProducts(data);
      setFilteredProducts(data);
    }
  }
  
  async function selectCart() {
    const { data, error } = await supabase.from("Carts").select("*").eq("uid", user.id).single();

    if (error) console.error(error);
    else {
      setItems(data.items);
    }
  }

  useEffect(() => {
    selectUser();
    selectProducts();
  }, []);

  useEffect(() => {
    if (user) selectCart();
  }, [user]);

  useEffect(() => {
    let filteredProducts = products;

    if (filters.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.includes(product.category)
      );
    }

    if (search.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    setFilteredProducts(filteredProducts);
  }, [filters, search]);

  return (
    <Wrapper>
      <Navbar user={user} items={items} setItems={setItems} />
      <div className="w-full flex flex-col px-16 gap-2">
        <h1 className="text-6xl text-[#4065DD] font-bold">Products</h1>
        <p>
          Designed for modern living, made for growing families. Explore
          Mamiko’s collection of clean, practical essentials.
        </p>
      </div>
      <div className="flex mt-12 px-16 gap-16">
        <ProductsFilters
          filters={filters}
          setFilters={setFilters}
        />
        <div className="w-full flex flex-col gap-16">
          <ProductsSearch search={search} setSearch={setSearch} />
          <ProductsBody
            products={products}
            filteredProducts={filteredProducts}
            items={items}
            setItems={setItems}
            user={user}
          />
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
}
