export default function Landing({ onStart }) {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Photobooth</h1>
      <button
        onClick={onStart}
        className="px-6 py-3 bg-white text-black font-bold rounded-2xl hover:scale-105 transition"
      >
        Start
      </button>
    </main>
  );
}
