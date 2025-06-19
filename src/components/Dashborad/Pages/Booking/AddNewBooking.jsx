import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useData } from "../../DashboardComponents/DataContext";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Typography,
  Button,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const AddNewBooking = () => {
  const navigate = useNavigate();
  const { customersData, vehiclesData, fetchBookings } = useData();
  const [formData, setFormData] = useState({
    CustomerID: "",
    VehicleID: "",
    RentalStartDate: "",
    RentalEndDate: "",
    PickupLocation: "",
    DropoffLocation: "",
    InitialRentalDays: "1",
    RentalPricePerDay: "",
    InitialTotalDueAmount: "0.00",
    InitialCheckNotes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate days difference
  const calculateDays = () => {
    if (formData.RentalStartDate && formData.RentalEndDate) {
      const start = new Date(formData.RentalStartDate);
      const end = new Date(formData.RentalEndDate);
   
      // Ensure end date is after start date
      if (end < start) {
        setErrors((prev) => ({
          ...prev,
          RentalEndDate: "End date must be after start date",
        }));
   

        return;
      }

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (!isNaN(diffDays)) {
        setFormData((prev) => ({
          ...prev,
          InitialRentalDays: diffDays.toString(),
          InitialTotalDueAmount: (
            diffDays * parseFloat(prev.RentalPricePerDay || 0)
          ).toFixed(2),
        }));

        // Clear error if fixed
        if (errors.RentalEndDate) {
          setErrors((prev) => ({ ...prev, RentalEndDate: "" }));
        }
      }
    }
  };

  // Calculate total amount when days or price changes
  useEffect(() => {
    if (formData.InitialRentalDays && formData.RentalPricePerDay) {
      const days = parseInt(formData.InitialRentalDays);
      const price = parseFloat(formData.RentalPricePerDay);

      if (!isNaN(days) && !isNaN(price)) {
        setFormData((prev) => ({
          ...prev,
          InitialTotalDueAmount: (days * price).toFixed(2),
        }));
      }
    }
  }, [formData.InitialRentalDays, formData.RentalPricePerDay]);

  // Update price when vehicle is selected
  useEffect(() => {
    if (formData.VehicleID) {
      const selectedVehicle = vehiclesData.find(
        (v) => v.VehicleID == formData.VehicleID
      );
      if (selectedVehicle) {
        setFormData((prev) => ({
          ...prev,
          RentalPricePerDay: selectedVehicle.RentalPricePerDay,
        }));
      }
    }
  }, [formData.VehicleID, vehiclesData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Recalculate days if dates change
    if (name === "RentalStartDate" || name === "RentalEndDate") {
      setTimeout(calculateDays, 100);
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.CustomerID) newErrors.CustomerID = "Customer is required";
    if (!formData.VehicleID) newErrors.VehicleID = "Vehicle is required";
    if (!formData.RentalStartDate)
      newErrors.RentalStartDate = "Start date is required";
    if (!formData.RentalEndDate)
      newErrors.RentalEndDate = "End date is required";
    if (!formData.PickupLocation)
      newErrors.PickupLocation = "Pickup location is required";
    if (parseInt(formData.InitialRentalDays) <= 0)
      newErrors.InitialRentalDays = "Invalid rental days";
    if (parseFloat(formData.RentalPricePerDay) <= 0)
      newErrors.RentalPricePerDay = "Invalid price";
    if (formData.RentalEndDate && formData.RentalStartDate) {
      const start = new Date(formData.RentalStartDate);
      const end = new Date(formData.RentalEndDate);
      if (end < start) {
        newErrors.RentalEndDate = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate dates in UTC format for backend
      const formatForBackend = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 19).replace("T", " ");
      };

      const payload = {
        ...formData,
        RentalStartDate: formatForBackend(formData.RentalStartDate),
        RentalEndDate: formatForBackend(formData.RentalEndDate),
        InitialRentalDays: parseInt(formData.InitialRentalDays),
        RentalPricePerDay: parseFloat(formData.RentalPricePerDay),
        InitialTotalDueAmount: parseFloat(formData.InitialTotalDueAmount),
        IsAvailableForRent: true, // Assuming this is needed for your system
      };

      const response = await fetch(
        `https://shgawa.space/SmartKey/Backend/api/rentalbooking/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      toast.success("Booking created successfully!");
      fetchBookings();
      navigate("/Dashboard/Bookings");
    } catch (error) {
      console.error("Create error:", error);
      toast.error(error.message || "Failed to create booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <Card className="w-full mt-2">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-6 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h4" color="blue-gray">
                Create New Booking
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Enter details for the new booking
              </Typography>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-[70vw]">
              {/* Column 1 */}
              <div className="space-y-6">
                {/* Customer Selection */}
                <div>
                  <Select
                    label="Customer *"
                    name="CustomerID"
                    value={formData.CustomerID.toString()}
                    onChange={(value) =>
                      handleSelectChange("CustomerID", value)
                    }
                    error={!!errors.CustomerID}
                  >
                    {customersData.map((customer) => (
                      <Option
                        key={customer.CustomerID}
                        value={customer.CustomerID.toString()}
                      >
                        {`${customer.FirstName} ${customer.LastName} (ID: ${customer.CustomerID})`}
                      </Option>
                    ))}
                  </Select>
                  {errors.CustomerID && (
                    <Typography color="red" className="mt-1 text-xs">
                      {errors.CustomerID}
                    </Typography>
                  )}
                </div>

                {/* Vehicle Selection */}
                <div>
                  <Select
                    label="Vehicle *"
                    name="VehicleID"
                    value={formData.VehicleID.toString()}
                    onChange={(value) => handleSelectChange("VehicleID", value)}
                    error={!!errors.VehicleID}
                  >
                    {vehiclesData
                      .filter((v) => v.IsAvailableForRent)
                      .map((vehicle) => (
                        <Option
                          key={vehicle.VehicleID}
                          value={vehicle.VehicleID.toString()}
                        >
                          {`${vehicle.Make} ${vehicle.Model} ${vehicle.Year} (ID: ${vehicle.VehicleID})`}
                        </Option>
                      ))}
                  </Select>
                  {errors.VehicleID && (
                    <Typography color="red" className="mt-1 text-xs">
                      {errors.VehicleID}
                    </Typography>
                  )}
                </div>

                {/* Rental Days */}
                <div>
                  <Input
                    label="Rental Days"
                    name="InitialRentalDays"
                    value={formData.InitialRentalDays}
                    onChange={handleChange}
                    error={!!errors.InitialRentalDays}
                    type="number"
                    min="1"
                  />
                  {errors.InitialRentalDays && (
                    <Typography color="red" className="mt-1 text-xs">
                      {errors.InitialRentalDays}
                    </Typography>
                  )}
                </div>

                {/* Price Per Day */}
                <div>
                  <Input
                    label="Price Per Day ($)"
                    name="RentalPricePerDay"
                    value={formData.RentalPricePerDay}
                    onChange={handleChange}
                    error={!!errors.RentalPricePerDay}
                    type="number"
                    step="0.01"
                    min="0"
                  />
                  {errors.RentalPricePerDay && (
                    <Typography color="red" className="mt-1 text-xs">
                      {errors.RentalPricePerDay}
                    </Typography>
                  )}
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                {/* Start Date */}
                <div className="relative">
                  <Input
                    label="Rental Start Date *"
                    type="datetime-local"
                    name="RentalStartDate"
                    value={formData.RentalStartDate}
                    onChange={handleChange}
                    error={!!errors.RentalStartDate}
                    icon={<FaCalendarAlt className="text-blue-gray-300" />}
                  />
                  {errors.RentalStartDate && (
                    <Typography color="red" className="mt-1 text-xs">
                      {errors.RentalStartDate}
                    </Typography>
                  )}
                </div>

                {/* End Date */}
                <div className="relative">
                  <Input
                    label="Rental End Date *"
                    type="datetime-local"
                    name="RentalEndDate"
                    value={formData.RentalEndDate}
                    onChange={handleChange}
                    onBlur={calculateDays}
                    error={!!errors.RentalEndDate}
                    icon={<FaCalendarAlt className="text-blue-gray-300" />}
                  />
                  {errors.RentalEndDate && (
                    <Typography color="red" className="mt-1 text-xs">
                      {errors.RentalEndDate}
                    </Typography>
                  )}
                </div>

                {/* Pickup Location */}
                <div className="relative">
                  <Input
                    label="Pickup Location *"
                    name="PickupLocation"
                    value={formData.PickupLocation}
                    onChange={handleChange}
                    error={!!errors.PickupLocation}
                    icon={<FaMapMarkerAlt className="text-blue-gray-300" />}
                  />
                  {errors.PickupLocation && (
                    <Typography color="red" className="mt-1 text-xs">
                      {errors.PickupLocation}
                    </Typography>
                  )}
                </div>

                {/* Dropoff Location */}
                <div className="relative">
                  <Input
                    label="Dropoff Location"
                    name="DropoffLocation"
                    value={formData.DropoffLocation}
                    onChange={handleChange}
                    icon={<FaMapMarkerAlt className="text-blue-gray-300" />}
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-6">
                {/* Total Amount */}
                <div>
                  <Input
                    label="Total Amount ($)"
                    name="InitialTotalDueAmount"
                    value={formData.InitialTotalDueAmount}
                    readOnly
                    className="font-bold text-blue-700 text-lg"
                  />
                </div>

                {/* Check Notes */}
                <div>
                  <Textarea
                    label="Check Notes"
                    name="InitialCheckNotes"
                    value={formData.InitialCheckNotes}
                    onChange={handleChange}
                    className="h-40"
                    placeholder="Enter any special instructions or notes..."
                  />
                </div>
              </div>
            </div>
          </CardBody>

          <CardFooter className="flex justify-between pt-4">
            <Button
              variant="outlined"
              color="red"
              onClick={() => navigate("/Dashboard/Booking")}
              className="w-32"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="blue"
              disabled={isSubmitting}
              className="w-48"
            >
              {isSubmitting ? "Creating..." : "Create Booking"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddNewBooking;
