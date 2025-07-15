import ProductsFilter from "./ProductsFilter";

export default function ProductFilters() {
    return (
        <div className="flex flex-col">
            <h2 className="text-4xl font-bold">Filters</h2>
            <div className="flex flex-col mt-4 gap-4">
                <ProductsFilter name="In Stock" />
                <ProductsFilter name="New Release" />
                <ProductsFilter name="Bottles & Sippy Cups" />
                <ProductsFilter name="Tissues" />
                <ProductsFilter name="Oral Care" />
                <ProductsFilter name="Potty" />
                <ProductsFilter name="Travel & Storage" />
                <ProductsFilter name="Price" />
            </div>
        </div>
    );
}
