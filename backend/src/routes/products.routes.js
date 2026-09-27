const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.get("/", (req, res, next) => {
  try {
    const rows = db
      .prepare(
        "SELECT product_id, product_name, category FROM products ORDER BY product_name",
      )
      .all();
    res.json(rows);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
