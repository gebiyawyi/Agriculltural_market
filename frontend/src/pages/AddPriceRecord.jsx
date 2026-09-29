import { useEffect, useMemo, useRef, useState } from "react";
import { createPrice, getProducts } from "../services/api";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";
import { formatCurrency, formatDate } from "../utils/format";
import "./AddPriceRecord.css";

const EMPTY_FORM = {
  product_id: "",
  date: "",
  open_price: "",
  high_price: "",
  low_price: "",
  close_price: "",
  currency: "ETB",
};

function getToday() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().split("T")[0];
}

export default function AddPriceRecord() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [toast, setToast] = useState({
    message: "",
    type: "info",
  });
  const [lastSaved, setLastSaved] = useState(null);

  const productRef = useRef(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {
        setToast({
          message: "Unable to load products. Please refresh the page.",
          type: "error",
        });
      });

    productRef.current?.focus();
  }, []);

  const selectedProduct = useMemo(
    () =>
      products.find((p) => String(p.product_id) === String(form.product_id)),
    [products, form.product_id],
  );

  const validate = (data = form) => {
    const errors = {};

    if (!data.product_id) {
      errors.product_id = "Please select a product";
    }

    if (!data.date) {
      errors.date = "Date is required";
    } else if (data.date > getToday()) {
      errors.date = "Date cannot be in the future";
    }

    if (data.close_price === "") {
      errors.close_price = "Close price is required";
    } else if (
      !Number.isFinite(Number(data.close_price)) ||
      Number(data.close_price) < 0
    ) {
      errors.close_price = "Enter a valid non-negative price";
    }

    ["open_price", "high_price", "low_price"].forEach((key) => {
      if (data[key] !== "") {
        if (!Number.isFinite(Number(data[key])) || Number(data[key]) < 0) {
          errors[key] = "Enter a valid non-negative price";
        }
      }
    });

    if (
      data.high_price !== "" &&
      data.low_price !== "" &&
      Number(data.high_price) < Number(data.low_price)
    ) {
      errors.high_price = "High price cannot be less than low price";
    }

    if (
      data.high_price !== "" &&
      data.close_price !== "" &&
      Number(data.close_price) > Number(data.high_price)
    ) {
      errors.close_price = "Close price cannot exceed high price";
    }

    if (
      data.low_price !== "" &&
      data.close_price !== "" &&
      Number(data.close_price) < Number(data.low_price)
    ) {
      errors.close_price = "Close price cannot be less than low price";
    }

    return errors;
  };

  const update = (key, value) => {
    setForm((current) => {
      const next = { ...current, [key]: value };

      if (touched[key]) {
        setFieldErrors(validate(next));
      }

      return next;
    });
  };

  const blur = (key) => {
    setTouched((current) => ({
      ...current,
      [key]: true,
    }));

    setFieldErrors(validate());
  };

  const reset = () => {
    setForm(EMPTY_FORM);
    setFieldErrors({});
    setTouched({});
    setLastSaved(null);
    productRef.current?.focus();
  };

  const submit = async (event) => {
    event.preventDefault();

    const errors = validate();

    setFieldErrors(errors);
    setTouched({
      product_id: true,
      date: true,
      close_price: true,
      open_price: true,
      high_price: true,
      low_price: true,
    });

    if (Object.keys(errors).length > 0) {
      setToast({
        message: "Please fix the highlighted fields",
        type: "error",
      });
      return;
    }

    setSubmitting(true);

    const payload = {
      product_id: Number(form.product_id),
      date: form.date,
      close_price: Number(form.close_price),
      open_price: form.open_price === "" ? null : Number(form.open_price),
      high_price: form.high_price === "" ? null : Number(form.high_price),
      low_price: form.low_price === "" ? null : Number(form.low_price),
      currency: form.currency.trim() || "ETB",
    };

    try {
      const res = await createPrice(payload);

      setLastSaved({
        record_id: res.record_id,
        product_name: selectedProduct?.product_name,
        date: form.date,
        close_price: Number(form.close_price),
        currency: form.currency.trim() || "ETB",
      });

      setToast({
        message: `Record #${res.record_id} added successfully`,
        type: "success",
      });

      setForm(EMPTY_FORM);
      setTouched({});
      setFieldErrors({});
      productRef.current?.focus();
    } catch (err) {
      setToast({
        message:
          err?.response?.data?.error || err.message || "Failed to save record",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const today = getToday();

  return (
    <div className="add-page">
      <div className="add-page__background" aria-hidden="true" />

      <PageHeader
        title="Add Price Record"
        subtitle="Record a new price observation for a product"
      />

      {lastSaved && (
        <div className="add-page__banner" role="status">
          <div className="add-page__banner-icon" aria-hidden="true">
            ✓
          </div>

          <div className="add-page__banner-body">
            <strong>Record #{lastSaved.record_id} saved successfully</strong>
            <span>
              {lastSaved.product_name} · {formatDate(lastSaved.date)} ·{" "}
              {formatCurrency(lastSaved.close_price, lastSaved.currency)}
            </span>
          </div>

          <button
            type="button"
            className="add-page__banner-close"
            onClick={() => setLastSaved(null)}
            aria-label="Dismiss success message"
          >
            ×
          </button>
        </div>
      )}

      <div className="add-page__layout">
        <form className="add-form" onSubmit={submit} noValidate>
          <Card padding="lg">
            <div className="add-form__section">
              <div className="add-form__section-header">
                <div className="add-form__section-heading">
                  <span className="add-form__section-number">01</span>
                  <h2 className="add-form__section-title">
                    Required Information
                  </h2>
                </div>

                <span className="add-form__section-hint">
                  <span className="req">*</span> Required fields
                </span>
              </div>

              <div className="form-grid">
                <div className="form-row form-row--full">
                  <label htmlFor="product">
                    Product <span className="req">*</span>
                  </label>

                  <div className="input-wrap">
                    <select
                      id="product"
                      ref={productRef}
                      value={form.product_id}
                      onChange={(e) => update("product_id", e.target.value)}
                      onBlur={() => blur("product_id")}
                      className={fieldErrors.product_id ? "has-error" : ""}
                      aria-invalid={Boolean(fieldErrors.product_id)}
                    >
                      <option value="">Select a product...</option>

                      {products.map((product) => (
                        <option
                          key={product.product_id}
                          value={product.product_id}
                        >
                          {product.product_name} ({product.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  {fieldErrors.product_id && (
                    <span className="form-error">{fieldErrors.product_id}</span>
                  )}
                </div>

                <div className="form-row">
                  <label htmlFor="date">
                    Date <span className="req">*</span>
                  </label>

                  <div className="input-wrap">
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      max={today}
                      onChange={(e) => update("date", e.target.value)}
                      onBlur={() => blur("date")}
                      className={fieldErrors.date ? "has-error" : ""}
                      aria-invalid={Boolean(fieldErrors.date)}
                    />
                  </div>

                  {fieldErrors.date && (
                    <span className="form-error">{fieldErrors.date}</span>
                  )}
                </div>

                <div className="form-row">
                  <label htmlFor="close">
                    Close Price <span className="req">*</span>
                  </label>

                  <div className="input-wrap input-wrap--suffix">
                    <input
                      id="close"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={form.close_price}
                      onChange={(e) => update("close_price", e.target.value)}
                      onBlur={() => blur("close_price")}
                      className={fieldErrors.close_price ? "has-error" : ""}
                      aria-invalid={Boolean(fieldErrors.close_price)}
                    />

                    <span className="input-suffix">
                      {form.currency || "ETB"}
                    </span>
                  </div>

                  {fieldErrors.close_price && (
                    <span className="form-error">
                      {fieldErrors.close_price}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="add-form__divider" />

            <div className="add-form__section">
              <div className="add-form__section-header">
                <div className="add-form__section-heading">
                  <span className="add-form__section-number">02</span>
                  <h2 className="add-form__section-title">
                    Optional Price Range
                  </h2>
                </div>

                <span className="add-form__section-hint">
                  Leave blank if unavailable
                </span>
              </div>

              <div className="form-grid form-grid--3">
                <div className="form-row">
                  <label htmlFor="open">Open Price</label>

                  <div className="input-wrap input-wrap--suffix">
                    <input
                      id="open"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={form.open_price}
                      onChange={(e) => update("open_price", e.target.value)}
                      onBlur={() => blur("open_price")}
                      className={fieldErrors.open_price ? "has-error" : ""}
                      aria-invalid={Boolean(fieldErrors.open_price)}
                    />

                    <span className="input-suffix">
                      {form.currency || "ETB"}
                    </span>
                  </div>

                  {fieldErrors.open_price && (
                    <span className="form-error">{fieldErrors.open_price}</span>
                  )}
                </div>

                <div className="form-row">
                  <label htmlFor="high">High Price</label>

                  <div className="input-wrap input-wrap--suffix">
                    <input
                      id="high"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={form.high_price}
                      onChange={(e) => update("high_price", e.target.value)}
                      onBlur={() => blur("high_price")}
                      className={fieldErrors.high_price ? "has-error" : ""}
                      aria-invalid={Boolean(fieldErrors.high_price)}
                    />

                    <span className="input-suffix">
                      {form.currency || "ETB"}
                    </span>
                  </div>

                  {fieldErrors.high_price && (
                    <span className="form-error">{fieldErrors.high_price}</span>
                  )}
                </div>

                <div className="form-row">
                  <label htmlFor="low">Low Price</label>

                  <div className="input-wrap input-wrap--suffix">
                    <input
                      id="low"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={form.low_price}
                      onChange={(e) => update("low_price", e.target.value)}
                      onBlur={() => blur("low_price")}
                      className={fieldErrors.low_price ? "has-error" : ""}
                      aria-invalid={Boolean(fieldErrors.low_price)}
                    />

                    <span className="input-suffix">
                      {form.currency || "ETB"}
                    </span>
                  </div>

                  {fieldErrors.low_price && (
                    <span className="form-error">{fieldErrors.low_price}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="add-form__divider" />

            <div className="add-form__section">
              <div className="add-form__section-header">
                <div className="add-form__section-heading">
                  <span className="add-form__section-number">03</span>
                  <h2 className="add-form__section-title">Currency Settings</h2>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-row form-row--full">
                  <label htmlFor="currency">Currency Code</label>

                  <div className="input-wrap">
                    <input
                      id="currency"
                      type="text"
                      placeholder="ETB"
                      value={form.currency}
                      maxLength={3}
                      onChange={(e) =>
                        update("currency", e.target.value.toUpperCase())
                      }
                    />
                  </div>

                  <span className="form-hint">
                    Default currency is ETB (Ethiopian Birr).
                  </span>
                </div>
              </div>
            </div>

            <div className="add-form__actions">
              <Button
                type="button"
                variant="secondary"
                onClick={reset}
                disabled={submitting}
              >
                Clear Form
              </Button>

              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? "Saving..." : "Add Record"}
              </Button>
            </div>
          </Card>
        </form>

        <aside className="add-preview">
          <Card
            title="Record Preview"
            subtitle="Live summary of your price record"
            padding="md"
          >
            <div className="add-preview__status">
              <span className="add-preview__status-dot" />
              <span>Live Preview</span>
            </div>

            <dl className="preview-list">
              <div className="preview-list__row">
                <dt>Product</dt>
                <dd>{selectedProduct?.product_name || "—"}</dd>
              </div>

              <div className="preview-list__row">
                <dt>Category</dt>
                <dd>{selectedProduct?.category || "—"}</dd>
              </div>

              <div className="preview-list__row">
                <dt>Date</dt>
                <dd>{form.date ? formatDate(form.date) : "—"}</dd>
              </div>

              <div className="preview-list__row">
                <dt>Open</dt>
                <dd>
                  {form.open_price !== ""
                    ? formatCurrency(form.open_price, form.currency)
                    : "—"}
                </dd>
              </div>

              <div className="preview-list__row">
                <dt>High</dt>
                <dd>
                  {form.high_price !== ""
                    ? formatCurrency(form.high_price, form.currency)
                    : "—"}
                </dd>
              </div>

              <div className="preview-list__row">
                <dt>Low</dt>
                <dd>
                  {form.low_price !== ""
                    ? formatCurrency(form.low_price, form.currency)
                    : "—"}
                </dd>
              </div>
            </dl>

            <div className="preview-close">
              <span className="preview-close__label">Closing Price</span>

              <strong className="preview-close__value">
                {form.close_price !== ""
                  ? formatCurrency(form.close_price, form.currency)
                  : "—"}
              </strong>

              <span className="preview-close__caption">
                Final recorded market price
              </span>
            </div>
            <div className="preview-note">
            </div>
          </Card>
        </aside>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />
    </div>
  );
}
