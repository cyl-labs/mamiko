"use client"

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductSearch() {
    const router = useRouter();

    return (
        <div className="flex justify-center">
            <div className="w-4/5 h-10 flex gap-4">
                <Button
                    className="h-full bg-transparent shadow-none cursor-pointer hover:bg-transparent"
                    onClick={() => router.back()}
                >
                    <ChevronLeft className="text-black" />
                </Button>
                <Input
                    className="h-full border-[#4065DD] focus-visible:ring-[#ACB8FE]"
                    placeholder="Search"
                />
                <Button className="h-full bg-[#E6B724] hover:bg-[#F0EB8F]">
                    <Search />
                </Button>
            </div>
        </div>
    );
}
