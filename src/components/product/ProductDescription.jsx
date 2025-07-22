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

export default function ProductDescription({ product }) {
    const [quantity, setQuantity] = useState(1);

    function incrementQuantity() {
        setQuantity((prev) => prev + 1);
    }

    function decrementQuantity() {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    }

    if (product) {
        return (
            <div className="w-1/2 flex flex-col gap-8 max-md:w-full">
                <h1 className="text-5xl font-bold">{product.name}</h1>
                <p className="text-3xl">${product.price.toFixed(2)} SGD</p>
                <p>Mamiko Pure Water Baby Wipes are specially designed for newborns and babies with sensitive skin. These wipes will leave your baby feeling clean and comfortable without irritating their skin with each use, providing a gentle and safe cleansing experience for both mother and baby.</p>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Product Specifications</AccordionTrigger>
                        <AccordionContent>
                            <ul className="flex flex-col list-disc pl-4 gap-4">
                                {product.specifications.map((specification, index) => {
                                    return (
                                        <li key={index}>{specification}</li>
                                    );
                                })}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div className="flex items-center gap-8 max-sm:flex-col max-sm:items-start">
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
                    <Button className="h-full flex-1 bg-[#4065DD] hover:bg-[#ACB8FE] max-sm:w-full">Add to cart</Button>
                </div>
            </div>
        );
    }
}
