import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectAllOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import {
  EyeIcon,
  PencilIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const orders = useSelector(selectAllOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const chooseColor = (state) => {
    switch (state) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handleOrderStatus = (e, order) => {
    const updateOrderStatus = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrderStatus));
    setEditableOrderId(-1);
  };
  const handleOrderPaymentStatus = (e, order) => {
    const updateOrderStatus = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(updateOrderStatus));
    setEditableOrderId(-1);
  };

  const handleShow = (order) => {};

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (option) => {
    const sort = { _sort: option.sortField, _order: option.sortOrder };
    setSort(sort);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination, sort }));
  }, [dispatch, page, sort]);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-0">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-1 px-1 text-left cursor-pointer">
                      {" "}
                      Order ID{" "}
                    </th>
                    <th className="py-1 px-1 text-left">Items</th>
                    <th
                      className="py-1 px-1 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sortField: "totalAmount",
                          sortOrder: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Total Amount
                      {sort._sort === "totalAmount" && sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4"></ArrowDownIcon>
                      )}
                    </th>
                    <th className="py-1 px-1 text-center">Shipping Address</th>
                    <th className="py-1 px-1 text-center">Order Status</th>
                    <th className="py-1 px-1 text-center">Payment Method</th>
                    <th className="py-1 px-1 text-center">Payment Status</th>
                    <th
                      className="py-1 px-1 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sortField: "createdAt",
                          sortOrder: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order Time
                      {sort._sort === "createdAt" && sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4"></ArrowDownIcon>
                      )}
                    </th>
                    <th className="py-1 px-1 text-left cursor-pointer" onClick={(e) => handleSort({ sortField: "updatedAt", sortOrder: sort?._order === "asc" ? "desc" : "asc",})}>
                      Last Updated
                      {sort._sort === "updatedAt" && sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4"></ArrowDownIcon>
                      )}
                    </th>
                    <th className="py-1 px-1 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders &&
                    orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-3 px-1 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            {/* <div className="mr-2"></div> */}
                            <span className="font-medium">{order.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-1 text-left">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <div className="mr-2">
                                <img className="w-6 h-6 rounded-full" src={item.product.thumbnail} alt={item.product.title}/>
                              </div>
                              <span>
                                {item.product.title} - #{item.quantity} - $
                                {item.product.discountPrice}
                              </span>
                            </div>
                          ))}
                        </td>

                        <td className="py-3 px-1 text-center">
                          <div className="flex items-center justify-center">
                            $ {order.totalAmount}
                          </div>
                        </td>
                        <td className="py-3 px-1 text-center">
                          <div className="">
                            <div>
                              <strong>{order.selectedAddress.name}</strong>
                            </div>
                            <div>{order.selectedAddress.street}</div>
                            <div>{order.selectedAddress.city}</div>
                            <div>{order.selectedAddress.pinCode}</div>
                            <div>{order.selectedAddress.phone}</div>
                          </div>
                        </td>
                        <td className="py-3 px-1 text-center">
                          {order.id === editableOrderId ? (
                            <select
                              value={order.status}
                              className="rounded-lg shadow-md"
                              onChange={(e) => handleOrderStatus(e, order)}
                            >
                              <option value="pending">Pending</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">delivered</option>
                              <option value="cancelled">Cancel</option>
                            </select>
                          ) : (
                            <span
                              className={`${chooseColor(
                                order.status
                              )} py-1 px-3 rounded-full text-xs`}
                            >
                              {order.status}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-1 text-center">
                          <div className="flex items-center justify-center">
                            {order.paymentMethod}
                          </div>
                        </td>
                        <td className="py-3 px-1 text-center">
                          {order.id === editableOrderId ? (
                            <select value={order.paymentStatus} className="rounded-lg shadow-md" onChange={(e) => handleOrderPaymentStatus(e, order)}>
                              <option value="pending">Pending</option>
                              <option value="received">Received</option>
                            </select>
                          ) : (
                            <span className={`${chooseColor(order.paymentStatus)} py-1 px-3 rounded-full text-xs`}>{order.paymentStatus}</span>
                          )}
                        </td>
                        <td className="py-3 px-1 text-center">
                          <div className="flex items-center justify-center">
                            {order.createdAt ? new Date(order.createdAt).toLocaleString() : null}
                          </div>
                        </td>
                        <td className="py-3 px-1 text-center">
                          <div className="flex items-center justify-center">
                            {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : null}
                          </div>
                        </td>
                        <td className="py-3 px-1 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-6 mr-4 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                              <EyeIcon className="w-6 h-6" onClick={(e) => handleShow(order)}></EyeIcon>
                            </div>
                            <div className="w-6 mr-1 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                              <PencilIcon className="w-6 h-6" onClick={(e) => handleEdit(order)}></PencilIcon>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalOrders}></Pagination>
      </div>
    </>
  );
}
