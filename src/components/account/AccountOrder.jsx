import Image from "next/image";

export default function AccountOrder() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl">Order 1</h3>
        <p className="text-sm">Order date: 23/7/2025</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-4 group">
          <div className="w-15 h-15 bg-[#b1d5ed] rounded flex items-center justify-center">
            <div className="w-12 h-12 bg-[#e0f0f9] rounded relative">
              <Image src="/images/bottles.png" alt="" fill />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-medium text-gray-900 truncate">
              Bottles x2
            </h3>
            <p className="text-base text-gray-500">$17.00</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 group">
          <div className="w-15 h-15 bg-[#b1d5ed] rounded flex items-center justify-center">
            <div className="w-12 h-12 bg-[#e0f0f9] rounded relative">
              <Image src="/images/bottles.png" alt="" fill />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-medium text-gray-900 truncate">
              Bottles x2
            </h3>
            <p className="text-base text-gray-500">$17.00</p>
          </div>
        </div>
      </div>
      <p>Total: $34.00</p>
    </div>
  );
}
