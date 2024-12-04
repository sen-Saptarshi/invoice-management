import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:9000/api/", // Replace with your backend URL
});

export const fetchInvoices = (params) => API.get("invoices/", { params });
export const fetchInvoice = (id) => API.get(`invoices/${id}/`);
export const createInvoice = (data) => API.post("invoices/", data);
export const updateInvoice = (id, data) => API.put(`invoices/${id}/`, data);
export const deleteInvoice = (id) => API.delete(`invoices/${id}/`);
