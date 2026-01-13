import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Dashboard } from "./pages";

// สำหรับ GitHub Pages - ต้องใส่ basename ให้ตรงกับ repo name
const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
