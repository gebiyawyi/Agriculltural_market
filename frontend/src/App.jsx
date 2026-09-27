import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import PriceRecords from "./pages/PriceRecords";
import Analytics from "./pages/Analytics";
import AddPriceRecord from "./pages/AddPriceRecord";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/records" element={<PriceRecords />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/add" element={<AddPriceRecord />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
