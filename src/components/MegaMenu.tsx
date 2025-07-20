import { useGetProductsQuery } from "@/features/products/productsApi";
import { setSearchQuery } from "@/features/products/productsSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const MegaMenu: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);

  const { data, isLoading, isError } = useGetProductsQuery();
  const products = data?.data || [];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = Array.from(
    new Set(products.map((product: any) => product.category))
  );
  const brands = Array.from(
    new Set(products.map((product: any) => product.brand))
  );

  const handleClick = (query: string) => {
    dispatch(setSearchQuery(query));
    navigate("/all-products");
  };

  return (
    <nav className="hidden lg:flex space-x-8">
      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <span className="text-lg text-gray-300 hover:text-white transition-all cursor-pointer">
          Browse
        </span>

        <div
          className={`
        absolute left-0 top-full w-[500px] bg-white text-gray-800 shadow-xl p-6 rounded-xl z-50
        transition-all duration-300
        ${
          isHovering
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }
      `}
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Stationery Categories */}
            <div>
              <h4 className="font-semibold text-sm mb-5 text-gray-600 uppercase">
                Stationery
              </h4>
              <ul className="space-y-3 text-sm">
                {!isLoading &&
                  !isError &&
                  categories.map((category: string, index: number) => (
                    <li key={index}>
                      <button
                        onClick={() => handleClick(category)}
                        className="hover:text-purple-600 text-left w-full"
                      >
                        {category}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Brand List */}
            <div>
              <h4 className="font-semibold text-sm mb-5 text-gray-600 uppercase">
                Brands
              </h4>
              <ul className="space-y-3 text-sm">
                {!isLoading &&
                  !isError &&
                  brands.map((brand: string, index: number) => (
                    <li key={index}>
                      <button
                        onClick={() => handleClick(brand)}
                        className="hover:text-purple-600 text-left w-full"
                      >
                        {brand}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Static menu items */}
      <button
        onClick={() => handleClick("")}
        className="text-lg text-gray-300 hover:text-white transition-all"
      >
        Products
      </button>
      <Link
        to="/about"
        className="text-lg text-gray-300 hover:text-white transition-all"
      >
        About
      </Link>
      <Link
        to="/contact"
        className="text-lg text-gray-300 hover:text-white transition-all"
      >
        Contact
      </Link>
    </nav>
  );
};
