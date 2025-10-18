import React, { useState } from "react";
import genAI from "../../gemini";
console.log(genAI);

function Propmtpage() {
  const [prompt, setPrompt] = useState("");

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(prompt);
    setPrompt(""); // clear input
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6">
      {/* Result Box */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-2xl mb-8 text-center border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-600 mb-3">Result</h1>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          pariatur provident dignissimos culpa quia reprehenderit dicta
          voluptatibus tempore incidunt nobis ipsa aspernatur aut, fugiat maxime
          asperiores odio minima quibusdam iste?
        </p>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl bg-white shadow-md rounded-full p-2 border border-gray-200"
      >
        <input
          type="text"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={handleChange}
          className="flex-1 px-4 py-2 rounded-full outline-none text-gray-700"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition"
        >
          Generate
        </button>
      </form>

      {/* Footer */}
      <p className="text-gray-400 text-sm mt-8">Powered by PitchCraft AI 💡</p>
    </div>  
  );
}

export default Propmtpage;
