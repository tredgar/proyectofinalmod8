import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import CatalogPage from "./pages/client/CatalogPage";
import DashboardPage from "./pages/admin/DashboardPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
