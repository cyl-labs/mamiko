import ProductsItems from "./ProductsItems";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ProductsBody({
  products,
  filteredProducts,
  items,
  setItems,
  user,
}) {
  return (
    <div className="flex flex-col">
      <ProductsItems
        products={products}
        filteredProducts={filteredProducts}
        items={items}
        setItems={setItems}
        user={user}
      />
      <Pagination className="my-12">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="hover:bg-[#4065DD] hover:text-white"
              href="#"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="hover:bg-[#4065DD] hover:text-white"
              href="#"
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="hover:bg-[#4065DD] hover:text-white"
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
