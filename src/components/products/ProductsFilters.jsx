"use client"

import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import ProductsFilter from "./ProductsFilter";

export default function ProductsFilters() {
    const [range, setRange] = useState([0, 1000])

    return (
        <div className="w-1/4 flex flex-col">
            <h2 className="text-4xl font-bold">Filters</h2>
            <div className="flex flex-col mt-4 gap-4">
                <ProductsFilter name="In Stock" />
                <ProductsFilter name="New Release" />
                <ProductsFilter name="Bottles & Sippy Cups" />
                <ProductsFilter name="Tissues" />
                <ProductsFilter name="Oral Care" />
                <ProductsFilter name="Potty" />
                <ProductsFilter name="Travel & Storage" />
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <Checkbox className="w-5 h-5 border-[#4065DD] data-[state=checked]:bg-[#4065DD] data-[state=checked]:border-[#4065DD]" />
                        <h3 className="text-lg">Price</h3>
                    </div>
                    <Slider
                        value={range}
                        onValueChange={setRange}
                        min={0}
                        max={1000}
                        step={1}
                    />
                    <div className="flex justify-between">
                        <p>$0</p>
                        <p>$1000</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
