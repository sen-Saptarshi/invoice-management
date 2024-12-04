const DetailsModal = ({ invoice, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-1/2">
        <div className="flex items-center justify-between border-b border-gray-400">
          <h1 className="text-2xl font-bold">
            Invoice {invoice.invoice_number}
          </h1>
          <button className="text-red-500 font-bold text-xl" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="mt-4">
          <p>Customer Name: {invoice.customer_name}</p>
          <p>Date: {invoice.date}</p>
          <p>Details:</p>
          {invoice.details.length > 0 ? (
            <ul className="list-disc pl-8">
              {invoice.details.map((detail) => (
                <li key={detail.id}>
                  {detail.description} x {detail.quantity} = {detail.line_total}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No data found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;

