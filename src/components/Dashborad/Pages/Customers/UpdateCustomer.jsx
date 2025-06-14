import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { useData } from "../../DashboardComponents/DataContext";
import { IoArrowBackSharp } from "react-icons/io5";

const UpdateCustomer = () => {
  const { id } = useParams();
  const { customersData } = useData();
  const { fetchCustomers } = useData();

  const [form, setForm] = useState({
    FirstName: "",
    SecondName: "",
    LastName: "",
    DateOfBirth: "",
    Gender: false,
    PhoneNumber: "",
    DriverLicenseNumber: "",
  });

  // Find customer by ID
  useEffect(() => {
    const customer = customersData.find((c) => c.CustomerID === parseInt(id));
    if (customer) {
      setForm(customer);
    }
  }, [id, customersData]);

  // Handle changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit updated form (we will can call API here)
  const handleSubmit = async (e) => {
    try {
      const response = await fetch(
        `http://localhost/SmartKey/Backend/api/customers/${form.CustomerID}`,
        {
          method: "PUT",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      toast.success("Customer updated successfully!");
      console.log("Customer updated successfully:", result);
      fetchCustomers();
    } catch (error) {
      console.error("Failed to update customer:", error);
      toast.error("Failed to update customer.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Edit Customer ID: {id}
        </h2>
        <Link
          to="/Dashboard/Customers"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <IoArrowBackSharp className="mr-1" /> Back to customers
        </Link>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            name="FirstName"
            value={form.FirstName}
            onChange={handleChange}
            placeholder="First Name"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Second Name
          </label>
          <input
            name="SecondName"
            value={form.SecondName}
            onChange={handleChange}
            placeholder="Second Name"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            name="LastName"
            value={form.LastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            name="DateOfBirth"
            type="date"
            value={form.DateOfBirth.split(" ")[0]}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Gender (Female)
          </label>
          <input
            type="checkbox"
            name="Gender"
            checked={form.Gender}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            name="PhoneNumber"
            value={form.PhoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Driver License Number
          </label>
          <input
            name="DriverLicenseNumber"
            value={form.DriverLicenseNumber}
            onChange={handleChange}
            placeholder="License #"
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
      <div className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6"></div>
    </div>
  );
};

export default UpdateCustomer;
