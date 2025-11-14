import React, { useState, useEffect } from "react";
import PageWrapper from "../layouts/PageWrapper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../components/toastSlice";
import { API } from "../config/api";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  // ✅ Fetch products
  
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${API}/api/products?search=${search}&sort=${sort}&page=${page}&limit=10`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
      dispatch(showToast({ message: `❌ ${err.message}`, type: "error" }));
    }
  };

  // ✅ Load all products initially
  useEffect(() => {
    fetchProducts();
  }, [search, sort, page]);

  // ✅ Add Product
  const handleAddProduct = () => navigate("/products/add-product");

  // ✅ Update Product
  const handleUpdateProduct = (productId) =>
    navigate(`/products/update-product/${productId}`);

  // ✅ Delete Product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}/api/products/${productId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to delete product");

      await response.json();
      dispatch(
        showToast({
          message: "🗑️ Product deleted successfully",
          type: "success",
        })
      );
      fetchProducts(); // refresh list
    } catch (err) {
      setError(err.message);
      dispatch(showToast({ message: `❌ ${err.message}`, type: "error" }));
    }
    
  };
    // ✅ Pagination Handlers
    const handlePrevPage = () => {
      if (page > 1) setPage((prev) => prev - 1);
    };
  
    const handleNextPage = () => {
      if (page < totalPages) setPage((prev) => prev + 1);
    };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

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
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="name_asc">Name: A → Z</option>
            <option value="name_desc">Name: Z → A</option>
          </select>
        </div>
        <button
          className="flex ml-auto p-2 bg-sky-500 hover:bg-sky-700 text-white rounded-lg items-center gap-1"
          onClick={handleAddProduct}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add Product
        </button>
      </div>

      {/* ✅ Products Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Product Image
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Product Title
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Price
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-3">
                  {product.product_images?.length > 0 && (
                    <img
                      src={`${API}${product.product_images[0]}`}
                      alt={product.name}
                      className="w-10 h-10 object-contain"
                    />
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  ${product.price}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {product.category_id?.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 flex">
                  <a onClick={() => handleUpdateProduct(product._id)} className='flex items-center cursor-pointer text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    &nbsp;Edit
                  </a>
                  <a onClick={() => handleDeleteProduct(product._id)} className='flex items-center cursor-pointer mx-2 text-red-600 hover:text-red-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                    &nbsp;Delete
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="px-4 py-2 text-center text-gray-500"
                colSpan={5}
              >
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
    </div>
  );
};

export default PageWrapper(Products);
