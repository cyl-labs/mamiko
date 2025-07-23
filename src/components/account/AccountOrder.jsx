import Image from "next/image";

export default function AccountOrder({ key, order, products }) {
  function findProduct(name) {
    return products.find((product) => product.name === name);
  }

  return (
    <div className="flex flex-col gap-8">
      {order.items.map((item, i) => {
        const product = findProduct(item.name);
        if (!product) return null;

        return (
          <div className="flex flex-col gap-4" key={i}>
            <div className="flex items-center space-x-4 group">
              <div className="w-15 h-15 bg-[#b1d5ed] rounded flex items-center justify-center">
                <div className="w-12 h-12 bg-[#e0f0f9] rounded relative">
                  <Image src={product?.image_url} alt="" fill />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-medium text-gray-900 truncate">
                  {item.name} x{item.quantity}
                </h3>
                <p className="text-base text-gray-500">${item.price / 100}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
