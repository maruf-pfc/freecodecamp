import { useState } from "react";

export default function About() {
  const [isOn, setIsOn] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200 p-6">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8 drop-shadow-lg">
        Welcome to the About Page!
      </h1>

      {/* Toggle state section */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center mb-6">
        <p className="text-xl font-medium mb-4">{isOn ? "🔥 It's on!" : "🎢 It's rolling!"}</p>
        <button
          onClick={() => setIsOn(!isOn)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          Switch state
        </button>
      </div>

      {/* Input toggle section */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
        <input
          data-testid="testInput"
          type="text"
          placeholder="Type something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        />
        <button
          onClick={() => setShowInput(!showInput)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mb-4 cursor-pointer"
        >
          Print input
        </button>

        {showInput && inputValue && (
          <p className="mt-2 text-gray-700 text-lg font-semibold">{inputValue}</p>
        )}
      </div>
    </div>
  );
}
