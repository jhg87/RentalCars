import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { useData } from "../../DashboardComponents/DataContext";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const VehicleList = () => {
  const { vehiclesData, fetchVehicles } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  // Updated filter function for vehicles
  const filteredVehicles = useMemo(() => {
    if (!searchTerm.trim()) return vehiclesData;

    const term = searchTerm.toLowerCase();

    return vehiclesData.filter((vehicle) => {
      return (
        (vehicle.PlateNumber != null &&
          String(vehicle.PlateNumber).toLowerCase().includes(term)) ||
        (vehicle.Make != null &&
          String(vehicle.Make).toLowerCase().includes(term))
      );
    });
  }, [vehiclesData, searchTerm]);

  // Updated delete function for vehicles
  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );
    if (!userConfirmed) return;

    try {
      const response = await fetch(
        `http://nanodevkey.mooo.com/SmartKey/Backend/api/vehicles/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentLength = response.headers.get("content-length");
      let result = null;

      if (contentLength && parseInt(contentLength) > 0) {
        result = await response.json();
      }

      toast.success("Vehicle deleted successfully");
      fetchVehicles(); // Refresh vehicle list

      return result;
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete vehicle");
      throw error;
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Vehicles List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all vehicles
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm" onClick={clearSearch}>
              View All
            </Button>
            <Link to={`/Dashboard/Vehicles/addnew`}>
              <Button className="flex items-center gap-3" size="sm">
                Add Vehicle
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search by Plate or Make"
              name="filter"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {filteredVehicles.map((vehicle) => (
          <div
            key={vehicle.VehicleID}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-4">
              {vehicle.CarImage ? (
                <img
                  src={vehicle.CarImage}
                  alt={`${vehicle.Make} ${vehicle.Model}`}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <Typography variant="small">No Image</Typography>
                </div>
              )}
              <div>
                <Typography variant="h6" className="font-semibold">
                  {vehicle.Make} {vehicle.Model}
                </Typography>
                <Typography variant="small" color="gray">
                  {vehicle.Year} • {vehicle.CategoryName}
                </Typography>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>Vehicle ID: {vehicle.VehicleID}</p>
              <p>Plate: {vehicle.PlateNumber}</p>
              <p>Mileage: {vehicle.Mileage}</p>
              <p>Fuel: {vehicle.FuelType}</p>
              <p>Price/Day: ${vehicle.PricePerDay}</p>
              <p>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    vehicle.IsAvailableForRent
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {vehicle.IsAvailableForRent ? "Available" : "Rented"}
                </span>
              </p>
            </div>
            <div className="flex justify-end gap-2 mt-2">
              <Link to={`/Dashboard/Vehicles/Update/${vehicle.VehicleID}`}>
                <Tooltip content="Edit Vehicle">
                  <IconButton variant="text">
                    <PencilIcon className="h-5 w-5 text-blue-700" />
                  </IconButton>
                </Tooltip>
              </Link>
              <Tooltip content="Delete">
                <IconButton
                  variant="text"
                  onClick={() => handleDelete(vehicle.VehicleID)}
                >
                  <RiDeleteBack2Fill className="h-5 w-5 text-red-700" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default VehicleList;
