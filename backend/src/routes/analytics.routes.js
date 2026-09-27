const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.get("/summary", (req, res, next) => {
  try {
    const total = db.prepare("SELECT COUNT(*) AS c FROM market_prices").get().c;
    const products = db.prepare("SELECT COUNT(*) AS c FROM products").get().c;
    const avgClose = db
      .prepare("SELECT AVG(close_price) AS a FROM market_prices")
      .get().a;
    const minDate = db
      .prepare("SELECT MIN(date) AS d FROM market_prices")
      .get().d;
    const maxDate = db
      .prepare("SELECT MAX(date) AS d FROM market_prices")
      .get().d;
    res.json({
      total_records: total,
      total_products: products,
      avg_close_price: avgClose,
      earliest_date: minDate,
      latest_date: maxDate,
    });
  } catch (err) {
    next(err);
  }
});
router.get("/by-product", (req, res, next) => {
  try {
    const rows = db
      .prepare(
        `
      SELECT p.product_name,
             AVG(mp.close_price) AS avg_close,
             MIN(mp.close_price) AS min_close,
             MAX(mp.close_price) AS max_close,
             COUNT(*)            AS record_count
      FROM market_prices mp
      JOIN products p ON p.product_id = mp.product_id
      GROUP BY p.product_name
      ORDER BY avg_close DESC
    `,
      )
      .all();
    res.json(rows);
  } catch (err) {
    next(err);
  }
});
router.get("/trend", (req, res, next) => {
  try {
    const { product } = req.query;
    let sql = `
      SELECT p.product_name, mp.date, mp.close_price
      FROM market_prices mp
      JOIN products p ON p.product_id = mp.product_id
      WHERE 1 = 1
    `;
    const params = [];
    if (product) {
      sql += " AND p.product_name = ?";
      params.push(product);
    }
    sql += " ORDER BY mp.date ASC";
    const rows = db.prepare(sql).all(...params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
});
router.get("/price-range", (req, res, next) => {
  try {
    const rows = db
      .prepare(
        `
      SELECT p.product_name,
             (mp.high_price - mp.low_price) AS price_range
      FROM market_prices mp
      JOIN products p ON p.product_id = mp.product_id
      WHERE mp.high_price IS NOT NULL
        AND mp.low_price IS NOT NULL
    `,
      )
      .all();
    res.json(rows);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
