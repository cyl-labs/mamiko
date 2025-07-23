"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/general/navbar";
import AccountSide from "@/components/account/AccountSide";
import AccountBody from "@/components/account/AccountBody";
import Wrapper from "@/components/Wrapper";
import Footer from "@/components/general/footer";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Page() {
  const [user, setUser] = useState();
  const [items, setItems] = useState([]);
  const [mode, setMode] = useState("Account Details");
  const router = useRouter();

  async function selectUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error(error);
      router.push("/");
    } else {
      setUser(data.user);
    }
  }

  async function selectCart() {
    const { data, error } = await supabase
      .from("Carts")
      .select("*")
      .eq("uid", user.id)
      .single();

    if (error) console.error(error);
    else {
      setItems(data.items);
    }
  }

  useEffect(() => {
    selectUser();
  }, []);

  useEffect(() => {
    if (user) selectCart();
  }, [user]);

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

  if (user) {
    return (
      <Wrapper>
        <Navbar items={items} />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full mt-16"
        >
          <motion.div
            variants={headerVariants}
            className="w-full flex flex-col px-16 gap-2 max-lg:px-8 max-sm:px-6"
          >
            <motion.h1
              className="text-6xl text-[#4065dd] font-bold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your journey with Mamiko matters to us. Track your orders, manage
              your preferences, and enjoy a smoother shopping experience.
            </motion.p>
          </motion.div>
          <div className="flex mt-12 px-16 gap-16 max-md:flex-col max-md:gap-8 max-lg:px-8 max-sm:px-6">
            <AccountSide mode={mode} setMode={setMode} />
            <AccountBody user={user} mode={mode} />
          </div>
        </motion.div>
        <Footer />
      </Wrapper>
    );
  }
}
