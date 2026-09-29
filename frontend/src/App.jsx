import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import PriceRecords from "./pages/PriceRecords";
import Analytics from "./pages/Analytics";
import AddPriceRecord from "./pages/AddPriceRecord";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./App.css";
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/records" element={<PriceRecords />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/add" element={<AddPriceRecord />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
