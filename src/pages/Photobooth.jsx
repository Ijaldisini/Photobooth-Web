import ReactWebcam from "react-webcam";
import { useRef, useState, useEffect } from "react";

export default function Photobooth({ frame, onDone }) {
  const webcamRef = useRef(null);
  const totalShots = frame.includes("frame1") ? 3 : 4;

  const [shots, setShots] = useState([]);
  const [timer, setTimer] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [waitingAction, setWaitingAction] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isRunning || waitingAction || isFinished) return;

    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    } else {
      takeAutoShot();
    }
  }, [timer, isRunning, waitingAction, isFinished]);

  const takeAutoShot = () => {
    const img = webcamRef.current.getScreenshot();
    setShots((prev) => {
      const newShots = [...prev, img];

      if (newShots.length < totalShots) {
        setIsRunning(false);
        setWaitingAction(true);
      } else {
        setIsFinished(true);
        setWaitingAction(true);
        setIsRunning(false);
        setIsFinished(true);
        setIsFinished(true);
        setIsFinished(true);
        setIsFinished(true);
        setIsFinished(true);
        setIsFinished(true);
        setIsFinished(true);
        setIsFinished(true);
        setIsFinished(true);
        setIsFinished(true);
        setIsFinished(true);

        setTimeout(() => {
          setIsFinished(true);
          setWaitingAction(false);
          setIsFinished(true);
          onDone(newShots);
        }, 500);
      }
      return newShots;
    });
  };

  const startFirstShot = () => {
    setShots([]);
    setIsFinished(false);
    setWaitingAction(false);
    setIsRunning(true);
    setTimer(5);
  };

  const continueCapture = () => {
    setWaitingAction(false);
    setIsRunning(true);
    setTimer(3);
  };

  const repeatLastShot = () => {
    setShots((prev) => prev.slice(0, -1));
    setWaitingAction(false);
    setIsRunning(true);
    setTimer(3);
  };

  return (
    <main className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {/* TIMER DISPLAY */}
      {(isRunning || waitingAction) && !isFinished && (
        <div className="text-7xl font-extrabold mb-4">
          {timer > 0 ? timer : "📸"}
        </div>
      )}

      {/* WEBCAM */}
      <ReactWebcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        mirrored={true}
        className="w-80 h-auto rounded-2xl border-2 border-white shadow-xl"
      />

      {/* BUTTON FOTO PERTAMA */}
      {!isRunning && shots.length === 0 && !waitingAction && !isFinished && (
        <button
          onClick={startFirstShot}
          className="mt-6 px-8 py-3 bg-white text-black font-bold rounded-2xl shadow-lg hover:scale-105 transition"
        >
          Start & Take First Photo ({totalShots} Photos)
        </button>
      )}

      {/* PILIHAN LANJUT / ULANG FOTO SELANJUTNYA */}
      {waitingAction &&
        !isFinished &&
        shots.length < totalShots &&
        shots.length > 0 && (
          <div className="flex gap-4 mt-6">
            <button
              onClick={continueCapture}
              className="px-6 py-2 bg-green-500 text-black font-bold text-lg rounded-xl shadow-md hover:scale-105 transition"
            >
              Continue 📸
            </button>
            <button
              onClick={repeatLastShot}
              className="px-6 py-2 bg-red-500 text-black font-bold text-lg rounded-xl shadow-md hover:scale-105 transition"
            >
              Retake 🔄
            </button>
          </div>
        )}

      {/* PREVIEW FOTO */}
      {shots.length > 0 && (
        <section className="grid grid-cols-4 gap-2 mt-6">
          {shots.map((img, i) => (
            <figure
              key={i}
              className="border border-gray-500 rounded-lg shadow-sm"
            >
              <img
                src={img}
                alt={`Shot-${i + 1}`}
                className="w-20 h-20 object-cover rounded-lg"
              />
            </figure>
          ))}
        </section>
      )}

      <footer className="text-xl font-medium mt-4">
        {shots.length} / {totalShots} Photos Taken
      </footer>
    </main>
  );
}
