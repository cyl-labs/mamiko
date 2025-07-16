"use client"

import { React, useState, useEffect } from "react";
import ProductSearch from "@/components/product/ProductSearch";
import ProductImages from "@/components/product/ProductImages";
import ProductDescription from "@/components/product/ProductDescription";
import Wrapper from "@/components/Wrapper";
import Navbar from "@/components/general/navbar";
import Footer from "@/components/general/footer";
import { supabase } from "@/lib/supabase";

export default function Page({ params }) {
    const [product, setProduct] = useState();

    async function selectProduct() {
        const { data, error } = await supabase.from("Products").select('*').eq("id", params.id).single();
        if (error) console.error(error);
        else {
            setProduct(data);
            console.log(data);
        }
    }

    useEffect(() => {
        selectProduct();
    }, []);

    return (
        <Wrapper>
            <Navbar />
            <div className="px-16">
                {/* <ProductSearch /> */}
                <div className="flex mt-16 gap-16">
                    <ProductImages product={product} />
                    <ProductDescription product={product} />
                </div>
            </div>
            <Footer />
        </Wrapper>
    );
}
