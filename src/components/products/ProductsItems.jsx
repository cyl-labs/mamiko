import ProductsItem from "./ProductsItem";
import ProductsItemSkeleton from "./ProductsItemSkeleton";

export default function ProductsItems({ products }) {
    if (products.length === 0) {
        return (
            <div className="grid grid-cols-4 gap-8">
                {[...Array(8)].map((_, index) => (
                    <ProductsItemSkeleton key={index} />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-4 gap-8">
            {products.map((product, index) => {
                return (
                    <ProductsItem key={index} product={product} />
                );
            })}
        </div>
    );
}
