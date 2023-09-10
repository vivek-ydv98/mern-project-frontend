import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

export default function UserOrdersPage() {
  return (
    <div>
      <Navbar>
      {/* <h2 className="mx-auto text-2xl">My Orders</h2> */}
        <UserOrders></UserOrders>
      </Navbar>
    </div>
  );
}
