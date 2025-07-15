import ProductsItem from "./ProductsItem";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function ProductsBody() {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-4 gap-8">
                <ProductsItem />
                <ProductsItem />
                <ProductsItem />
                <ProductsItem />
                <ProductsItem />
                <ProductsItem />
                <ProductsItem />
                <ProductsItem />
                <ProductsItem />
                <ProductsItem />
                <ProductsItem />
                <ProductsItem />
            </div>
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
