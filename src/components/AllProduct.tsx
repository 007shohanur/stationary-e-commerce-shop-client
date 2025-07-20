import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/features/products/productsSlice";
import { useGetProductsQuery } from "@/features/products/productsApi";
import { RootState } from "@/app/store";
import { Link } from "react-router-dom";
import { addToCart } from "@/features/cart/cartSlice"; // Import addToCart action
import toast from "react-hot-toast";
import Loading from "./Loading";

const AllProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetProductsQuery();
  const products = data?.data || [];

  const searchQuery = useSelector(
    (state: RootState) => state.products.searchQuery
  );

  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");

  // Get min and max prices for dynamic ranges
  const prices = products.map((product) => product.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceSteps = 5; // Number of steps in price range

  const priceRanges = Array.from({ length: priceSteps }, (_, i) => {
    const start = Math.floor(
      minPrice + (i * (maxPrice - minPrice)) / priceSteps
    );
    const end = Math.floor(
      minPrice + ((i + 1) * (maxPrice - minPrice)) / priceSteps
    );
    return { start, end };
  });

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const isPriceMatch = selectedPrice
      ? product.price <= parseFloat(selectedPrice)
      : true;
    const isCategoryMatch = selectedCategory
      ? product.category === selectedCategory
      : true;
    const isAvailabilityMatch = selectedAvailability
      ? product.inStock === (selectedAvailability === "In Stock")
      : true;
    const isSearchMatch = searchQuery
    ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    : true;
    
    return (
      isPriceMatch && isCategoryMatch && isAvailabilityMatch && isSearchMatch
    );
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product)); // Dispatch addToCart action
    toast.success("Product Added to Cart", {
      duration: 3000,
    });
  };

  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <p>Failed to fetch products. Please try again later.</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Filters Section */}
      <aside className="w-full lg:flex-none lg:w-3/12 p-4 lg:p-10 bg-white shadow-md mb-8 lg:mb-0">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-500"
            placeholder="Search for products..."
          />
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Price Range
          </label>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-500"
          >
            <option value="">All</option>
            {priceRanges.map((range, idx) => (
              <option key={idx} value={range.end}>
                Up to ${range.end}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-500"
          >
            <option value="">All</option>
            {Array.from(
              new Set(products.map((product) => product.category))
            ).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Filter */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Availability
          </label>
          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-purple-500"
          >
            <option value="">All</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </aside>

      {/* Products Section */}
      <main className="flex-grow p-4 lg:p-10 pb-20">
        <h1 className="text-2xl font-bold mb-6">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
              <Link to={`/product-details/${product._id}`}>
                <img
                  src={product.productImg}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2 overflow-hidden h-12">
                  {product.description}
                </p>

                <p className="text-purple-600 font-bold text-lg mb-4">
                  ${product.price}
                </p>
              </Link>

              <Button
                variant="outline"
                className="w-full py-6 btn-outline-purple btn-outline-purple:hover rounded-lg"
                onClick={() => handleAddToCart(product)} // Add to cart functionality
              >
                Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllProductsPage;
