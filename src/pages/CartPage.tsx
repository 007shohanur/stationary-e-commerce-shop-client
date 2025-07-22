import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/features/cart/cartSlice";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * (item.cartQuantity ?? 1), // Default to 1 if cartQuantity is undefined
    0
  );

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleRemoveItem = (itemId: string) => {
    // Dispatch the action to remove the item from the cart (assuming you have this action)
    dispatch(removeFromCart(itemId));
    toast.success("Removed From Cart", {
      duration: 3000,
    });
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        `https://stationary-shop-api-server.vercel.app/api/orders/initiate-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            total_amount: cartTotal,
            cartItems: cartItems,
            currency: "BDT",
            tran_id: `TRX-${Date.now()}`,
            success_url: `https://stationary-shop-e-commerce.vercel.app/success`,
            fail_url: `https://stationary-shop-e-commerce.vercel.app/fail`,
            cancel_url: `https://stationary-shop-e-commerce.vercel.app/cancel`,
            customer: {
              name: user?.name,
              email: user?.email,
              phone: user?.phone || "123",
              address: user?.address || "Dhaka",
              city: "Dhaka",
              country: "Bangladesh",
            },
          }),
        }
      );

      const data = await response.json();

      if (data.success && data.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
        toast.success("Payment initiated successfully! Redirecting...", {
          duration: 3000,
        });
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("An error occurred while initiating payment.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            Your cart is empty 😕
          </p>
        ) : (
          <div className="flex flex-col sm:flex-row justify-between items-start lg:space-x-10 space-y-6 lg:space-y-0">
            <div className="space-y-6 w-full lg:w-[65%]">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row justify-between bg-white rounded-xl shadow-md overflow-hidden"
                >
                  {/* Left: Image */}
                  <div className="sm:w-48 flex-shrink-0">
                    <img
                      src={item.productImg}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Middle: Details */}
                  <div className="flex-1 p-6">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {item.description || "No description available."}
                    </p>
                    <div className="flex flex-col flex-wrap gap-2 mt-4 text-gray-600 text-sm">
                      <span>
                        <strong>Category:</strong> {item.category}
                      </span>
                      <span>
                        <strong>Brand:</strong> {item.brand || "Unknown"}
                      </span>
                      <span>
                        <strong>Quantity:</strong> {item.cartQuantity ?? 1}
                      </span>
                    </div>
                  </div>

                  {/* Right: Price + Action */}
                  <div className="p-6 flex flex-col justify-between items-end">
                    <span className="text-xl font-bold text-purple-500 mb-4">
                      BDT {(item.price * (item.cartQuantity ?? 1)).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <FaTrashAlt className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="bg-white p-10 rounded-xl shadow-lg w-full lg:w-[65%]">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Cart Summary
              </h3>

              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>BDT {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-semibold text-gray-800">
                  <span>Total</span>
                  <span>BDT {cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="mt-6 w-full py-6 text-md bg-purple-500 hover:bg-purple-700 text-white rounded-lg transition"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
