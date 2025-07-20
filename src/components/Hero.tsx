import React from 'react';
import { Button } from '@/components/ui/button'; 
import { useNavigate } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();  

  const handleClick = () => {
    navigate('/all-products');  // Navigate to "/all-products" on button click
  };
  return (
    <section
      className="relative bg-cover bg-center text-white py-48"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      {/* Overlay to darken the background image */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-6 relative z-10">
        {/* Left Section (Text and Button) */}
        <div className="flex flex-col items-center text-center md:text-left">
          <h1 className="text-5xl font-bold mb-4 text-center">Discover Our Stationary Products</h1>
          <p className="text-lg mb-6">Browse through a variety of premium stationary items for all your needs!</p>
          
          <Button variant="outline" size="lg" className="px-12 py-6 border-2 border-white-600 text-white-600 hover:border-purple-600 hover:bg-purple-600 hover:text-white transition duration-300" onClick={handleClick}>
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
};
