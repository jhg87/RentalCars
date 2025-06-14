import { useState, useMemo } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useData } from "../../DashboardComponents/DataContext";
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
import { Link } from "react-router-dom";

const TABLE_HEAD = [
  "BookingID",
  "UserID",
  "PaymentDetails",
  "PaidTotalDueAmount",
  "ActualTotalDueAmount",
  "TotalRemaining",
  "TotalReturnGetAmount",
  "TransactionDate",
  "UpdatedTransactionDate",
  "Download",
];

const TransactionList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { TransactionData, fetchTransactionData } = useData();

  const filteredTransactions = useMemo(() => {
    if (!searchTerm.trim()) return TransactionData || [];

    const term = searchTerm.toLowerCase();

    return (TransactionData || []).filter((transaction) => {
      return (
        (transaction.BookingID &&
          String(transaction.BookingID).toLowerCase().includes(term)) ||
        (transaction.UserID &&
          String(transaction.UserID).toLowerCase().includes(term))
      );
    });
  }, [TransactionData, searchTerm]);

  const handleDownload = (transaction) => {
    // Implement the logic to download the transaction as PDF
    console.log("Download transaction:", transaction);
    // This is a placeholder for the actual PDF download logic
    alert(`Downloading transaction with BookingID: ${transaction.BookingID}`);
  };

  const clearSearch = () => setSearchTerm("");

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Transactions list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all transactions
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm" onClick={clearSearch}>
              View all
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search by Booking ID or User ID"
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
            {filteredTransactions.map((row, index) => {
              const isLast = index === filteredTransactions.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={row.BookingID}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.BookingID || "N/A"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.UserID || "N/A"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.PaymentDetails || "N/A"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.PaidTotalDueAmount || "N/A"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.ActualTotalDueAmount || "N/A"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.TotalRemaining || "N/A"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.TotalReturnGetAmount || "N/A"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.TransactionDate || "N/A"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {row.UpdatedTransactionDate || "N/A"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Download">
                      <IconButton
                        variant="text"
                        onClick={() => handleDownload(row)}
                      >
                        <ArrowDownTrayIcon className="h-6 w-6 text-blue-700" />
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
          {filteredTransactions.length > 0
            ? ` (${filteredTransactions.length} total)`
            : ""}
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

export default TransactionList;
