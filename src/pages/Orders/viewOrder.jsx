import React, { useState, useEffect, useRef } from 'react';
import PageWrapper from '../../layouts/PageWrapper';
import { useDispatch } from "react-redux";
import { showToast } from "../../components/toastSlice";
import { useParams } from 'react-router-dom';
import { API } from "../../config/api";

const ViewOrder = () => {
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const [total_amount, setTotalAmount] = useState("");
    const [status, setStatus] = useState("");
    const [user, setUser] = useState("");
    const [order_date, setOrderDate] = useState("");
    const [order_location, setOrderLocation] = useState([]);
    const [order_items, setOrderItem] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`${API}/api/orders/${orderId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data.user_id?.name || "");
                    setStatus(data.status || "");
                    setTotalAmount(data.total_amount?.toString() || "");
                    setOrderDate(data.order_date || "");
                    setOrderItem(data.order_items || "");
                    setOrderLocation(data.order_location || "");
                } else {
                    dispatch(showToast({ message: "⚠️ Order not found", type: "error" }));
                }
            } catch (err) {
                dispatch(showToast({ message: "Error fetching order", type: "error" }));
            }
        };
        fetchOrder();
    }, [orderId, dispatch]); // empty dependency array = run once on mount

    return (
        <div>
            <form>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">

                        <label for="product-title" className="block text-sm/6 font-medium text-gray-900">Customer Name</label>
                        <div class="mt-2">
                            <input disabled id="user" type="text" name="user" value={user} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label for="last-name" className="block text-sm/6 font-medium text-gray-900">Status</label>
                        <div class="mt-2">
                            <input disabled id="status" value={status} type="text" name="status" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label for="product-title" className="block text-sm/6 font-medium text-gray-900">Total Amount</label>
                        <div className="flex items-center rounded-md bg-white mt-2 pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div>
                            <input
                                disabled
                                id="total_amount"
                                name="total_amount"
                                type="text"
                                value={total_amount}
                                placeholder="0.00"
                                className="block min-w-0 grow px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="last-name" className="block text-sm/6 font-medium text-gray-900">Order Date</label>
                        <div class="mt-2">
                            <input disabled id="order_date" value={Date(order_date)} type="text" name="order_date" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                </div>


                {/* Order Location */}

                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">

                        <label for="product-title" className="block text-sm/6 font-medium text-gray-900">Address</label>
                        <div class="mt-2">
                            <input disabled id="address" type="text" name="adress" value={order_location.address} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label for="last-name" className="block text-sm/6 font-medium text-gray-900">City</label>
                        <div class="mt-2">
                            <input disabled id="city" value={order_location.city} type="text" name="city" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">

                        <label for="product-title" className="block text-sm/6 font-medium text-gray-900">Post Code</label>
                        <div class="mt-2">
                            <input disabled id="address" type="text" name="adress" value={order_location.postcode} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label for="last-name" className="block text-sm/6 font-medium text-gray-900">Country</label>
                        <div class="mt-2">
                            <input disabled id="city" value={order_location.country} type="text" name="city" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                </div>
                {/* Products */}
                <div className='mt-5'>
                    <h1 className="block text-sm/6 font-medium text-gray-900">Product Items</h1>

                    <div class="mt-2 border border-gray-200 rounded-lg shadow-xs overflow-hidden dark:border-neutral-700 dark:shadow-gray-900">

                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 bg-white">
                            <thead className="bg-gray-50  dark:bg-neutral-700">
                                <tr>
                                    
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-black-500 uppercase dark:text-neutral-500">Product Image</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-black-500 uppercase dark:text-neutral-500">Product ID</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-black-500 uppercase dark:text-neutral-500">Name</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-black-500 uppercase dark:text-neutral-500">Quantity</th>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-black-500 uppercase dark:text-neutral-500">Price</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                {order_items.map(order_item => (

                                    <tr>
                                        {console.log(order_item)}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200" key={order_item._id}>
                                            <img src={`http://localhost:3000${order_item.product_id.product_images[0]}`}
                                                alt={order_item.product_id.name}
                                                className="w-10 h-10 object-contain"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200" key={order_item._id}>{order_item.product_id._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200" key={order_item._id}>{order_item.product_id.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200" key={order_item._id}>{order_item.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200" key={order_item._id}>{order_item.product_id.price}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default PageWrapper(ViewOrder);