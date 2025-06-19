import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { useData } from "../../DashboardComponents/DataContext";
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
  { ID: 10, FuelType: "GNC" },
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

const UpdateVehicle = () => {
  const { id } = useParams();
  const { vehiclesData, fetchVehicles } = useData();

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

  useEffect(() => {
    const vehicle = vehiclesData.find((v) => v.VehicleID === parseInt(id));
    if (vehicle) {
      const fuelMatch = fuelTypes.find((f) => f.FuelType === vehicle.FuelType);
      const categoryMatch = categories.find(
        (c) => c.CategoryName === vehicle.CategoryName
      );

      setForm({
        Make: vehicle.Make || "",
        Model: vehicle.Model || "",
        Year: vehicle.Year ? String(vehicle.Year) : "",
        Mileage: Number(vehicle.Mileage) || 0,
        FuelTypeID: fuelMatch ? String(fuelMatch.ID) : "",
        PlateNumber: vehicle.PlateNumber || "",
        CarCategoryID: categoryMatch ? String(categoryMatch.CategoryID) : "",
        RentalPricePerDay: vehicle.PricePerDay
          ? String(vehicle.PricePerDay)
          : "",
        IsAvailableForRent: vehicle.IsAvailableForRent || true,
        CarImage: vehicle.CarImage || "",
      });
    }
  }, [id, vehiclesData]);

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
      // Prepare payload with correct field names and types
      const payload = {
        Make: form.Make,
        Model: form.Model,
        Year: parseInt(form.Year),
        Mileage: form.Mileage,
        FuelTypeID: parseInt(form.FuelTypeID),
        PlateNumber: form.PlateNumber,
        CarCategoryID: parseInt(form.CarCategoryID),
        RentalPricePerDay: parseFloat(form.RentalPricePerDay),
        IsAvailableForRent: form.IsAvailableForRent,
        CarImage: form.CarImage,
      };

      const response = await fetch(
        `https://shgawa.space/SmartKey/Backend/api/vehicles/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      toast.success("Vehicle updated successfully!");
      fetchVehicles();
    } catch (error) {
      console.error("Failed to update vehicle:", error);
      toast.error(`Failed to update vehicle: ${error.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Edit Vehicle ID: {id}
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
              value={form.Make || ""}
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
              value={form.Model || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year
            </label>
            <input
              name="Year"
              type="number"
              value={form.Year || ""}
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
              type="number"
              value={form.Mileage}
              onChange={handleChange}
              min="0"
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price Per Day ($)
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
              value={form.FuelTypeID || ""}
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
              value={form.CarCategoryID || ""}
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
            value={form.PlateNumber || ""}
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
            value={form.CarImage || ""}
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition mt-6"
        >
          Update Vehicle
        </button>
      </form>
    </div>
  );
};

export default UpdateVehicle;
