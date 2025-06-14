import { useState, useMemo, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import MAvatar from "../../assets/Male_avatar.jpg";
import FeAvatar from "../../assets/Female_avatar.jpg";
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
  "Customer ID",
  "Full Name",
  "Phone Number",
  "Date of Birth",
  "Driver License Number",
  "Edit",
  "Delete",
];

const CustomersList = () => {
  const [loading, setLoading] = useState(true);
  const { customersData, fetchCustomers } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCustomers = useMemo(() => {
    if (!searchTerm.trim()) return customersData;

    const term = searchTerm.toLowerCase();

    return customersData.filter((customer) => {
      return (
        (customer.PhoneNumber != null &&
          String(customer.PhoneNumber).toLowerCase().includes(term)) ||
        (customer.DriverLicenseNumber != null &&
          String(customer.DriverLicenseNumber).toLowerCase().includes(term))
      );
    });
  }, [customersData, searchTerm]);

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (!userConfirmed) return;

    try {
      const response = await fetch(
        `http://localhost/SmartKey/Backend/api/customers/${id}`,
        {
          method: "DELETE",
          credentials: "same-origin",
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

      toast.success("Customer deleted successfully");
      fetchCustomers(); // Refresh customer list

      return result;
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Failed to delete customer");
      throw error;
    }
  };

  const clearSearch = () => setSearchTerm("");
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Cutomers list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm" onClick={clearSearch}>
              view all
            </Button>
            <Link to={`/Dashboard/Customers/addnew`}>
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                customer
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search by LicenseNumber or Phone"
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
            {filteredCustomers.map((row, index) => {
              const isLast = index === filteredCustomers.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              const fullName = `${row.FirstName} ${row.SecondName} ${row.LastName}`;
              const genderLabel = row.Gender ? "Female" : "Male";

              return (
                <tr key={row.CustomerID}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.CustomerID}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center">
                      <img
                        className="w-14 h-14 rounded-full"
                        src={row.Gender ? FeAvatar : MAvatar}
                        alt={`${fullName}'s avatar`}
                      />
                      <div className="ps-3">
                        <Typography className="text-base font-semibold">
                          {fullName}
                        </Typography>
                        <Typography className="font-normal text-gray-500">
                          {genderLabel}
                        </Typography>
                      </div>
                    </div>
                  </td>

                  {/* Phone Number */}
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.PhoneNumber}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.DateOfBirth.split(" ")[0]}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.DriverLicenseNumber}
                    </Typography>
                  </td>

                  {/* Edit Action */}
                  <td className={classes}>
                    <Link to={`/Dashboard/Customers/Update/${row.CustomerID}`}>
                      <Tooltip content="Edit Customer">
                        <IconButton variant="text">
                          <PencilIcon className="h-6 w-6 text-light-blue-800" />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </td>

                  {/* Delete Action */}
                  <td className={classes}>
                    <Tooltip content="Delete">
                      <IconButton
                        variant="text"
                        onClick={() => handleDelete(row.CustomerID)}
                      >
                        <RiDeleteBack2Fill className="h-6 w-6 text-red-700" />
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
          Page 1 of 10
          {Card.length > 0 ? ` (${Card.length} total)` : ""}
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

export default CustomersList;
