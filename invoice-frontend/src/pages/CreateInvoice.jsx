import React from "react";
import InvoiceForm from "../components/InvoiceForm";
import { useNavigate } from "react-router-dom";
const CreateInvoice = () => {
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    // Redirect to the homepage or show success message
    navigate("/");
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Create Invoice</h1>
      <InvoiceForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default CreateInvoice;
