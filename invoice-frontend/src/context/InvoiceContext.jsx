import { createContext, useState } from "react";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <InvoiceContext.Provider
      value={{ invoices, setInvoices, loading, setLoading, error, setError }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};
