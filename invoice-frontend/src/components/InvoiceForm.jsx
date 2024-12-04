import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { createInvoice, updateInvoice } from "../utils/api";

const InvoiceForm = ({ invoice, onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: invoice || {
      invoice_number: "",
      customer_name: "",
      date: "",
      details: [{ description: "", quantity: 1, unit_price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const handleFormSubmit = async (data) => {
    try {
      if (invoice) {
        await updateInvoice(invoice.id, data);
      } else {
        await createInvoice(data);
      }
      onSubmit();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Invoice Form</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Invoice Number</label>
        <input
          {...register("invoice_number", {
            required: "Invoice Number is required",
          })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Invoice Number"
        />
        {errors.invoice_number && (
          <p className="text-red-500 text-sm">
            {errors.invoice_number.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Customer Name</label>
        <input
          {...register("customer_name", {
            required: "Customer Name is required",
          })}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Customer Name"
        />
        {errors.customer_name && (
          <p className="text-red-500 text-sm">{errors.customer_name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          {...register("date", { required: "Date is required" })}
          type="date"
          defaultValue={new Date().toISOString().split("T")[0]}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold">Invoice Details</h3>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-4 mb-2">
            <input
              {...register(`details.${index}.description`, {
                required: "Description is required",
              })}
              placeholder="Description"
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              {...register(`details.${index}.quantity`, {
                required: "Quantity is required",
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Quantity"
              className="w-20 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <input
              {...register(`details.${index}.unit_price`, {
                required: "Unit Price is required",
                valueAsNumber: true,
              })}
              type="number"
              placeholder="Unit Price"
              className="w-28 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({ description: "", quantity: 1, unit_price: 0 })
          }
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          + Add Item
        </button>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Invoice
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
