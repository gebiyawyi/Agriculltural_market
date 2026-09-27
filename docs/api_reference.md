# API Reference

Base URL: `http://localhost:5000/api`

All responses are JSON. All dates use ISO format `YYYY-MM-DD`.

## Health

### GET /health

Returns server status.

**Response:**
```json
{ "status": "ok", "timestamp": "2026-09-27T10:00:00.000Z" }