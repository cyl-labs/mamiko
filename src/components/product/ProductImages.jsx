"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProductImages({ product }) {
  const [mainImage, setMainImage] = useState();

  function changeImage(image) {
    setMainImage(image);
  }

  useEffect(() => {
    if (product?.image_url) {
      setMainImage(product.image_url);
    }
  }, [product]);

  if (product) {
    return (
      <div className="w-1/2 flex flex-col gap-4 max-md:w-full">
        <div className="w-full flex rounded-3xl relative aspect-square overflow-hidden">
          <Image src={mainImage} alt="" fill />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div
            className="flex rounded-xl relative aspect-square overflow-hidden cursor-pointer"
            onClick={() => changeImage(product.image_url)}
          >
            <Image src={product.image_url} alt="" fill />
          </div>
          {product.secondary_image_urls.map((image, i) => {
            return (
              <div
                className="flex rounded-xl relative aspect-square overflow-hidden cursor-pointer"
                key={i}
                onClick={() => changeImage(image)}
              >
                <Image src={image} alt="" fill />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
