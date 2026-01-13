import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, Dashboard, Login } from "./pages";
import { usePageTracking } from "./hooks/useTracking";

// Wrapper to enable tracking
const AppRoutes = () => {
  usePageTracking();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
