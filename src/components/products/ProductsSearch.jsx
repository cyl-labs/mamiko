import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export default function ProductsSearch() {
    return (
        <div className="w-full h-10 flex gap-4">
            <Select>
                <SelectTrigger className="w-[180px] border-[#4065DD]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Featured">Featured</SelectItem>
                    <SelectItem value="Price, High to Low">Price, High to Low</SelectItem>
                    <SelectItem value="Price, Low to High">Price, Low to High</SelectItem>
                    <SelectItem value="Alphabetical, A-Z">Alphabetical, A-Z</SelectItem>
                    <SelectItem value="Alphabetical, Z-A">Alphabetical, Z-A</SelectItem>
                    <SelectItem value="Best Selling">Best Selling</SelectItem>
                    <SelectItem value="Date, Old to New">Date, Old to New</SelectItem>
                    <SelectItem value="Date, New to Old">Date, New to Old</SelectItem>
                </SelectContent>
            </Select>
            <Input
                className="h-full border-[#4065DD] focus-visible:ring-[#ACB8FE]"
                placeholder="Search"
            />
            <Button className="h-full bg-[#E6B724] hover:bg-[#F0EB8F]">
                <Search />
            </Button>
        </div>
    );
}
