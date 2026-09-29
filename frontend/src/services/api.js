// import axios from "axios";
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   timeout: 10000,
// });
// export const getSummary = () =>
//   api.get("/analytics/summary").then((r) => r.data);
// export const getProducts = () => api.get("/products").then((r) => r.data);
// export const getPrices = (params = {}) =>
//   api.get("/prices", { params }).then((r) => r.data);
// export const getPriceById = (id) =>
//   api.get(`/prices/${id}`).then((r) => r.data);
// export const createPrice = (payload) =>
//   api.post("/prices", payload).then((r) => r.data);
// export const updatePrice = (id, payload) =>
//   api.put(`/prices/${id}`, payload).then((r) => r.data);
// export const deletePrice = (id) =>
//   api.delete(`/prices/${id}`).then((r) => r.data);
// export const getAnalyticsByProduct = () =>
//   api.get("/analytics/by-product").then((r) => r.data);
// export const getTrend = (product) =>
//   api
//     .get("/analytics/trend", { params: product ? { product } : {} })
//     .then((r) => r.data);
// export const getPriceRange = () =>
//   api.get("/analytics/price-range").then((r) => r.data);
// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) {
      err.message =
        "Cannot reach the API server. Make sure the backend is running.";
    }
    return Promise.reject(err);
  },
);

export const getSummary = () =>
  api.get("/analytics/summary").then((r) => r.data);
export const getProducts = () => api.get("/products").then((r) => r.data);
export const getPrices = (params = {}) =>
  api.get("/prices", { params }).then((r) => r.data);
export const getPriceById = (id) =>
  api.get(`/prices/${id}`).then((r) => r.data);
export const createPrice = (payload) =>
  api.post("/prices", payload).then((r) => r.data);
export const updatePrice = (id, payload) =>
  api.put(`/prices/${id}`, payload).then((r) => r.data);
export const deletePrice = (id) =>
  api.delete(`/prices/${id}`).then((r) => r.data);
export const getAnalyticsByProduct = () =>
  api.get("/analytics/by-product").then((r) => r.data);
export const getTrend = (product) =>
  api
    .get("/analytics/trend", { params: product ? { product } : {} })
    .then((r) => r.data);
export const getPriceRange = () =>
  api.get("/analytics/price-range").then((r) => r.data);

export default api;
