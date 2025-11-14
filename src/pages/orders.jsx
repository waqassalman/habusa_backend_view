import React, { useState, useEffect } from 'react';
import PageWrapper from '../layouts/PageWrapper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToast } from '../components/toastSlice';
import { API } from "../config/api";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState("");
  // const [userId, setUserID] = useState("");
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);


  // 🟢 Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API}/api/orders?search=${search}&sort=${sort}&page=${page}&limit=10`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data.orders);
      setUser(data.user);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
      dispatch(showToast({ message: `❌ ${err.message}`, type: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [search, sort, page]);

  // 🟡 Update Order
  const handleUpdateOrder = (order_id) => {
    navigate(`/orders/update-order/${order_id}`);
  };

  // 🔵 View Order
  const handleViewOrder = (order_id) => {
    navigate(`/orders/view-order/${order_id}`);
  };

      // ✅ Pagination Handlers
      const handlePrevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
      };
    
      const handleNextPage = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
      };

  if (loading) {
    return (
      <div className="mx-auto w-full rounded-md border border-blue-300 p-4">
        <div className="animate-pulse">
              <div className="grid grid-cols-12 gap-6 mb-6">
                <div className="col-span-3 h-2 rounded bg-gray-200"></div>
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-3 h-2 rounded bg-gray-200"></div>
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
              <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3 h-2 rounded bg-gray-200"></div>
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                <div className="col-span-1 h-2 rounded bg-gray-200"></div>
              </div>
      </div>
      </div>
    );
  }

  // 🔴 Error state
  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  return (
    <div>
      <div className="flex mb-5">
        <div className="max-w-xs">
          <label htmlFor="hs-table-search" className="sr-only">
            Search
          </label>
          <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            </div>
            <input
              type="text"
              id="hs-table-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order by customer"
              className="block min-w-0 py-1.5 pr-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          </div>
        </div>
        {/* 🧮 Sort */}
        <div className="pl-5">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="block min-w-0 rounded-lg py-1.5 pr-3 pl-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-1 -outline-offset-1 outline-gray-300"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="total_amount_asc">Total: Low → High</option>
            <option value="total_amount_desc">Total: High → Low</option>
          </select>
        </div>
        </div>
      {orders.length > 0 ? (

        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead className='bg-gray-50 dark:bg-neutral-700'>
            <tr>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Order ID</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Customer Name</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Status</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Total Amount</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Date</th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
            {orders.map((order) => (
              
              <tr key={order._id}>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{order._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                  {order.user_id?.name || 'Unknown'}

                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-xs font-medium
                    ${order.status === 'delivered'
                        ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                        : order.status === 'cancelled'
                          ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                          : order.status === 'processing'
                            ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20'
                            : 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20'
                      }`}
                  >
                    {order.status || 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">${order.total_amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                  {new Date(order.order_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 flex
                ">
                  <a onClick={() => handleViewOrder(order._id)} className='flex items-center cursor-pointer text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    &nbsp;View
                  </a>
                  <a onClick={() => handleUpdateOrder(order._id)} className='flex items-center cursor-pointer mx-2 text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                      &nbsp;Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 mt-4">No orders found.</p>
      )}
      {/* ✅ Pagination Controls */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            page === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          ← Previous
        </button>

        <span className="text-sm text-gray-700">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            page === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-950 text-white hover:bg-blue-800"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PageWrapper(Orders);
