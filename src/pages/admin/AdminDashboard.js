import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

import {
  FaUsers,
  FaStore,
  FaBoxOpen,
  FaShoppingBag,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaChartLine,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
  FaShoppingCart,
  FaBox,
  FaEllipsisV,
} from "react-icons/fa";

export default function AdminDashboard({
  cart,
  darkMode,
  setDarkMode,
  wishlist
}) {

  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [analytics, setAnalytics] = useState({});
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [productSearch, setProductSearch] = useState("");
  const [orders, setOrders] = useState([]);

  // STEP 2 — SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");

  // DELIVERY AGENTS STATE
  const [deliveryAgents, setDeliveryAgents] = useState([]);

  // DROPDOWN STATE — shared for vendors and users
  const [openMenu, setOpenMenu] = useState(null);

  const analyticsData = [
    { name: "Users", value: analytics.totalUsers || 0 },
    { name: "Vendors", value: analytics.totalVendors || 0 },
    { name: "Products", value: analytics.totalProducts || 0 },
    { name: "Orders", value: analytics.totalOrders || 0 },
  ];

  useEffect(() => {
    fetchAnalytics();
    fetchUsers();
    fetchVendors();
    fetchProducts();
    fetchOrders();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const fetchAnalytics = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/analytics",
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setAnalytics(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/users",
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setUsers(data);

      // FILTER DELIVERY AGENTS FROM USERS
      const deliveryUsers = data.filter((user) => user.role === "delivery");
      setDeliveryAgents(deliveryUsers);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchVendors = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/vendors",
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setVendors(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateVendorStatusHandler = async (id, status) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.put(
        `http://localhost:5000/api/admin/vendors/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setOpenMenu(null);
      fetchVendors();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserStatusHandler = async (id, status) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.put(
        `http://localhost:5000/api/admin/users/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/products",
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/orders",
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.put(
        `http://localhost:5000/api/admin/orders/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  // ASSIGN DELIVERY AGENT FUNCTION
  const assignDeliveryAgent = async (orderId, deliveryAgentId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}/assign`,
        { deliveryAgentId },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProductHandler = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.delete(
        `http://localhost:5000/api/admin/products/${id}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserHandler = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const notifications = [
    { id: 1, text: `${analytics.totalOrders || 0} total orders received` },
    { id: 2, text: `${analytics.pendingOrders || 0} pending orders` },
    { id: 3, text: `${analytics.totalUsers || 0} users registered` },
  ];

  return (

    <div className="flex min-h-screen bg-gray-100 overflow-hidden">

      {/* SIDEBAR */}
      <div
        className={`
          fixed lg:static top-0 left-0
          h-full z-50
          w-20 md:w-72
          bg-black text-white p-4 md:p-6
          transform transition-all duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <h1 className="text-xl md:text-3xl font-bold mb-10 text-purple-400 hidden md:block">
          GramConnect Admin
        </h1>

        <h1 className="text-xl font-bold mb-10 text-purple-400 block md:hidden text-center">
          GC
        </h1>

        <div className="space-y-4">

          <button
            onClick={() => { setActiveSection("dashboard"); setSidebarOpen(false); }}
            className={`flex items-center gap-3 w-full p-4 rounded-xl transition justify-center md:justify-start
              ${activeSection === "dashboard" ? "bg-purple-600" : "hover:bg-gray-800"}`}
          >
            <FaTachometerAlt />
            <span className="hidden md:block">Dashboard</span>
          </button>

          <button
            onClick={() => { setActiveSection("users"); setSidebarOpen(false); }}
            className={`flex items-center gap-3 w-full p-4 rounded-xl transition justify-center md:justify-start
              ${activeSection === "users" ? "bg-purple-600" : "hover:bg-gray-800"}`}
          >
            <FaUsers />
            <span className="hidden md:block">Users</span>
          </button>

          <button
            onClick={() => { setActiveSection("vendors"); setSidebarOpen(false); }}
            className={`flex items-center gap-3 w-full p-4 rounded-xl transition justify-center md:justify-start
              ${activeSection === "vendors" ? "bg-purple-600" : "hover:bg-gray-800"}`}
          >
            <FaStore />
            <span className="hidden md:block">Vendors</span>
          </button>

          <button
            onClick={() => { setActiveSection("products"); setSidebarOpen(false); }}
            className={`flex items-center gap-3 w-full p-4 rounded-xl transition justify-center md:justify-start
              ${activeSection === "products" ? "bg-purple-600" : "hover:bg-gray-800"}`}
          >
            <FaBox />
            <span className="hidden md:block">Products</span>
          </button>

          <button
            onClick={() => { setActiveSection("orders"); setSidebarOpen(false); }}
            className={`flex items-center gap-3 w-full p-4 rounded-xl transition justify-center md:justify-start
              ${activeSection === "orders" ? "bg-purple-600" : "hover:bg-gray-800"}`}
          >
            <FaShoppingCart />
            <span className="hidden md:block">Orders</span>
          </button>

          <button
            onClick={() => { setActiveSection("analytics"); setSidebarOpen(false); }}
            className={`flex items-center gap-3 w-full p-4 rounded-xl transition justify-center md:justify-start
              ${activeSection === "analytics" ? "bg-purple-600" : "hover:bg-gray-800"}`}
          >
            <FaChartLine />
            <span className="hidden md:block">Analytics</span>
          </button>

        </div>

        <button
          onClick={logoutHandler}
          className="mt-20 flex items-center gap-3 bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl justify-center md:justify-start w-full"
        >
          <FaSignOutAlt />
          <span className="hidden md:block">Logout</span>
        </button>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-8 overflow-x-auto">

        {/* MOBILE TOPBAR */}
        <div className="lg:hidden bg-white p-4 shadow-md flex justify-between items-center sticky top-0 z-40 mb-4 rounded-2xl">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">
            <FaBars />
          </button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        {/* TOPBAR */}
        <div className="bg-white rounded-2xl p-6 shadow-md flex flex-wrap justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard 👨‍💼</h1>
            <p className="text-gray-500 mt-2">Welcome to GramConnect Control Center</p>

            {/* STEP 3 — SEARCH BAR UI */}
            <div className="mt-6">
              <input
                type="text"
                placeholder={`Search ${activeSection}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-96 p-4 rounded-2xl border border-gray-300 outline-none focus:ring-4 focus:ring-purple-300 shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <input
              type="text"
              placeholder="Search..."
              className="border px-4 py-3 rounded-xl outline-none"
            />

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700"
              >
                Notifications
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white shadow-2xl rounded-2xl p-4 z-50">
                  <h2 className="text-xl font-bold mb-4">Notifications</h2>
                  <div className="space-y-3">
                    {notifications.map((item) => (
                      <div key={item.id} className="bg-gray-100 p-3 rounded-xl">
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
              A
            </div>
          </div>
        </div>

        {/* ── DASHBOARD SECTION ── */}
        {activeSection === "dashboard" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

              <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-6 rounded-3xl text-white shadow-xl hover:scale-105 transition">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg">Total Users</p>
                    <h1 className="text-4xl font-bold mt-2">{analytics.totalUsers}</h1>
                  </div>
                  <FaUsers className="text-5xl opacity-80" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 rounded-3xl text-white shadow-xl hover:scale-105 transition">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg">Vendors</p>
                    <h1 className="text-4xl font-bold mt-2">{analytics.totalVendors}</h1>
                  </div>
                  <FaStore className="text-5xl opacity-80" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-3xl text-white shadow-xl hover:scale-105 transition">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg">Products</p>
                    <h1 className="text-4xl font-bold mt-2">{analytics.totalProducts}</h1>
                  </div>
                  <FaBoxOpen className="text-5xl opacity-80" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 rounded-3xl text-white shadow-xl hover:scale-105 transition">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg">Orders</p>
                    <h1 className="text-4xl font-bold mt-2">{analytics.totalOrders}</h1>
                  </div>
                  <FaShoppingBag className="text-5xl opacity-80" />
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-lg">Total Revenue</p>
                    <h1 className="text-5xl font-bold mt-3 text-green-600">₹{analytics.totalRevenue}</h1>
                  </div>
                  <FaMoneyBillWave className="text-6xl text-green-500" />
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-lg">Pending Orders</p>
                    <h1 className="text-5xl font-bold mt-3 text-orange-500">{analytics.pendingOrders}</h1>
                  </div>
                  <FaClock className="text-6xl text-orange-400" />
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-lg">Delivered Orders</p>
                    <h1 className="text-5xl font-bold mt-3 text-purple-600">{analytics.deliveredOrders}</h1>
                  </div>
                  <FaCheckCircle className="text-6xl text-purple-500" />
                </div>
              </div>

            </div>
          </>
        )}

        {/* ── USERS SECTION ── */}
        {activeSection === "users" && (
          <div className="bg-white p-8 rounded-3xl shadow-lg mb-10">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h1 className="text-3xl font-bold">User Management</h1>
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-3 rounded-xl outline-none"
              />
            </div>

            <div className="overflow-x-auto rounded-3xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* STEP 4 — FILTER USERS */}
                  {users
                    .filter((user) =>
                      user.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((user) => (
                      <tr key={user._id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-semibold">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-4 py-2 rounded-full text-white text-sm
                            ${user.role === "admin" ? "bg-black"
                              : user.role === "vendor" ? "bg-purple-600"
                              : user.role === "delivery" ? "bg-teal-500"
                              : "bg-blue-500"}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-4 py-2 rounded-full text-white text-sm
                              ${user.userStatus === "Approved"
                                ? "bg-green-500"
                                : user.userStatus === "Rejected"
                                ? "bg-red-500"
                                : user.userStatus === "Blocked"
                                ? "bg-black"
                                : "bg-orange-500"
                              }`}
                          >
                            {user.userStatus}
                          </span>
                        </td>

                        <td className="p-4 relative">
                          <button
                            onClick={() =>
                              setOpenMenu(openMenu === user._id ? null : user._id)
                            }
                            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl"
                          >
                            <FaEllipsisV />
                          </button>

                          {openMenu === user._id && (
                            <div className="absolute right-0 mt-2 bg-white shadow-2xl rounded-2xl z-50 w-44 overflow-hidden">
                              <button
                                onClick={() => updateUserStatusHandler(user._id, "Approved")}
                                className="w-full text-left px-4 py-3 hover:bg-green-100"
                              >
                                ✅ Approve
                              </button>
                              <button
                                onClick={() => updateUserStatusHandler(user._id, "Rejected")}
                                className="w-full text-left px-4 py-3 hover:bg-red-100"
                              >
                                ❌ Reject
                              </button>
                              <button
                                onClick={() => updateUserStatusHandler(user._id, "Blocked")}
                                className="w-full text-left px-4 py-3 hover:bg-gray-100"
                              >
                                🚫 Block
                              </button>
                              <button
                                onClick={() => deleteUserHandler(user._id)}
                                className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          )}
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── VENDORS SECTION ── */}
        {activeSection === "vendors" && (
          <div className="bg-white p-8 rounded-3xl shadow-lg mb-10">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Vendor Management</h1>
            </div>

            <div className="overflow-x-auto rounded-3xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* STEP 5 — FILTER VENDORS */}
                  {vendors
                    .filter((vendor) =>
                      vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((vendor) => (
                      <tr key={vendor._id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-semibold">{vendor.name}</td>
                        <td className="p-4">{vendor.email}</td>
                        <td className="p-4">
                          <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm">
                            Vendor
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-4 py-2 rounded-full text-white text-sm
                            ${vendor.vendorStatus === "Approved" ? "bg-green-500"
                              : vendor.vendorStatus === "Rejected" ? "bg-red-500"
                              : vendor.vendorStatus === "Blocked" ? "bg-black"
                              : "bg-orange-500"}`}>
                            {vendor.vendorStatus}
                          </span>
                        </td>

                        <td className="p-4 relative">
                          <button
                            onClick={() =>
                              setOpenMenu(openMenu === vendor._id ? null : vendor._id)
                            }
                            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-xl"
                          >
                            <FaEllipsisV />
                          </button>

                          {openMenu === vendor._id && (
                            <div className="absolute right-0 mt-2 bg-white shadow-2xl rounded-2xl z-50 w-44 overflow-hidden">
                              <button
                                onClick={() => updateVendorStatusHandler(vendor._id, "Approved")}
                                className="w-full text-left px-4 py-3 hover:bg-green-100"
                              >
                                ✅ Approve
                              </button>
                              <button
                                onClick={() => updateVendorStatusHandler(vendor._id, "Rejected")}
                                className="w-full text-left px-4 py-3 hover:bg-red-100"
                              >
                                ❌ Reject
                              </button>
                              <button
                                onClick={() => updateVendorStatusHandler(vendor._id, "Blocked")}
                                className="w-full text-left px-4 py-3 hover:bg-gray-100"
                              >
                                🚫 Block
                              </button>
                            </div>
                          )}
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PRODUCTS SECTION ── */}
        {activeSection === "products" && (
          <div className="bg-white p-8 rounded-3xl shadow-lg mb-10">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h1 className="text-3xl font-bold">Product Management</h1>
              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="border px-4 py-3 rounded-xl outline-none"
              />
            </div>

            <div className="overflow-x-auto rounded-3xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-4">Image</th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Vendor</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* STEP 6 — FILTER PRODUCTS */}
                  {products
                    .filter((product) =>
                      product.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((product) => (
                      <tr key={product._id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                        </td>
                        <td className="p-4 font-semibold">{product.name}</td>
                        <td className="p-4">₹{product.price}</td>
                        <td className="p-4">{product.category}</td>
                        <td className="p-4">{product.vendor?.name}</td>
                        <td className="p-4">
                          <button
                            onClick={() => deleteProductHandler(product._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ORDERS SECTION ── */}
        {activeSection === "orders" && (
          <div className="bg-white p-8 rounded-3xl shadow-lg mb-10">
            <h1 className="text-3xl font-bold mb-6">Order Management</h1>

            <div className="overflow-x-auto rounded-3xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-4">Customer</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Products</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Update</th>
                    <th className="p-4">Delivery Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {/* STEP 7 — FILTER ORDERS */}
                  {orders
                    .filter((order) =>
                      order._id.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((order) => (
                      <tr key={order._id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-semibold">{order.user?.name}</td>
                        <td className="p-4">₹{order.totalPrice}</td>
                        <td className="p-4">{order.items.length}</td>
                        <td className="p-4">
                          <span className={`px-4 py-2 rounded-full text-white text-sm
                            ${order.status === "Delivered" ? "bg-green-500"
                              : order.status === "Processing" ? "bg-blue-500"
                              : "bg-orange-500"}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="border px-3 py-2 rounded-xl"
                          >
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                          </select>
                        </td>

                        {/* ASSIGN DELIVERY AGENT DROPDOWN */}
                        <td className="p-4">
                          <select
                            onChange={(e) => assignDeliveryAgent(order._id, e.target.value)}
                            className="p-2 rounded-xl border"
                          >
                            <option>Assign Agent</option>
                            {deliveryAgents.map((agent) => (
                              <option key={agent._id} value={agent._id}>
                                {agent.name}
                              </option>
                            ))}
                          </select>
                        </td>

                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ANALYTICS SECTION ── */}
        {activeSection === "analytics" && (
          <div>
            <div className="mb-10">
              <h1 className="text-4xl font-bold">Analytics Dashboard 📊</h1>
              <p className="text-gray-500 mt-2">Real-time marketplace analytics</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Marketplace Overview</h2>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={analyticsData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#7c3aed" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Orders & Revenue</h2>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={[
                    { name: "Revenue", value: analytics.totalRevenue || 0 },
                    { name: "Pending", value: analytics.pendingOrders || 0 },
                    { name: "Delivered", value: analytics.deliveredOrders || 0 },
                  ]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={4} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 rounded-3xl text-white shadow-xl">
                <p className="text-xl">Total Revenue</p>
                <h1 className="text-5xl font-bold mt-4">₹{analytics.totalRevenue}</h1>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-8 rounded-3xl text-white shadow-xl">
                <p className="text-xl">Pending Orders</p>
                <h1 className="text-5xl font-bold mt-4">{analytics.pendingOrders}</h1>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-8 rounded-3xl text-white shadow-xl">
                <p className="text-xl">Delivered Orders</p>
                <h1 className="text-5xl font-bold mt-4">{analytics.deliveredOrders}</h1>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}