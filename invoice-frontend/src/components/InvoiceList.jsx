import React, { useEffect, useContext, useState } from "react";
import { fetchInvoices, deleteInvoice, fetchInvoice } from "../utils/api";
import { InvoiceContext } from "../context/InvoiceContext";
import { AiTwotoneDelete } from "react-icons/ai";
import DetailsModal from "./DetailsModal";

const InvoiceList = () => {
  const { invoices, setInvoices, loading, setLoading, error, setError } =
    useContext(InvoiceContext);

  const [currentInvoice, setCurrentInvoice] = useState(null); // Modal visibility tied to this
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadInvoices = async () => {
      setLoading(true);
      try {
        const response = await fetchInvoices();
        setInvoices(response.data.results);
      } catch (err) {
        setError("Failed to load invoices");
      }
      setLoading(false);
    };
    loadInvoices();
  }, [setInvoices, setLoading, setError]);

  const handleDelete = async (id) => {
    try {
      await deleteInvoice(id);
      setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
    } catch (err) {
      setError("Failed to delete invoice");
    }
  };

  const handleFetchInvoice = async (id) => {
    try {
      const response = await fetchInvoice(id);
      setCurrentInvoice(response.data); // Set the fetched invoice
      setModalVisible(true); // Show the modal
    } catch (err) {
      setError("Failed to fetch invoice");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentInvoice(null); // Reset invoice data
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <ul>
        {invoices.map((invoice) => (
          <li
            className="flex justify-between items-center gap-4 mt-2"
            key={invoice.id}
          >
            <div
              className="cursor-pointer text-xl"
              onClick={() => handleFetchInvoice(invoice.id)}
            >
              {invoice.invoice_number} - {invoice.customer_name}
            </div>
            <DeleteButton onClick={() => handleDelete(invoice.id)} />
          </li>
        ))}
      </ul>

      {modalVisible && (
        <DetailsModal invoice={currentInvoice} onClose={closeModal} />
      )}
    </div>
  );
};

function DeleteButton({ onClick }) {
  return (
    <span className="bg-red-400 rounded p-2 cursor-pointer" onClick={onClick}>
      <AiTwotoneDelete />
    </span>
  );
}

export default InvoiceList;
