import ProductsItem from "./ProductsItem";

export default function ProductsBody() {
    return (
        <div className="grid grid-cols-4">
            <ProductsItem />
            <ProductsItem />
            <ProductsItem />
            <ProductsItem />
        </div>
    );
}
