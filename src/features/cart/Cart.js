import { useSelector, useDispatch } from "react-redux";
import { deleteItemFromCartAsync, selectCartLoaded, selectCartStatus, selectItems, updateCartAsync} from "./cartSlice";
import { Link, Navigate } from "react-router-dom";
import { discountedPrice } from "../../app/constants";
import { InfinitySpin } from "react-loader-spinner";
import Modal from "../common/Modal";
import { useState } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const status = useSelector(selectCartStatus);
  const cartLoaded = useSelector(selectCartLoaded);
  const [openModal, setOpenModal] = useState(null);
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const totalAmount = items.reduce( (amount, item) => discountedPrice(item.product) * item.quantity + amount, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {cartLoaded && !items.length && (<Navigate to={"/"} replace={true}></Navigate>)}

      <div className="mx-auto mt-10 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-2 sm:px-20">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            {status === "loading" && (
              <InfinitySpin width="200" color="#00BFFF" />
            )}
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.href}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">{discountedPrice(item.product)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="email"
                          className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <select
                          className="rounded-lg shadow-md"
                          value={item.quantity}
                          onChange={(e) => handleQuantity(e, item)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <Modal
                        title={`Delete ${item.product.title}`}
                        message={"Are You Sure Want To Delete This Cart Item"}
                        dangerOption={"Delete"}
                        cancelOption={"Cancel"}
                        dangerAction={(e) => handleRemove(e, item.id)}
                        cancelAction={(e) => setOpenModal(null)}
                        showModal={openModal === item.id}
                      ></Modal>

                      <div className="flex">
                        <button
                          onClick={(e) => setOpenModal(item.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-2 sm:px-20">
          <div className="flex my-2 justify-between text-base font-medium text-gray-900">
            <p>Total items in Cart</p>
            <p>{totalItems} items</p>
          </div>
          <div className="flex my-2 justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to={"/checkout"}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to={"/"}>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
