import frame1 from "../assets/frame1.png";
import frame2 from "../assets/frame2.png";

export default function FramePicker({ onPick }) {
  return (
    <main className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl font-extrabold mb-6">Select a Frame</h2>

      <div className="flex gap-6">
        <button
          onClick={() => onPick(1)}
          className="hover:scale-105 transition"
        >
          <img
            src={frame1}
            className="w-64 rounded-2xl border border-white shadow-xl"
          />
          <p className="mt-2 text-xl font-bold">Frame 1 (3 Photos)</p>
        </button>

        <button
          onClick={() => onPick(2)}
          className="hover:scale-105 transition"
        >
          <img
            src={frame2}
            className="w-64 rounded-2xl border border-white shadow-xl"
          />
          <p className="mt-2 text-xl font-bold">Frame 2 (4 Photos)</p>
        </button>
      </div>
    </main>
  );
}
