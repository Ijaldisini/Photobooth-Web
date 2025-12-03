import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

import Landing from "./pages/Landing";
import FramePicker from "./pages/FramePicker";
import Photobooth from "./pages/Photobooth";
import Result from "./pages/Result";

// asset PNG harus langsung import
import frame1 from "./assets/frame1.png";
import frame2 from "./assets/frame2.png";

export default function App() {
  const [frame, setFrame] = useState(null);
  const [shots, setShots] = useState([]);

  const navigate = useNavigate();

  const handleStart = () => navigate("/photobooth-frame");

  const handlePick = (id) => {
    const selected = id === 1 ? frame1 : frame2;
    setFrame(selected); // sekarang berisi PATH PNG
    navigate("/photobooth-picture");
  };

  const handleDone = (imgs) => {
    setShots(imgs);
    navigate("/photobooth-result");
  };

  return (
    <Routes>
      <Route path="/" element={<Landing onStart={handleStart} />} />
      <Route
        path="/photobooth-frame"
        element={<FramePicker onPick={handlePick} />}
      />
      <Route
        path="/photobooth-picture"
        element={<Photobooth frame={frame} onDone={handleDone} />}
      />
      <Route
        path="/photobooth-result"
        element={<Result frame={frame} shots={shots} />}
      />
    </Routes>
  );
}
