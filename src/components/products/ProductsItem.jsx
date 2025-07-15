import Image from "next/image";

export default function ProductsItem() {
    return (
        <div className="flex flex-col">
            <div className="w-full relative aspect-square">
                <Image
                    src="/images/bottles.png"
                    alt=""
                    fill
                />
            </div>
            <div className="flex flex-col gap-2">
                <h3>Classic SIMONO</h3>
                <p>$25.00 SGD</p>
            </div>
        </div>
    );
}