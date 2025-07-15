import Image from "next/image";

export default function ProductImages() {
    return (
        <div className="w-1/2 flex flex-col gap-4">
            <div className="w-full flex rounded-3xl relative aspect-square overflow-hidden">
                <Image
                    src="/images/bottles.png"
                    alt=""
                    fill
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="flex rounded-xl relative aspect-square overflow-hidden">
                    <Image
                        src="/images/mamiko-bottles.jpg"
                        alt=""
                        fill
                    />
                </div>
                <div className="flex rounded-xl relative aspect-square overflow-hidden">
                    <Image
                        src="/images/mamiko-bottles.jpg"
                        alt=""
                        fill
                    />
                </div>
                <div className="flex rounded-xl relative aspect-square overflow-hidden">
                    <Image
                        src="/images/mamiko-bottles.jpg"
                        alt=""
                        fill
                    />
                </div>
            </div>
        </div>
    );
}