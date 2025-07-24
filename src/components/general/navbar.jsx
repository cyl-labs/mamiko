"use client";

import { ShoppingCart, Menu, X, CircleUserRound } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cart from "@/components/general/cart";
import LoginForm from "./LoginForm";
import { supabase } from "@/lib/supabase";

const Navbar = ({ user, items, setItems }) => {
  const [firstName, setFirstName] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  async function selectFirstName() {
    const { data, error } = await supabase
      .from("Profiles")
      .select("*")
      .eq("uid", user.id)
      .single();

    if (error) console.error(error);
    else setFirstName(data.first_name);
  }

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "About", link: "/about" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (user) {
      selectFirstName();
    }
  }, [user]);

  return (
    <>
      <motion.section
        className="py-6 md:py-8 lg:pt-12 lg:pb-2 px-4 md:px-8 lg:px-16 flex flex-row justify-between text-center items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left side - Logo and Desktop Navigation */}
        <div className="nav-left flex flex-row items-center gap-12">
          <Link href="/">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <Image
                src="/images/logo.png"
                width={80}
                height={0}
                alt="Mamiko Logo"
                className="md:w-24 lg:w-[114px]"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <motion.div
            className="hidden lg:flex flex-row gap-12 text-xl text-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            {navItems.map((item, index) => (
              <Link key={index} href={item.link}>
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  className="text-lg cursor-pointer"
                >
                  {item.name}
                </motion.p>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Right side - Cart, Login, and Hamburger Menu */}
        <motion.div
          className="nav-right flex flex-row gap-4 md:gap-6 lg:gap-9 items-center"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {/* Cart */}
          <motion.div
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={24} className="cursor-pointer" />
          </motion.div>

          {/* Login/Account */}
          <motion.div
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {user ? (
              // If user is logged in, show account link
              <Link className="flex gap-4" href="/account">
                <CircleUserRound size={24} className="cursor-pointer" />
                <p>
                  Hello, <span className="font-bold">{firstName}</span>
                </p>
              </Link>
            ) : (
              // If user is not logged in, show login form
              <LoginForm />
            )}
          </motion.div>

          {/* Hamburger Menu */}
          <motion.div
            className="lg:hidden"
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X size={28} className="cursor-pointer md:w-8 md:h-8" />
            ) : (
              <Menu size={28} className="cursor-pointer md:w-8 md:h-8" />
            )}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            {/* Mobile Menu */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-white shadow-lg z-50 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex justify-between items-center p-6 border-b">
                  <Image
                    src="/images/logo.png"
                    width={80}
                    height={0}
                    alt="Mamiko Logo"
                  />
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 hover:cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>
                {/* Mobile Menu Items */}
                <div className="flex flex-col py-8 px-6 space-y-6">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.link}
                      onClick={closeMobileMenu}
                    >
                      <motion.div
                        className="text-xl py-3 border-b border-gray-100 cursor-pointer"
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10 }}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Cart
        user={user}
        items={items}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        setItems={setItems}
      />
    </>
  );
};

export default Navbar;
