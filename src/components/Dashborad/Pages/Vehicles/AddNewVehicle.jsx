import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const fuelTypes = [
  { ID: 1, FuelType: "Gasoline" },
  { ID: 2, FuelType: "Diesel" },
  { ID: 3, FuelType: "Electric" },
  { ID: 4, FuelType: "Hybrid" },
  { ID: 5, FuelType: "Biodiesel" },
  { ID: 6, FuelType: "Ethanol" },
  { ID: 7, FuelType: "Hydrogen" },
  { ID: 8, FuelType: "LPG" },
  { ID: 9, FuelType: "GNC" },
];

const categories = [
  { CategoryID: 1, CategoryName: "Economy" },
  { CategoryID: 2, CategoryName: "Compact" },
  { CategoryID: 3, CategoryName: "Intermediate" },
  { CategoryID: 4, CategoryName: "Standard" },
  { CategoryID: 5, CategoryName: "Full-Size" },
  { CategoryID: 6, CategoryName: "Premium" },
  { CategoryID: 7, CategoryName: "Luxury" },
  { CategoryID: 8, CategoryName: "SUV" },
  { CategoryID: 9, CategoryName: "Minivan" },
  { CategoryID: 10, CategoryName: "Convertible" },
];

const AddNewVehicle = () => {
  const [form, setForm] = useState({
    Make: "",
    Model: "",
    Year: "",
    Mileage: 0,
    FuelTypeID: "",
    PlateNumber: "",
    CarCategoryID: "",
    RentalPricePerDay: "",
    IsAvailableForRent: true,
    CarImage: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const finalValue =
      name === "Mileage"
        ? Number(value)
        : type === "checkbox"
        ? checked
        : value;

    setForm((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/SmartKey/Backend/api/vehicles/",
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json", // ✅ Correct key: headers
          },
          body: JSON.stringify({
            Make: form.Make,
            Model: form.Model,
            Year: Number(form.Year),
            Mileage: Number(form.Mileage),
            FuelTypeID: Number(form.FuelTypeID),
            PlateNumber: form.PlateNumber,
            CarCategoryID: Number(form.CarCategoryID),
            RentalPricePerDay: parseFloat(form.RentalPricePerDay),
            IsAvailableForRent: true,
            CarImage: null, // matches what your backend expects
          }),
        }
      );

      const text = await response.text(); // Use text() in case it's not valid JSON

      try {
        const result = JSON.parse(text); // Try parsing JSON
        console.log("Server response:", result);

        if (!response.ok) {
          toast.error(result?.message || "Failed to add vehicle");
          return;
        }

        toast.success("Vehicle added successfully!");
        fetchVehicles();
      } catch (parseError) {
        console.error("Invalid JSON returned:", text);
        toast.error("Server returned invalid response");
      }
    } catch (error) {
      console.error("Post error:", error);
      toast.error("Unexpected error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Add New Vehicle
        </h2>
        <Link
          to="/Dashboard/Vehicles"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <IoArrowBackSharp className="mr-1" /> Back to Vehicles
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Make
            </label>
            <input
              name="Make"
              value={form.Make}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              name="Model"
              value={form.Model}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              name="Year"
              type="number"
              value={form.Year}
              onChange={handleChange}
              min="1900"
              max="2099"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mileage (km)
            </label>
            <input
              name="Mileage"
              type="text"
              value={form.Mileage}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price Per Day $
            </label>
            <input
              name="RentalPricePerDay"
              type="text"
              value={form.RentalPricePerDay}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fuel Type
            </label>
            <select
              name="FuelTypeID"
              value={form.FuelTypeID}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Fuel Type</option>
              {fuelTypes.map((type) => (
                <option key={type.ID} value={type.ID}>
                  {type.FuelType}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="CarCategoryID"
              value={form.CarCategoryID}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.CategoryID} value={category.CategoryID}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Plate Number
          </label>
          <input
            name="PlateNumber"
            value={form.PlateNumber}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            name="CarImage"
            value={form.CarImage}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {form.CarImage && (
          <div className="mt-4">
            <img
              src={form.CarImage}
              alt="Vehicle preview"
              className="h-40 object-contain rounded-md border"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            name="IsAvailableForRent"
            checked={form.IsAvailableForRent}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-sm font-medium text-gray-700">
            Available for Rent
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition mt-6"
        >
          Add New Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddNewVehicle;
