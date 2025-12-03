import { useRef, useEffect, useState } from "react";

export default function Result({ frame, shots }) {
  const canvasRef = useRef(null); // SINGLE canvas (preview)
  const [finalImage, setFinalImage] = useState(null);

  useEffect(() => {
    if (!frame || !shots || shots.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const frameImg = new Image();
    frameImg.src = frame;
    frameImg.crossOrigin = "anonymous";

    frameImg.onload = () => {
      const maxH = window.innerHeight * 0.9;
      const scale = maxH / frameImg.height;

      const w = frameImg.width * scale;
      const h = frameImg.height * scale;

      // SINGLE CANVAS
      canvas.width = w;
      canvas.height = h;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(frameImg, 0, 0, w, h);

      const positions = [
        { x: 40, y: 120, w: 250, h: 250 },
        { x: 40, y: 400, w: 250, h: 250 },
        { x: 40, y: 680, w: 250, h: 250 },
      ].map((p) => ({
        x: p.x * scale,
        y: p.y * scale,
        w: p.w * scale,
        h: p.h * scale,
      }));

      let loaded = 0;

      shots.slice(0, 3).forEach((shot, i) => {
        const img = new Image();
        img.src = shot;
        img.crossOrigin = "anonymous";

        img.onload = () => {
          ctx.drawImage(
            img,
            positions[i].x,
            positions[i].y,
            positions[i].w,
            positions[i].h
          );

          loaded++;
          if (loaded === 3) {
            setFinalImage(canvas.toDataURL("image/png"));
          }
        };
      });
    };
  }, [frame, shots]);

  // ===========================================
  //           DOWNLOAD DOUBLE CANVAS
  // ===========================================
  const downloadImage = () => {
    const previewCanvas = canvasRef.current;

    // --- Load frame asli dalam resolusi full ---
    const frameImg = new Image();
    frameImg.src = frame;
    frameImg.crossOrigin = "anonymous";

    frameImg.onload = () => {
      const W = frameImg.width; // resolusi asli frame
      const H = frameImg.height;

      // canvas HD SINGLE (bukan preview!)
      const hdSingle = document.createElement("canvas");
      hdSingle.width = W;
      hdSingle.height = H;

      const sctx = hdSingle.getContext("2d");
      sctx.drawImage(frameImg, 0, 0, W, H);

      // === posisi foto berdasarkan resolusi asli ===
      const positions = [
        { x: 40, y: 120, w: 250, h: 250 },
        { x: 40, y: 400, w: 250, h: 250 },
        { x: 40, y: 680, w: 250, h: 250 },
      ];

      let loaded = 0;

      shots.slice(0, 3).forEach((shot, i) => {
        const img = new Image();
        img.src = shot;
        img.crossOrigin = "anonymous";

        img.onload = () => {
          sctx.drawImage(
            img,
            positions[i].x,
            positions[i].y,
            positions[i].w,
            positions[i].h
          );

          loaded++;
          if (loaded === 3) {
            // === setelah SINGLE HD selesai, buat DOUBLE ===
            const doubleCanvas = document.createElement("canvas");
            doubleCanvas.width = W * 2;
            doubleCanvas.height = H;

            const dctx = doubleCanvas.getContext("2d");

            // kiri
            dctx.drawImage(hdSingle, 0, 0, W, H);

            // kanan
            dctx.drawImage(hdSingle, W, 0, W, H);

            // export HD
            const final = doubleCanvas.toDataURL("image/png");

            fetch(final)
              .then((res) => res.blob())
              .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "photobooth-HD-double.png";
                link.click();
              });
          }
        };
      });
    };
  };

  return (
    <main className="text-white bg-black min-h-screen flex flex-col items-center p-6">
      {/* Canvas preview (SINGLE only) */}
      <canvas ref={canvasRef} className="hidden" />

      {/* PREVIEW tetap single */}
      {finalImage && (
        <img
          src={finalImage}
          alt="result"
          className="rounded-2xl shadow-xl border border-white w-[350px] mt-4"
        />
      )}

      <button
        onClick={downloadImage}
        className="mt-6 px-6 py-2 bg-white text-black font-bold rounded-2xl hover:scale-105 transition"
      >
        Download Result (Double)
      </button>
    </main>
  );
}
