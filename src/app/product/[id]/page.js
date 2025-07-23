"use client";

import { React, useState, useEffect } from "react";
import ProductImages from "@/components/product/ProductImages";
import ProductDescription from "@/components/product/ProductDescription";
import Wrapper from "@/components/Wrapper";
import Navbar from "@/components/general/navbar";
import Footer from "@/components/general/footer";
import { supabase } from "@/lib/supabase";

export default function Page({ params }) {
  const [product, setProduct] = useState();
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

  async function selectProduct() {
    const { data, error } = await supabase
      .from("Products")
      .select("*")
      .eq("id", params.id)
      .single();
    if (error) console.error(error);
    else {
      setProduct(data);
      console.log(data);
    }
  }

  useEffect(() => {
    selectUser();
    selectProduct();
  }, []);

  useEffect(() => {
    if (user) selectCart();
  }, [user]);

  return (
    <Wrapper>
      <Navbar user={user} items={items} setItems={setItems} />
      <div className="px-16 max-lg:px-8 max-sm:px-6">
        {/* <ProductSearch /> */}
        <div className="flex md:mt-14 m-4 gap-16 max-md:flex-col">
          <ProductImages product={product} />
          <ProductDescription product={product} items={items} setItems={setItems} user={user} />
        </div>
      </div>
      <Footer />
    </Wrapper>
  );
}
