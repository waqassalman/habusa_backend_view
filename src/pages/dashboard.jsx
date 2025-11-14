// src/components/Dashboard.jsx
import { React, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PageWrapper from '../layouts/PageWrapper';
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import CategoryRadarChart from "../components/CategoryRadarChart";
import { API } from "../config/api";

const Dashboard = () => {
  // Get user from Redux state
  const [productCount, setTotalProducts] = useState(0);
  const [orderCount, setTotalOrders] = useState(0);
  const [userCount, setTotalUsers] = useState(0);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    console.log(API)
    try {
      const response = await fetch(
        `${API}/api/products`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setTotalProducts(data.total);
      setProducts(data.products)
      setCategories(products.map((product) => product.category_id))
      console.log(categories)
    } catch (err) {
      setError(err.message);
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${API}/api/orders`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setOrders(data.orders)
      setTotalOrders(data.total);
    } catch (err) {
      setError(err.message);
    }
  };
  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        `${API}/api/users`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      const customers = data.users.filter((user) => (user.role == "customer"));
      setTotalUsers(customers.length)
    } catch (err) {
      setError(err.message);
    }
  };
  // ✅ Load all products initially
  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchCustomers();
  }, []);
  const dashboard_boxes = [
    {
      title: "Total Orders", to: "/orders", value: orderCount, icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      </svg>
      )
    },
    {
      title: "Total Products",
      to: "/products",
      value: productCount,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0
            1 0-7.5 0v4.5m11.356-1.993 1.263
            12c.07.665-.45 1.243-1.119
            1.243H4.25a1.125 1.125 0 0
            1-1.12-1.243l1.264-12A1.125
            1.125 0 0 1 5.513 7.5h12.974c.576 0
            1.059.435 1.119 1.007ZM8.625
            10.5a.375.375 0 1 1-.75 0
            .375.375 0 0 1 .75 0Zm7.5
            0a.375.375 0 1 1-.75 0
            .375.375 0 0 1 .75 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Total Customers", to: "/customers", value: userCount, icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
      )
    }
  ];

  const data = [
    {
      subject: 'Math',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'Chinese',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'English',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Geography',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Physics',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: 'History',
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];
  const formatXAxis = (tickItem) => {
    // Assuming tickItem is a Date object or can be converted to one
    const date = new Date(tickItem);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div>
      <div className="mx-auto">
        <dl className="grid gap-x-5 lg:grid-cols-3">
          {dashboard_boxes.map((value, index) => (
            <div key={index} className="pt-5 rounded-xl shadow-sm bg-gray-100 mb-5">
              <div className="grid auto-cols-max grid-flow-col px-5 pb-2.5">
                <div className='box-logo flex mx-2 my-2 px-4 py-4 bg-blue-950 text-white align-center justify-center rounded-xl text-2xl'>{value.icon}</div>
                <div className="col-span-2 ml-2">
                  <dd className="text-base/7 text-gray-600 font-semibold">{value.title}</dd>
                  <dd className="text-left text-md font-bold text-gray-900 sm:text-3xl">{value.value}</dd>
                </div>
              </div>
              <div className="bg-white py-3 pl-5 rounded-b-xl text-blue-950 hover:text-sky-700">
                <Link to={value.to}>View All</Link>
              </div>
            </div>
          ))}
        </dl>
      </div>
      <div class="flex gap-x-5">
      <div className="w-full h-[400px] bg-white rounded-xl shadow p-4">
      <LineChart
        style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }}
        responsive
        data={orders}
        margin={{
          top: 20,
          right: 20,
          bottom: 5,
          left: 0,
        }}
      >
        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="total_amount" stroke="purple" strokeWidth={2} name="Orders Total by Date" />
        <XAxis dataKey='order_date' tickFormatter={formatXAxis} />
        <YAxis width="auto" label={{ value: 'total_amount', position: 'insideLeft', angle: -90 }} />
        <Legend align="right" />
      </LineChart>
      </div>
      <CategoryRadarChart products={products} />
     
    </div>
    </div>

  );
};

export default PageWrapper(Dashboard);
