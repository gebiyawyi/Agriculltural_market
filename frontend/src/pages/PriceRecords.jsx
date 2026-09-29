import { useEffect, useState } from "react";
import { getPrices, getProducts } from "../services/api";
import Filters from "../components/Filters";
import PriceTable from "../components/PriceTable";
import Loader from "../components/Loader";
import "./PriceRecords.css";
export default function PriceRecords() {
  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {});
  }, []);
  useEffect(() => {
    setLoading(true);
    const params = {};
    if (selectedProduct) params.product = selectedProduct;
    if (fromDate) params.from = fromDate;
    if (toDate) params.to = toDate;
    getPrices(params)
      .then(setRows)
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, [selectedProduct, fromDate, toDate]);
  const reset = () => {
    setSelectedProduct("");
    setFromDate("");
    setToDate("");
  };
  return (
    <div className="page">
      <h1>Price Records</h1>
      <Filters
        products={products}
        selectedProduct={selectedProduct}
        onProductChange={setSelectedProduct}
        fromDate={fromDate}
        toDate={toDate}
        onFromChange={setFromDate}
        onToChange={setToDate}
        onReset={reset}
      />

      {loading ? (
        <Loader label="Loading records..." />
      ) : (
        <PriceTable rows={rows} />
      )}
    </div>
  );
}
