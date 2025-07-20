import React from "react";

export const Contact: React.FC = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-28">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-purple-700 mb-4">Contact Us</h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            We’d love to hear from you! Whether you have a question about our products,
            shipping, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-purple-600 mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Write your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-purple-600 mb-6">Contact Information</h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li><span className="font-semibold">Email:</span> support@stationeryshop.com</li>
                <li><span className="font-semibold">Phone:</span> +880 1234 567890</li>
                <li><span className="font-semibold">Address:</span> 123, Gulshan Avenue, Dhaka, Bangladesh</li>
                <li><span className="font-semibold">Business Hours:</span> Mon - Fri, 9AM - 6PM</li>
              </ul>
            </div>
            <div className="mt-10">
              <h3 className="text-lg font-semibold text-purple-600 mb-2">Find us on the map</h3>
              <div className="rounded-lg overflow-hidden shadow-md h-64 bg-gray-200">
                {/* You can embed Google Maps iframe here */}
                <iframe
                  className="w-full h-full"
                  title="Google Maps"
                  src="https://maps.google.com/maps?q=Dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
