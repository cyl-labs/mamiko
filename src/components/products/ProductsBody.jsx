"use client"

import { useState, useEffect } from "react";
import ProductsItems from "./ProductsItems";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { supabase } from "@/lib/supabase";

export default function ProductsBody() {
    const [products, setProducts] = useState([]);

    async function selectProducts() {
        const { data, error } = await supabase.from("Products").select("*");
        if (error) console.error(error);
        else {
            setProducts(data);
            console.log(data[0].price.toFixed(2))
        }
    }

    useEffect(() => {
        selectProducts();
    }, []);

    return (
        <div className="flex flex-col">
            <ProductsItems products={products} />
            <Pagination className="my-12">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious className="hover:bg-[#4065DD] hover:text-white" href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className="hover:bg-[#4065DD] hover:text-white" href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext className="hover:bg-[#4065DD] hover:text-white" href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
