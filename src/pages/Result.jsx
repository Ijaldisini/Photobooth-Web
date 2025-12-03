import { useRef, useEffect, useState } from "react";

export default function Result({ frame, shots }) {
  const canvasRef = useRef(null);
  const [finalImage, setFinalImage] = useState(null);

  useEffect(() => {
    if (!frame || !shots || shots.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const frameImg = new Image();
    frameImg.src = frame;

    frameImg.onload = () => {
      canvas.width = frameImg.width;
      canvas.height = frameImg.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(frameImg, 0, 0);

      const positions = [
        { x: 100, y: 200, w: 450, h: 450 }, // foto 1
        { x: 100, y: 750, w: 450, h: 450 }, // foto 2
        { x: 100, y: 1300, w: 450, h: 450 }, // foto 3
      ];

      let loaded = 0;

      shots.slice(0, 3).forEach((shot, index) => {
        const img = new Image();
        img.src = shot;

        img.onload = () => {
          ctx.drawImage(
            img,
            positions[index].x,
            positions[index].y,
            positions[index].w,
            positions[index].h
          );

          loaded++;
          if (loaded === 3) {
            setFinalImage(canvas.toDataURL("image/png"));
          }
        };
      });
    };
  }, [frame, shots]);

  // DOWNLOAD FUNCTION
  const downloadImage = () => {
    const link = document.createElement("a");
    link.download = "photobooth.png";
    link.href = finalImage;
    link.click();
  };

  if (!frame) return <p className="text-white">Frame not selected.</p>;

  return (
    <main className="text-white bg-black min-h-[80vh] flex flex-col items-center p-6">
      {/* canvas di-hide */}
      <canvas ref={canvasRef} className="hidden" />

      {finalImage && (
        <div className="scale-[0.25] origin-top-left">
          <img
            src={finalImage}
            alt="result"
            className="rounded-xl shadow-xl border border-white"
          />
        </div>
      )}

      {/* tombol download */}
      <button
        onClick={downloadImage}
        className="mt-6 px-6 py-2 bg-white text-black font-bold rounded-xl hover:scale-105 transition"
      >
        Download Result
      </button>
    </main>
  );
}
