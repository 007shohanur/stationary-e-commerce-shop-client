import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "@/features/products/productsApi";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/cartSlice";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { ProductShowcase } from "@/components/ProductShow";

export const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Using productId as the URL parameter
  const dispatch = useDispatch();

  // Fetch product data from API using useGetProductsQuery
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-500">
          Failed to load product details. Please try again later.
        </h1>
      </div>
    );
  }

  // Find the product dynamically using the ID from the URL
  const product = data?.data?.find((p) => p._id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-500">
          Product not found!
        </h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product Added to Cart", {
      duration: 3000,
    });
  };

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-12">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.productImg}
              alt={product.name}
              className="rounded-lg shadow-lg w-full max-w-md object-cover"
            />
          </div>

          {/* Product Information */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-purple-600 text-2xl font-semibold mb-4">
              ${product.price}
            </p>

            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed mb-3">
                {product.description}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Brand:</span> {product.brand}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Stock Availability:</span>{" "}
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>
              <p className="text-lg text-gray-600 mb-6">
                <span className="font-semibold">Quantity Available:</span>{" "}
                {product.quantity}
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex gap-4">
              <button 
                className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transition-all w-full md:w-auto"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <ProductShowcase sliceIndex={-4} title="You May Also Like" />
      </div>
    </section>
  );
};
