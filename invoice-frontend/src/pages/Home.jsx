import React, { useState, useEffect, useContext } from "react";
import { fetchInvoices } from "../utils/api";
import { InvoiceContext } from "../context/InvoiceContext";
import InvoiceList from "../components/InvoiceList";
import Pagination from "../components/Pagination";
import SearchFilter from "../components/SearchFilter";
import { Link } from "react-router-dom";
import { TiPlusOutline } from "react-icons/ti";
const Home = () => {
  const { invoices, setInvoices, setLoading, setError } =
    useContext(InvoiceContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadInvoices = async (query = "") => {
    setLoading(true);
    try {
      const response = await fetchInvoices({
        page: currentPage,
        search: query,
      });
      setInvoices(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10)); // Adjust based on API response
    } catch (err) {
      setError("Failed to load invoices");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadInvoices();
  }, [currentPage]);

  const handleSearch = (query) => {
    setCurrentPage(1); // Reset to page 1 on search
    loadInvoices(query);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Invoice Management</h1>
      <SearchFilter onSearch={handleSearch} />
      <InvoiceList />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <CreateInvoice />
    </div>
  );
};

function CreateInvoice() {
  return (
    <div>
      <Link
        to="/create"
        className="fixed bottom-4 right-4 w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full hover:bg-blue-600 hover:shadow-lg hover:shadow-gray-500 hover:scale-110 transition-transform duration-300"
        title="Create Invoice"
      >
        <TiPlusOutline size={30} className="text-white bg-inherit" />
      </Link>
    </div>
  );
}

export default Home;
