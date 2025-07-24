"use client";

import { useState, useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductsFilter from "./ProductsFilter";
import { supabase } from "@/lib/supabase";

export default function ProductsFilters({
  filters,
  priceFilter,
  setFilters,
  setPriceFilter,
}) {
  const [categories, setCategories] = useState();
  const [checked, setChecked] = useState(false);

  async function selectCategories() {
    const { data, error } = await supabase.from("Categories").select("*");
    if (error) console.error(error);
    else setCategories(data);
  }

  function addPriceFilter(isChecked) {
    setChecked(isChecked);

    if (isChecked) {
      if (!filters.includes("Price")) setFilters([...filters, "Price"]);
    } else {
      setFilters(filters.filter((filter) => filter !== "Price"));
    }
  }

  useEffect(() => {
    selectCategories();
  }, []);

  if (categories) {
    return (
      <>
        <div className="w-1/4 flex flex-col hidden md:flex">
          <h2 className="text-4xl font-bold">Filters</h2>
          <div className="flex flex-col mt-4 gap-4">
            {categories.map((category, i) => {
              return (
                <ProductsFilter
                  key={i}
                  name={category.name}
                  filters={filters}
                  setFilters={setFilters}
                />
              );
            })}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={checked}
                  onCheckedChange={addPriceFilter}
                  className="w-5 h-5 border-[#4065DD] data-[state=checked]:bg-[#4065DD] data-[state=checked]:border-[#4065DD]"
                />
                <h3 className="text-lg">Price</h3>
              </div>
              <Slider
                value={priceFilter}
                onValueChange={setPriceFilter}
                min={0}
                max={1000}
                step={1}
              />
              <p>
                Price: ${priceFilter[0]} - ${priceFilter[1]}
              </p>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="w-full bg-[#4065DD]" asChild>
              <Button>Filter</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-2xl">Filters</SheetTitle>
                <div className="flex flex-col mt-4 gap-4">
                  {categories.map((category, i) => {
                    return (
                      <ProductsFilter
                        key={i}
                        name={category.name}
                        filters={filters}
                        setFilters={setFilters}
                      />
                    );
                  })}
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={addPriceFilter}
                        className="w-5 h-5 border-[#4065DD] data-[state=checked]:bg-[#4065DD] data-[state=checked]:border-[#4065DD]"
                      />
                      <h3 className="text-lg">Price</h3>
                    </div>
                    <Slider
                      value={priceFilter}
                      onValueChange={setPriceFilter}
                      min={0}
                      max={1000}
                      step={1}
                    />
                    <p>
                      Price: ${priceFilter[0]} - ${priceFilter[1]}
                    </p>
                  </div>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </>
    );
  }
}
