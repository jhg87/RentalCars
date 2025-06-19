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

const TABLE_HEAD = [
  "Booking ID",
  "Customer",
  "Vehicle",
  "Start Date",
  "End Date",
  "Pickup Location",
  "Total Days",
  "Total Amount",
  "Actions",
];

const BookingCarList = () => {
  const { bookingsData, fetchBookings } = useData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = useMemo(() => {
    if (!searchTerm.trim()) return bookingsData;

    const term = searchTerm.toLowerCase();

    return bookingsData.filter((booking) => {
      return (
        (booking.PickupLocation &&
          booking.PickupLocation.toLowerCase().includes(term)) ||
        (booking.BookingID &&
          String(booking.BookingID).toLowerCase().includes(term)) ||
        (booking.CustomerID &&
          String(booking.CustomerID).toLowerCase().includes(term))
      );
    });
  }, [bookingsData, searchTerm]);

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!userConfirmed) return;

    try {
      const response = await fetch(
        `https://shgawa.space/SmartKey/Backend/api/rentalbooking/${id}`,
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

      toast.success("Booking deleted successfully");
      fetchBookings(); // Refresh booking list
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete booking");
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Car Bookings
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Manage all vehicle rental bookings
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm" onClick={clearSearch}>
              View all
            </Button>
            <Link to={`/Dashboard/Booking/addnew`}>
              <Button className="flex items-center gap-3" size="sm">
                Add New Booking
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search by ID, Customer or Location"
              name="filter"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => {
              const classes = "p-4 border-b border-blue-gray-50 text-start";

              return (
                <tr key={booking.BookingID}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {booking.BookingID}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      Customer #{booking.CustomerID}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      Vehicle #{booking.VehicleID}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatDate(booking.RentalStartDate)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatDate(booking.RentalEndDate)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {booking.PickupLocation}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {booking.InitialRentalDays} days
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      ${booking.InitialTotalDueAmount}
                    </Typography>
                  </td>
                  <td className={`${classes} flex gap-2`}>
                    <Link to={`/Dashboard/Booking/Update/${booking.BookingID}`}>
                      <Tooltip content="Edit Booking">
                        <IconButton variant="text">
                          <PencilIcon className="h-5 w-5 text-light-blue-800" />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Tooltip content="Delete Booking">
                      <IconButton
                        variant="text"
                        onClick={() => handleDelete(booking.BookingID)}
                      >
                        <RiDeleteBack2Fill className="h-5 w-5 text-red-700" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of {Math.ceil(filteredBookings.length / 10)}
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

export default BookingCarList;
