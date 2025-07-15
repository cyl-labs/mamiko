import ProductsFilters from "@/components/products/ProductsFilters";
import ProductsSearch from "@/components/products/ProductsSearch";
import ProductsBody from "@/components/products/ProductsBody";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function Page() {
    return (
        <>
            <div className="w-full flex flex-col px-16 gap-2">
                <h1 className="text-6xl font-bold">Products</h1>
                <p>Designed for modern living, made for growing families. Explore Mamiko’s collection of clean, practical essentials.</p>
            </div>
            <div className="flex mt-12 px-16 gap-16">
                <ProductsFilters />
                <div className="w-full flex flex-col gap-16">
                    <ProductsSearch />
                    <ProductsBody />
                </div>
            </div>
        </>
    );
}
