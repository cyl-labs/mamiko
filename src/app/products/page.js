import ProductsFilters from "@/components/products/ProductsFilters";
import ProductsSearch from "@/components/products/ProductsSearch";
import ProductsBody from "@/components/products/ProductsBody";

export default function Page() {
    return (
        <>
            <div className="w-full px-16">
                <h1 className="text-6xl font-bold">Products</h1>
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
