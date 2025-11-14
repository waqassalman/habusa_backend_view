import React, { useState, useEffect } from 'react';
import PageWrapper from '../layouts/PageWrapper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showToast } from '../components/toastSlice';

const Customers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // 🟢 Fetch orders from backend
  const fetchCustomers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users?search=${search}&sort=${sort}&page=${page}&limit=10`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to customers orders');
      const data = await response.json();
      setUser(data.users);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
      dispatch(showToast({ message: `❌ ${err.message}`, type: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load all customer initially
  useEffect(() => {
    fetchCustomers();
  }, [search, sort, page]);

  // ✅ Pagination Handlers
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };



  // 🟣 Loading skeleton
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
    <>
      {/* ✅ Search & Add Button */}
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
              placeholder="Search Products"
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
            <option value="name_asc">Name: A → Z</option>
            <option value="name_desc">Name: Z → A</option>
          </select>
        </div>
      </div>
      {user.length > 0 ? (

        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <thead className='bg-gray-50 dark:bg-neutral-700'>
            <tr>
              <th className="px-6 py-4 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Customer ID</th>
              <th className="px-6 py-4 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Customer Name</th>
              <th className="px-6 py-4 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Email</th>
              <th className="px-6 py-4 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Address</th>
              <th className="px-6 py-4 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400">Phone</th>

            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500 mt-4">No Customer found.</p>
      )}
       <hr className="mt-10 text-gray-200"/>
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
    </>
  );
};

export default PageWrapper(Customers);
