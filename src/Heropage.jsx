import React from 'react'

function Heropage() {
  return (
   <div className="min-h-screen bg-white flex flex-col justify-center items-center text-center px-6">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-600 mb-4">
        PitchCraft
      </h1>

      {/* Subheading */}
      <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-6">
        Tumhara AI Startup Partner 🚀  
        <br />
        “Apna idea likho — aur AI tumhara startup pitch bana de!”
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition">
          Get Started
        </button>
        <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-600 hover:text-white transition">
          Learn More
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-gray-500 text-sm">
        © {new Date().getFullYear()} PitchCraft — Tumhara AI Startup Partner 💡
      </footer>
    </div>
  )
}

export default Heropage
 