import React from "react";
import { useNavigate } from "react-router-dom";

export const About: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleShopNowClick = () => {
    navigate("/all-products"); // Navigate to the '/all-products' route
  };
  return (
    <section className="min-h-screen bg-gray-50 py-28">
      <div className="container mx-auto px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-purple-700 mb-6">About Us</h1>
          <p className="text-start text-gray-700 text-lg">
            Welcome to <span className="font-semibold">Stationery Shop</span>,
            where creativity meets organization. We believe that the right tools
            can unlock your true potential and help you achieve your goals.
            Whether you're a student, professional, artist, or entrepreneur, our
            carefully curated selection of premium stationery products is
            designed to inspire your ideas and bring your workspace to life.
            <br />
            <br />
            At Stationery Shop, we understand the importance of having a
            well-organized and motivating workspace. Our collection is not just
            about functionality; it's about making your everyday tasks more
            enjoyable, more productive, and more creative. From sleek notebooks
            that capture your thoughts to beautifully designed pens and planners
            that help you stay on track, we offer a range of products that cater
            to all your creative and organizational needs.
            <br />
            <br />
            Whether you're jotting down notes, sketching your next big idea, or
            organizing your tasks, we’re here to provide you with the perfect
            tools to help you shine. Explore our collection and find the
            products that will transform your workspace into a hub of
            creativity, focus, and inspiration.
          </p>
        </div>

        {/* Our Values Section */}
        <div className="mt-16">
          <h2 className="text-center text-3xl font-semibold text-purple-600 mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Creativity",
                description:
                  "We encourage creativity with products that spark inspiration. Every item is designed to fuel your imagination and empower you to think outside the box.",
                icon: "🎨",
              },
              {
                title: "Quality",
                description:
                  "Our stationery is crafted with care, ensuring durability and elegance. We believe in offering products that stand the test of time, both in design and functionality.",
                icon: "📝",
              },
              {
                title: "Organization",
                description:
                  "We help you stay organized with practical and stylish solutions. From planners to desk organizers, our products are built to bring order to your workspace.",
                icon: "📂",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-purple-500"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="mt-16">
          <h2 className="text-center text-4xl font-semibold text-purple-600 mb-8">
            Our Mission
          </h2>
          <p className="text-start text-gray-700 text-lg mx-auto text-center mb-6">
            At <span className="font-semibold">Stationery Shop</span>, our
            mission goes beyond just offering premium stationery products. We
            are committed to creating a positive and empowering environment for
            everyone—whether you're a student, a professional, or an artist. We
            believe that the right tools can transform not only your workspace
            but your entire approach to work and creativity.
            <br />
            <br />
            We carefully curate our collection to ensure that every item we
            offer has a purpose beyond just functionality. Our stationery
            products are designed to inspire and motivate, while also helping
            you stay organized and focused. We understand the unique needs of
            our diverse customers, which is why our range includes everything
            from elegant notebooks and stylish pens to practical desk organizers
            and planners.
            <br />
            <br />
            Our goal is to make your daily tasks easier, more enjoyable, and
            more productive. Whether you're working from home, in the office, or
            pursuing your passion, we want to be your trusted partner in
            achieving success. We are not just providing tools, but creating an
            experience that fosters creativity, supports personal growth, and
            brings joy to your workspace. Every product we offer is a step
            towards a more organized, inspired, and efficient you.
            <br />
            <br />
            At Stationery Shop, we are more than just a retailer; we are a part
            of your journey towards achieving your dreams. We aim to be the
            go-to destination for high-quality, thoughtfully-designed products
            that elevate your everyday life and help you achieve your goals, one
            task at a time.
          </p>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-12">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="https://img.freepik.com/free-photo/closed-notebook-office-supplies_23-2147689745.jpg?uid=R8647428&ga=GA1.1.805615852.1737822151&semt=ais_hybrid"
              alt="Stationery Items"
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>

          {/* Text Section */}
          <div>
            <h2 className="text-3xl font-semibold text-purple-600 mb-4">
              Who We Are
            </h2>
            <p className="text-start text-gray-700 text-lg mb-6 leading-relaxed">
              At Stationery Shop, we are a team of passionate individuals who
              share a love for design, productivity, and craftsmanship. Our goal
              is simple: to bring you high-quality, thoughtfully designed
              stationery that enhances your daily routine. From sleek notebooks
              to functional desk accessories, every product we offer is selected
              with care to ensure it meets the needs of our customers.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              We understand that the right tools can make all the difference in
              staying organized, inspired, and productive. Whether you’re
              jotting down your ideas, organizing your workspace, or unleashing
              your creativity, we are here to support you with products that
              bring value to your work and lifestyle.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our collection is carefully curated to cater to various
              needs—whether you're looking for professional supplies, creative
              tools, or organizational essentials, we’ve got you covered. We
              believe that quality, functionality, and design should come
              together to help you stay productive and inspired every day.
            </p>
          </div>
        </div>

        

        

        {/* Call to Action */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Let’s Make Your Ideas Shine!
          </h2>
          <p className="text-gray-700 text-lg mb-6 text-start">
            Discover the perfect stationery to bring your creativity and
            organization to life. Visit us today and let us help you find the
            right tools for your next big idea. At Stationery Shop, we’re here
            to help you elevate your daily routine and create an inspiring
            workspace that fosters productivity.
          </p>
          <button
            className="bg-white border-2 border-purple-600 text-purple-600 font-bold px-6 py-3 rounded-full hover:bg-purple-600 hover:text-white transition-all"
            onClick={handleShopNowClick} // Add the onClick handler
          >
            Shop Now
          </button>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-center text-3xl font-semibold text-purple-600 mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emma Carter",
                role: "Founder & CEO",
                image:
                  "https://img.freepik.com/free-photo/portrait-young-girl-gray-t-shirt-purple-wall_197531-23362.jpg?uid=R8647428&ga=GA1.1.805615852.1737822151&semt=ais_hybrid",
              },
              {
                name: "James Brooks",
                role: "Product Designer",
                image:
                  "https://img.freepik.com/free-photo/guy-stylish-hat-beige-jacket-smiles-shows-his-finger-camera_197531-23258.jpg?uid=R8647428&ga=GA1.1.805615852.1737822151&semt=ais_hybrid",
              },
              {
                name: "Soph Green",
                role: "Marketing Specialist",
                image:
                  "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?uid=R8647428&ga=GA1.1.805615852.1737822151&semt=ais_hybrid",
              },
            ].map((teamMember, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center"
              >
                <img
                  src={teamMember.image}
                  alt={teamMember.name}
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {teamMember.name}
                </h3>
                <p className="text-purple-600">{teamMember.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
