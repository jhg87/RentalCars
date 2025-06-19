import { useState } from "react";
import { useData } from "../../DashboardComponents/DataContext";
import { alert } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const AddNewCustomer = () => {
  // I need it to refrech the list after i create new customer
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

  // Handle changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // here we make post to the  API
  const postData = async () => {
    try {
      const response = await fetch(
        "https://shgawa.space/SmartKey/Backend/api/customers/",
        {
          method: "POST",
          //credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FirstName: form.FirstName,
            SecondName: form.SecondName,
            LastName: form.LastName,
            DateOfBirth: form.DateOfBirth,
            Gender: form.Gender,
            PhoneNumber: form.PhoneNumber,
            DriverLicenseNumber: form.DriverLicenseNumber,
          }),
        }
      );
      console.log(JSON.stringify(form));
      if (!response.ok) {
        toast.error("Network response was not ok");
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Post response:", result);
      toast.success("Customer added successfully!");
      // here we will refersh the customer list tmam
      fetchCustomers();
    } catch (error) {
      console.error("Post error:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Add New Customer
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
            required
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
            required
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
            required
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
            required
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
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Driver License Number ex: DMA-ABCD-1234
          </label>
          <input
            name="DriverLicenseNumber"
            value={form.DriverLicenseNumber}
            onChange={handleChange}
            placeholder="License #"
            required
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={postData}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddNewCustomer;
