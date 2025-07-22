
const Success = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
                <div className="text-green-600 text-5xl mb-4">✅</div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">Order Successful!</h1>
                <p className="text-gray-600">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>
                <button
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition duration-300"
                    onClick={() => window.location.href = '/'}
                >
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default Success;
