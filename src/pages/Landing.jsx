export default function Landing({ onStart }) {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-black text-white px-4">
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-center drop-shadow-lg">
        Welcome to
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          Photobooth
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-neutral-400 mb-10 text-center max-w-md">
        Capture your best moment with style — simple, fast, and beautiful.
      </p>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="px-10 py-4 rounded-2xl text-lg font-semibold bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-pink-500/40 hover:scale-110"
      >
        Start
      </button>
    </main>
  );
}
