import ProductsItem from "./ProductsItem";
import ProductsItemSkeleton from "./ProductsItemSkeleton";

export default function ProductsItems({
  products,
  filteredProducts,
  items,
  setItems,
  user,
}) {
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
    <div className="grid grid-cols-4 gap-8 max-md:grid-cols-3 max-sm:grid-cols-2">
      {filteredProducts.map((product, index) => {
        return (
          <ProductsItem
            key={index}
            product={product}
            items={items}
            setItems={setItems}
            user={user}
          />
        );
      })}
    </div>
  );
}
