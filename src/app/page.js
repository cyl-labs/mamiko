"use client";

import { useState, useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import Navbar from "@/components/general/navbar";
import Footer from "@/components/general/footer";
import HomeHero from "@/components/home/HomeHero";
import HomeWelcome from "@/components/home/HomeWelcome";
import HomeWhyUs from "@/components/home/HomeWhyUs";
import HomeTrusted from "@/components/home/HomeTrusted";
import HomeJoinUs from "@/components/home/HomeJoinUs";
import { supabase } from "@/lib/supabase";

export default function Home() {
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
      <Navbar user={user} items={items} setItems={setItems} />
      <div className="px-16 overflow-hidden max-lg:px-8 max-sm:px-6">
        <HomeHero />
        <HomeWelcome />
        <HomeWhyUs />
        <HomeTrusted />
        <div className="w-full sm:aspect-auto aspect-square relative pb-16">
          <HomeJoinUs />
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
}
