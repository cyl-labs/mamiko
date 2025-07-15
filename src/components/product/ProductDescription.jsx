"use client"

import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

export default function ProductDescription() {
    const [quantity, setQuantity] = useState(1);

    function incrementQuantity() {
        setQuantity((prev) => prev + 1);
    }

    function decrementQuantity() {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    }

    return (
        <div className="w-1/2 flex flex-col gap-8">
            <h1 className="text-5xl font-bold">Classic SIMONO</h1>
            <p className="text-3xl">$25.<span className="text-xl">00</span> SGD</p>
            <p>Mamiko Pure Water Baby Wipes are specially designed for newborns and babies with sensitive skin. These wipes will leave your baby feeling clean and comfortable without irritating their skin with each use, providing a gentle and safe cleansing experience for both mother and baby.</p>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Product Specifications</AccordionTrigger>
                    <AccordionContent>
                        <ul className="flex flex-col list-disc pl-4 gap-4">
                            <li>99.9% Pure Water</li>
                            <li>Dermatologically Tested</li>
                            <li>Suitable for Sensitive Skin</li>
                            <li>Suitable for Face and Body</li>
                            <li>Designed for Newborns & Babies</li>
                            <li>Non-Sticky Formula</li>
                            <li>0% Fragrance</li>
                            <li>No Harmful Ingredients - Paraben-Free, Alcohol-Free, Asbestos-Free</li>
                            <li>pH Balanced</li>
                            <li>Tear Resistant</li>
                            <li>3D Honeycomb Pattern</li>
                            <li>Tissue Dimensions: 20cm x 15cm</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="flex gap-8">
                <div className="h-10 flex items-center gap-6">
                    <Button
                        className="h-full bg-[#4065DD] rounded-full shadow-none hover:bg-[#ACB8FE]"
                        onClick={decrementQuantity}
                    >
                        <Minus />
                    </Button>
                    <p>{quantity}</p>
                    <Button
                        className="h-full bg-[#4065DD] rounded-full shadow-none hover:bg-[#ACB8FE]"
                        onClick={incrementQuantity}
                    >
                        <Plus />
                    </Button>
                </div>
                <Button className="h-full flex-1 bg-[#4065DD] hover:bg-[#ACB8FE]">Add to cart</Button>
            </div>
        </div>
    );
}
