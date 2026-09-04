// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import TripPage from "./pages/TripPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/v/:id" element={<TripPage />} />
      </Routes>
    </BrowserRouter>
  );
}
