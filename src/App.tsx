import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, Dashboard } from "./pages";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
