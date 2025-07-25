"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [sortBy, setSortBy] = useState("");
  const [priceFilter, setPriceFilter] = useState([0, 1000]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function selectUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) console.error(error);
    else setUser(data.user);
  }

  async function selectCart() {
    const { data, error } = await supabase
      .from("Carts")
      .select("*")
      .eq("uid", user.id)
      .single();

    if (error) console.error(error);
    else setItems(data.items);
  }

  async function selectProducts() {
    const { data, error } = await supabase.from("Products").select("*");
    if (error) console.error(error);
    else {
      setProducts(data);
      setFilteredProducts(data);
      setIsLoading(false);
    }
  }

  async function selectWishlist() {
    const { data, error } = await supabase
      .from("Wishlists")
      .select("*")
      .eq("uid", user.id)
      .single();

    if (error) console.error(error);
    else setWishlist(data.items);
  }

  useEffect(() => {
    selectUser();
    selectProducts();
  }, []);

  useEffect(() => {
    if (user) {
      selectCart();
      selectWishlist();
    }
  }, [user]);

  useEffect(() => {
    let newProducts = [...products];
    const categoryFilters = [...filters].filter((filter) => filter !== "Price");

    if (categoryFilters.length > 0) {
      newProducts = newProducts.filter((product) =>
        categoryFilters.includes(product.category)
      );
    }

    if (filters.includes("Price")) {
      newProducts = newProducts.filter(
        (product) =>
          Number(product.price) >= priceFilter[0] &&
          Number(product.price) <= priceFilter[1]
      );
    }

    if (search.trim() !== "") {
      newProducts = newProducts.filter((product) =>
        product.name.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    switch (sortBy) {
      case "Price, High to Low":
        newProducts.sort((a, b) => b.price - a.price);
        break;
      case "Price, Low to High":
        newProducts.sort((a, b) => a.price - b.price);
        break;
      case "Alphabetical, A-Z":
        newProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Alphabetical, Z-A":
        newProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Date, Old to New":
        newProducts.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        break;
      case "Date, New to Old":
        newProducts.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      default:
        break;
    }

    setFilteredProducts(newProducts);
  }, [filters, search, sortBy, priceFilter]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const mainContentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Wrapper>
      <Navbar user={user} items={items} setItems={setItems} />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:mt-14 mt-4"
      >
        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          className="w-full flex flex-col px-16 gap-2 max-lg:px-8 max-sm:px-6"
        >
          <motion.h1
            className="text-6xl text-[#4065DD] font-bold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Designed for modern living, made for growing families. Explore
            Mamiko's collection of clean, practical essentials.
          </motion.p>
        </motion.div>

        {/* Main Content Section */}
        <div className="flex mt-12 px-16 gap-16 max-md:flex-col max-md:gap-8 max-lg:px-8 max-sm:px-6">
          {/* Filters Sidebar - Reverted to original */}
          <ProductsFilters
            filters={filters}
            priceFilter={priceFilter}
            setFilters={setFilters}
            setPriceFilter={setPriceFilter}
          />

          {/* Main Content Area */}
          <motion.div
            className="w-full flex flex-col gap-16"
            variants={mainContentVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Search Component */}
            <motion.div variants={itemVariants}>
              <ProductsSearch
                search={search}
                sortBy={sortBy}
                setSearch={setSearch}
                setSortBy={setSortBy}
              />
            </motion.div>

            {/* Products Body with Loading State */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center py-20"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-8 h-8 border-4 border-[#4065DD] border-t-transparent rounded-full"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="products"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <ProductsBody
                    products={products}
                    filteredProducts={filteredProducts}
                    items={items}
                    setItems={setItems}
                    user={user}
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer with entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Footer />
      </motion.div>
    </Wrapper>
  );
}
