

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-40">
      <div className="flex space-x-1">
        <span className="w-4 h-4 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-4 h-4 bg-purple-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-4 h-4 bg-purple-600 rounded-full animate-bounce"></span>
      </div>
      <p className="text-lg text-purple-600 font-medium">{text}</p>
    </div>
  );
};

export default Loading;
