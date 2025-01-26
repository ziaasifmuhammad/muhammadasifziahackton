'use client'; // Required for React hooks in Next.js

import { useState, JSX } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string; // URL for the product image
};

const page = async ({ params }: { params: { id: string } }): Promise<JSX.Element> => {
  const query = `*[ _type == "product" && _id == $id]{
    name,
    "id": _id,
    price,
    description,
    category,
    "image": image.asset._ref
  }[0]`;

  if (!params?.id) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-xl font-medium text-gray-600">Invalid Product ID</h1>
      </div>
    );
  }

  const product: Product | null = await client.fetch(query, { id: params.id });

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-xl font-medium text-gray-600">Product not available</h1>
      </div>
    );
  }

  return <ProductPage product={product} />;
};

const ProductPage = ({ product }: { product: Product }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} has been added to the cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">{product.name}</h1>
              <p className="mt-4 text-sm sm:text-base text-gray-600">{product.description}</p>
              <p className="text-2xl sm:text-3xl mt-6 font-bold text-gray-900">${product.price}</p>
            </div>

            {/* Size Options */}
            <div className="mt-6">
              <span className="font-semibold text-lg text-gray-800">Select Size:</span>
              <div className="flex space-x-2 mt-3">
                {["L", "XL", "XS"].map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Options */}
            <div className="mt-6">
              <span className="font-semibold text-lg text-gray-800">Choose Color:</span>
              <div className="flex space-x-3 mt-3">
                {["#000", "#FFD700", "#800080"].map((color) => (
                  <div
                    key={color}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transform transition-transform"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-8">
              <button
                onClick={() => addToCart(product)}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-full sm:w-72">
          <h2 className="font-bold text-lg">Cart</h2>
          <ul className="mt-2 space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between text-gray-800">
                <span className="text-sm sm:text-base">{item.name}</span>
                <span className="text-sm sm:text-base">${item.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">
            Total: ${cart.reduce((total, item) => total + item.price, 0)}
          </p>
        </div>
      )}
    </div>
  );
};

export default page;

