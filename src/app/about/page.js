"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/general/navbar";
import Footer from "@/components/general/footer";
import HeroAbout from "@/components/about/hero-about";
import Story from "@/components/about/story";
import Mission from "@/components/about/mission";
import Stats from "@/components/about/stats";
import Grid from "@/components/about/grid";
import Wrapper from "@/components/Wrapper";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function About() {
  const [user, setUser] = useState();
  const [items, setItems] = useState([]);

  async function selectUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) console.error(error);
    else {
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

  return (
    <Wrapper>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Navbar user={user} items={items} setItems={setItems} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           className="md:mt-14 mt-4"
        >
          <HeroAbout />
          <Story />
          <Mission />
          <Stats />
          <Grid />
          <Footer />
        </motion.div>
      </motion.section>
    </Wrapper>
  );
}
