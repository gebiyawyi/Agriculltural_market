import { useEffect, useState } from "react";
import { createPrice, getProducts } from "../services/api";
export default function AddPriceRecord() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product_id: "",
    date: "",
    open_price: "",
    high_price: "",
    low_price: "",
    close_price: "",
    currency: "ETB",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {});
  }, []);
  const update = (key, value) => setForm({ ...form, [key]: value });
  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!form.product_id || !form.date || form.close_price === "") {
      setError("Product, date, and close price are required.");
      return;
    }
    const payload = {
      product_id: Number(form.product_id),
      date: form.date,
      close_price: Number(form.close_price),
      open_price: form.open_price === "" ? null : Number(form.open_price),
      high_price: form.high_price === "" ? null : Number(form.high_price),
      low_price: form.low_price === "" ? null : Number(form.low_price),
      currency: form.currency || "ETB",
    };
    try {
      const res = await createPrice(payload);
      setMessage(`Record added successfully (ID: ${res.record_id})`);
      setForm({
        product_id: "",
        date: "",
        open_price: "",
        high_price: "",
        low_price: "",
        close_price: "",
        currency: "ETB",
      });
    } catch (err) {
      setError(
        err?.response?.data?.error || err.message || "Failed to add record",
      );
    }
  };
  return (
    <div className="page">
      <h1>Add Price Record</h1>
      <form className="add-form" onSubmit={submit}>
        <div className="form-row">
          <label>Product</label>
          <select
            value={form.product_id}
            onChange={(e) => update("product_id", e.target.value)}
          >
            <option value="">Select a product</option>
            {products.map((p) => (
              <option key={p.product_id} value={p.product_id}>
                {p.product_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Open Price</label>
          <input
            type="number"
            step="0.01"
            value={form.open_price}
            onChange={(e) => update("open_price", e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>High Price</label>
          <input
            type="number"
            step="0.01"
            value={form.high_price}
            onChange={(e) => update("high_price", e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Low Price</label>
          <input
            type="number"
            step="0.01"
            value={form.low_price}
            onChange={(e) => update("low_price", e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Close Price *</label>
          <input
            type="number"
            step="0.01"
            required
            value={form.close_price}
            onChange={(e) => update("close_price", e.target.value)}
          />
        </div>
        <div className="form-row">
          <label>Currency</label>
          <input
            type="text"
            value={form.currency}
            onChange={(e) => update("currency", e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary">
          Add Record
        </button>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
