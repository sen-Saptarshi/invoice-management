import React, { useEffect, useState } from "react";
import { fetchInvoice } from "../utils/api";
import InvoiceForm from "../components/InvoiceForm";
import { useParams } from "react-router-dom";

const EditInvoice = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const loadInvoice = async () => {
      try {
        const response = await fetchInvoice(id);
        setInvoice(response.data);
      } catch (err) {
        console.error("Failed to load invoice:", err);
      }
    };
    loadInvoice();
  }, [id]);

  const handleFormSubmit = () => {
    // Redirect to the homepage or show success message
    window.location.href = "/";
  };

  if (!invoice) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Edit Invoice</h1>
      <InvoiceForm invoice={invoice} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default EditInvoice;
