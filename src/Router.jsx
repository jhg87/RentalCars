import { BrowserRouter as Bro, Route, Routes } from "react-router-dom";

import Login from "./components/login/Login";
import App from "./App";
import Register from "./components/login/Register";
import ListsCars from "./components/ListsCars/ListsCars";
import ChatBotPage from "./components/ChatBot/ChatBotPage";
import ChatPage from "./components/ChatBot/ChatPage";
import CarDetails from "./components/ListsCars/CarDetails";
import APITest from "./components/Tester/APITest";
import MainDashboard from "./components/Dashborad/Pages/MainDashboard";
import CustomersList from "./components/Dashborad/Pages/Customers/CustomersList";
import AddNewCustomer from "./components/Dashborad/Pages/Customers/AddNewCustomer";
import CustomerDetail from "./components/Dashborad/Pages/Customers/CustomerDetail";
import UpdateCustomer from "./components/Dashborad/Pages/Customers/UpdateCustomer";
import VehicleDetail from "./components/Dashborad/Pages/Vehicles/VehicleDetail";
import VehicleList from "./components/Dashborad/Pages/Vehicles/VehicleList";
import AddNewVehicle from "./components/Dashborad/Pages/Vehicles/AddNewVehicle";
import UpdateVehicle from "./components/Dashborad/Pages/Vehicles/UpdateVehicle";
import BookingCarList from "./components/Dashborad/Pages/Booking/BookingCarList";
import AddNewBooking from "./components/Dashborad/Pages/Booking/AddNewBooking";
import UpdateBooking from "./components/Dashborad/Pages/Booking/UpdateBooking";
import TransactionList from "./components/Dashborad/Pages/RentalTransaction/TransactionList";
import Payment from "./components/Dashborad/Pages/RentalTransaction/Payment";
import UsersList from "./components/Dashborad/Pages/Users/UsersList";
import AddnewUser from "./components/Dashborad/Pages/Users/AddNewUser";
import UpdateUser from "./components/Dashborad/Pages/Users/UpdateUser";

const Router = () => {
  return (
    <Bro>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ListsCars" element={<ListsCars />} />
        <Route path="/cars/:slug" element={<CarDetails />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/APITest" element={<APITest />} />
        <Route path="/Dashboard" element={<MainDashboard />}>
          {/* Customers Routs */}
          <Route path="/Dashboard/Customers" element={<CustomersList />} />
          <Route
            path="/Dashboard/Customers/AddNew"
            element={<AddNewCustomer />}
          />
          <Route
            path="/Dashboard/Customers/Detail"
            element={<CustomerDetail />}
          />
          <Route
            path="/Dashboard/Customers/Update/:id"
            element={<UpdateCustomer />}
          />

          {/* Vehicles Routs*/}
          <Route path="/Dashboard/Vehicles" element={<VehicleList />} />
          <Route
            path="/Dashboard/Vehicles/addnew"
            element={<AddNewVehicle />}
          />
          <Route
            path="/Dashboard/vehicles/Detail"
            element={<VehicleDetail />}
          />
          <Route
            path="/Dashboard/vehicles/Update/:id"
            element={<UpdateVehicle />}
          />

          {/* Booking Car */}
          <Route path="/Dashboard/Booking" element={<BookingCarList />} />
          <Route path="/Dashboard/Booking/addnew" element={<AddNewBooking />} />
          <Route
            path="/Dashboard/Booking/Update/:id"
            element={<UpdateBooking />}
          />

          {/* Transactions */}
          <Route path="/Dashboard/Transactions" element={<TransactionList />} />
          <Route path="/Dashboard/Payment" element={<Payment />} />

          {/* Users */}
          <Route path="/Dashboard/Users" element={<UsersList />} />
          <Route path="/Dashboard/Users/addnew" element={<AddnewUser />} />
          <Route path="/Dashboard/Users/Update/:id" element={<UpdateUser />} />
        </Route>
      </Routes>
    </Bro>
  );
};

export default Router;
