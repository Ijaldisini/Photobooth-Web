import { useRef, useEffect, useState } from "react";

function drawImageCover(ctx, img, x, y, w, h) {
  const imgRatio = img.width / img.height;
  const frameRatio = w / h;

  let drawW, drawH;

  const zoom = 2.35;

  if (imgRatio > frameRatio) {
    drawH = h * zoom;
    drawW = drawH * imgRatio;
  } else {
    drawW = w * zoom;
    drawH = drawW / imgRatio;
  }

  // posisi otomatis ke tengah
  const posX = x + (w - drawW) / 2;
  const posY = y + (h - drawH) / 2;

  ctx.drawImage(img, posX, posY, drawW, drawH);
}

export default function Result({ frame, shots }) {
  const canvasRef = useRef(null);
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

      canvas.width = w;
      canvas.height = h;

      ctx.clearRect(0, 0, w, h);

      const positions = [
        { x: 535, y: 500, w: 250, h: 330 },
        { x: 555, y: 1460, w: 250, h: 330 },
        { x: 535, y: 2450, w: 250, h: 330 },
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
          drawImageCover(
            ctx,
            img,
            positions[i].x,
            positions[i].y,
            positions[i].w,
            positions[i].h
          );

          loaded++;
          if (loaded === 3) {
            ctx.drawImage(frameImg, 0, 0, w, h);
            setFinalImage(canvas.toDataURL("image/png"));
          }
        };
      });
    };
  }, [frame, shots]);

  // ===========================================
  //        DOWNLOAD HD DOUBLE — FIXED
  // ===========================================
  const downloadImage = () => {
    const frameImg = new Image();
    frameImg.src = frame;
    frameImg.crossOrigin = "anonymous";

    frameImg.onload = () => {
      const W = frameImg.width;
      const H = frameImg.height;

      const hdSingle = document.createElement("canvas");
      hdSingle.width = W;
      hdSingle.height = H;
      const sctx = hdSingle.getContext("2d");

      const positions = [
        { x: 535, y: 500, w: 250, h: 330 },
        { x: 555, y: 1460, w: 250, h: 330 },
        { x: 535, y: 2450, w: 250, h: 330 },
      ];

      let loaded = 0;

      shots.slice(0, 3).forEach((shot, i) => {
        const img = new Image();
        img.src = shot;
        img.crossOrigin = "anonymous";

        img.onload = () => {
          drawImageCover(
            sctx,
            img,
            positions[i].x,
            positions[i].y,
            positions[i].w,
            positions[i].h
          );

          loaded++;
          if (loaded === 3) {
            sctx.drawImage(frameImg, 0, 0, W, H);

            const doubleCanvas = document.createElement("canvas");
            doubleCanvas.width = W * 2;
            doubleCanvas.height = H;

            const dctx = doubleCanvas.getContext("2d");
            dctx.drawImage(hdSingle, 0, 0, W, H);
            dctx.drawImage(hdSingle, W, 0, W, H);

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
      <canvas ref={canvasRef} className="hidden" />

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
