import Loading from "./Loading";
import { useGetProductsQuery } from "@/features/products/productsApi";
import { setSearchQuery } from "@/features/products/productsSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CategorySection: React.FC = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const products = data?.data || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract unique categories
  const categories = Array.from(
    new Set(products.map((product: any) => product.category))
  );

  const getCategoryImage = (category: string) => {
    // Optional: Use real images or fallbacks for each category
    const matchedProduct = products.find((p) => p.category === category);
    return (
      matchedProduct?.productImg ||
      "https://www.ryman.co.uk/media/magefan_blog/cute_stationery_featured_image.png"
    ); // fallback image
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || categories.length === 0) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load categories.
      </div>
    );
  }

  const handleCategoryRoute = (category: string) => {
    dispatch(setSearchQuery(category)); // Dispatch search query to the store
    navigate(`/all-products`);
  };

  return (
    <section className="px-4 sm:px-8 lg:px-16 bg-white text-gray-800 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 sm:mb-12 text-gray-800">
          Explore Categories
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-6">
          {categories.map((category: any, index: any) => (
            <div
              key={index}
              onClick={() => handleCategoryRoute(category.toLowerCase())}
              className="cursor-pointer bg-gray-100 hover:bg-white sm:p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={getCategoryImage(category)}
                alt={category}
                className="rounded-md mb-4 h-24 w-full object-cover"
              />
              <h3 className="text-md font-semibold capitalize text-gray-800">
                {category}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
