const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.get("/", (req, res, next) => {
  try {
    const { product, from, to } = req.query;
    let sql = `
      SELECT mp.record_id, p.product_name, mp.date,
             mp.open_price, mp.high_price, mp.low_price, mp.close_price, mp.currency
      FROM market_prices mp
      JOIN products p ON p.product_id = mp.product_id
      WHERE 1 = 1
    `;
    const params = [];
    if (product) {
      sql += " AND p.product_name = ?";
      params.push(product);
    }
    if (from) {
      sql += " AND mp.date >= ?";
      params.push(from);
    }
    if (to) {
      sql += " AND mp.date <= ?";
      params.push(to);
    }
    sql += " ORDER BY mp.date DESC LIMIT 500";

    const rows = db.prepare(sql).all(...params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", (req, res, next) => {
  try {
    const row = db
      .prepare(
        `
        SELECT mp.*, p.product_name
        FROM market_prices mp
        JOIN products p ON p.product_id = mp.product_id
        WHERE mp.record_id = ?
      `,
      )
      .get(req.params.id);
    if (!row) return res.status(404).json({ error: "Record not found" });
    res.json(row);
  } catch (err) {
    next(err);
  }
});
router.post("/", (req, res, next) => {
  try {
    const {
      product_id,
      date,
      open_price,
      high_price,
      low_price,
      close_price,
      currency,
    } = req.body;
    if (!product_id || !date || close_price == null) {
      return res.status(400).json({
        error: "product_id, date, and close_price are required",
      });
    }
    const info = db
      .prepare(
        `
        INSERT INTO market_prices
        (product_id, date, open_price, high_price, low_price, close_price, currency)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      )
      .run(
        product_id,
        date,
        open_price ?? null,
        high_price ?? null,
        low_price ?? null,
        close_price,
        currency || "ETB",
      );
    res.status(201).json({ record_id: info.lastInsertRowid });
  } catch (err) {
    next(err);
  }
});
router.put("/:id", (req, res, next) => {
  try {
    const { close_price, open_price, high_price, low_price } = req.body;
    const existing = db
      .prepare("SELECT record_id FROM market_prices WHERE record_id = ?")
      .get(req.params.id);
    if (!existing) return res.status(404).json({ error: "Record not found" });
    db.prepare(
      `
      UPDATE market_prices
      SET close_price = COALESCE(?, close_price),
          open_price  = COALESCE(?, open_price),
          high_price  = COALESCE(?, high_price),
          low_price   = COALESCE(?, low_price)
      WHERE record_id = ?
    `,
    ).run(
      close_price ?? null,
      open_price ?? null,
      high_price ?? null,
      low_price ?? null,
      req.params.id,
    );
    res.json({ updated: true });
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", (req, res, next) => {
  try {
    const info = db
      .prepare("DELETE FROM market_prices WHERE record_id = ?")
      .run(req.params.id);
    if (info.changes === 0)
      return res.status(404).json({ error: "Record not found" });
    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
