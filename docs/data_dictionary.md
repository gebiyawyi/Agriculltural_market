# Data Dictionary

## 1. Source

The dataset used in this project is derived from the **World Bank Ethiopia Monthly Food Price Estimates** dataset. It contains monthly price estimates for Ethiopian food products spanning 2007 through 2026.

- Original format: CSV
- Rows in raw file: 1,888
- Columns in raw file: 11
- Currency: Ethiopian Birr (ETB)
- Country: Ethiopia
- Market label: "Market Average" (only one market is represented)

## 2. Raw Dataset Columns (`analysis/data/data.csv`)

| Column | Type | Description | Unit |
|---|---|---|---|
| Unnamed: 0 | Integer | Leftover pandas index column | — |
| Country | Text | Country name | — |
| Region | Text | Ethiopian region (may be blank for aggregate rows) | — |
| Market | Text | Market label ("Market Average") | — |
| Product | Text | Product name (Maize, Wheat, Sorghum, Teff, Pasta, Livestock Goat, Livestock Sheep, Food Price Index) | — |
| Date | Text | Month of the observation | YYYY-MM-DD |
| Open | Float | Opening price estimate | ETB |
| High | Float | Highest price estimate | ETB |
| Low | Float | Lowest price estimate | ETB |
| Close | Float | Closing price estimate | ETB |
| Currency | Text | Currency code | ETB |

## 3. Cleaned Dataset Columns (`analysis/cleaned_data/cleaned_data.csv`)

After cleaning:

- `Unnamed: 0` was dropped
- Text columns were trimmed and case-standardized
- `Date` was converted to ISO format
- Price columns were enforced numeric
- Rows with `High < Low` or negative prices were removed
- Duplicate rows were removed
- Rows missing `Product`, `Date`, or `Close` were removed

| Column | Type | Description |
|---|---|---|
| Country | Text | Standardized to Title Case |
| Region | Text | Standardized to Title Case |
| Market | Text | Standardized to Title Case |
| Product | Text | Standardized to Title Case |
| Date | Text (ISO) | YYYY-MM-DD |
| Open | Float | Opening price in ETB |
| High | Float | Highest price in ETB |
| Low | Float | Lowest price in ETB |
| Close | Float | Closing price in ETB |
| Currency | Text | Always "ETB" |

## 4. Summary Dataset (`analysis/cleaned_data/summary_by_product.csv`)

One row per product with aggregated statistics.

| Column | Type | Description |
|---|---|---|
| Product | Text | Product name |
| avg_close | Float | Average of all Close values for the product |
| min_close | Float | Minimum Close value |
| max_close | Float | Maximum Close value |
| record_count | Integer | Number of records for the product |

## 5. SQLite Schema (`backend/database/agriculture.db`)

### Table: `products`

| Column | Type | Description |
|---|---|---|
| product_id | INTEGER PK | Unique identifier |
| product_name | TEXT UNIQUE | Product name |
| category | TEXT | "Grain", "Livestock", "Index", or "Other" |

### Table: `market_prices`

| Column | Type | Description |
|---|---|---|
| record_id | INTEGER PK | Unique identifier |
| product_id | INTEGER FK | References products.product_id |
| date | TEXT | YYYY-MM-DD |
| open_price | REAL | ETB |
| high_price | REAL | ETB |
| low_price | REAL | ETB |
| close_price | REAL | ETB |
| currency | TEXT | "ETB" |

### Table: `summary_by_product`

| Column | Type | Description |
|---|---|---|
| product_id | INTEGER PK | References products.product_id |
| avg_close | REAL | Average close price |
| min_close | REAL | Minimum close price |
| max_close | REAL | Maximum close price |
| record_count | INTEGER | Number of records |

## 6. Important Limitations

- **No sales quantity data** — this dataset contains prices only, not volumes sold.
- **No individual market data** — the only market label is "Market Average".
- **No Motta-specific records** — records are not broken down by individual local markets.
- **Comparisons across categories** (grains vs livestock vs index) are on different scales and should be interpreted carefully.

## 7. Units and Currency

All prices are in **Ethiopian Birr (ETB)** unless the Currency column says otherwise. The food price index is a dimensionless index value, not a price in ETB.