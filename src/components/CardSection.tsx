import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const CardSection: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/all-products');
  };
  const cards = [
    {
      title: "Fast Delivery",
      description:
        "We ensure that all your orders are delivered quickly and securely to your doorstep.",
      buttonText: "Shop Now",
      imageUrl: "stationery1.png", // replace with actual image URL
    },
    {
      title: "Premium Quality",
      description:
        "Our products are made with high-quality materials to provide durability and satisfaction.",
      buttonText: "Shop Now",
      imageUrl: "stationery2.png", // replace with actual image URL
    },
  ];

  return (
    <section className="px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-800 p-12 rounded-lg shadow-lg flex flex-col md:flex-row md:items-center md:justify-around gap-20"
            >
              {/* Image Section */}
              <div className="w-full md:w-auto flex justify-center md:justify-start">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="max-w-full md:max-w-xs h-40 rounded-lg shadow-lg"
                />
              </div>

              {/* Text Section */}
              <div className="w-full md:w-auto text-center md:text-left">
                <h3 className="text-3xl font-semibold text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-lg text-white mb-6">{card.description}</p>
                <Button
                  variant="outline"
                  className="bg-white py-3 px-6 rounded-lg hover:bg-gray-800 hover:text-white transition"
                  onClick={handleButtonClick}
                >
                  {card.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
