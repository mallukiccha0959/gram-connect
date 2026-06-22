import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function VendorDashboard({
  cart,
  darkMode,
  setDarkMode
}) {

  const navigate = useNavigate();

  // STATES
  const [orders, setOrders] = useState([]);

  const [products, setProducts] = useState([]);

  // const [totalRevenue, setTotalRevenue] = useState(0);

  // const [pendingOrders, setPendingOrders] = useState(0);

  // const [deliveredOrders, setDeliveredOrders] = useState(0);

  // NEW ANALYTICS STATES
  const [lowStockCount, setLowStockCount] =
    useState(0);

  const [latestProduct, setLatestProduct] =
    useState(null);

  const [topProduct, setTopProduct] =
    useState(null);

  const [totalInventory, setTotalInventory] =
    useState(0);

  // RECENT ACTIVITY STATE
  const [activities, setActivities] =
    useState([]);

  // SEARCH + FILTER STATES
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  // PRODUCT SEARCH + FILTER + SORT
  const [productSearch, setProductSearch] =
    useState("");

  const [stockFilter, setStockFilter] =
    useState("All");

  const [sortOption, setSortOption] =
    useState("Newest");

  // EDIT MODAL STATES
  const [showModal, setShowModal] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [editName, setEditName] =
    useState("");

  const [editPrice, setEditPrice] =
    useState("");

  const [editStock, setEditStock] =
    useState("");

  const [editCategory, setEditCategory] =
    useState("");

  const [editImage, setEditImage] =
    useState("");

  // STEP 2 — NEW ANALYTICS STATE
  const [analytics, setAnalytics] =
    useState(null);

  // FETCH DASHBOARD DATA
  const fetchDashboardData = async () => {

    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // FETCH VENDOR ORDERS
      const ordersResponse = await axios.get(
        "http://localhost:5000/api/orders/vendor-orders",
        config
      );

      // FETCH VENDOR PRODUCTS
      const productsResponse = await axios.get(
        "http://localhost:5000/api/products/vendor-products",
        config
      );

      // STEP 5 — FETCH ANALYTICS
      const analyticsResponse = await axios.get(
        "http://localhost:5000/api/orders/vendor-analytics",
        config
      );

      setAnalytics(
        analyticsResponse.data
      );

      const ordersData = ordersResponse.data;

      const productsData = productsResponse.data;

      setOrders(ordersData);

      setProducts(productsData);

      // LOW STOCK PRODUCTS
      setLowStockCount(

        productsData.filter(
          (product) => product.stock <= 5
        ).length

      );

      // LATEST PRODUCT
      if (productsData.length > 0) {

        const latest = [...productsData].sort(

          (a, b) =>

            new Date(b.createdAt) -
            new Date(a.createdAt)

        )[0];

        setLatestProduct(latest);

      }

      // TOP PRODUCT (HIGHEST PRICE)
      if (productsData.length > 0) {

        const top = [...productsData].sort(

          (a, b) => b.price - a.price

        )[0];

        setTopProduct(top);

      }

      // TOTAL INVENTORY
      setTotalInventory(

        productsData.reduce(

          (acc, product) =>

            acc + product.stock,

          0

        )

      );

      // RECENT ACTIVITIES

      const recentActivities = [];

      // ORDER ACTIVITIES
      ordersData.forEach((order) => {

        recentActivities.push({

          type: "order",

          message:
            `Order for ${order.items[0]?.name} is ${order.status}`,

          time: new Date(
            order.updatedAt
          ).toLocaleString(),

        });

      });

      // LOW STOCK ACTIVITIES
      productsData.forEach((product) => {

        if (product.stock <= 5) {

          recentActivities.push({

            type: "stock",

            message:
              `${product.name} stock is running low`,

            time: "Inventory Alert",

          });

        }

      });

      // SORT LATEST FIRST
      recentActivities.sort(

        (a, b) =>

          new Date(b.time) -
          new Date(a.time)

      );

      // LIMIT TO 6
      setActivities(
        recentActivities.slice(0, 6)
      );

    } catch (error) {

      console.log(error);

    }

  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {

    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status },
        config
      );

      fetchDashboardData();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        config
      );

      fetchDashboardData();

    } catch (error) {

      console.log(error);

    }

  };

  // OPEN EDIT MODAL
  const openEditModal = (product) => {

    setSelectedProduct(product);

    setEditName(product.name);

    setEditPrice(product.price);

    setEditStock(product.stock);

    setEditCategory(product.category);

    setEditImage(product.image);

    setShowModal(true);

  };

  // UPDATE PRODUCT
  const updateProduct = async () => {

    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(

        `http://localhost:5000/api/products/${selectedProduct._id}`,

        {
          name: editName,
          price: editPrice,
          stock: editStock,
          category: editCategory,
          image: editImage,
        },

        config

      );

      setShowModal(false);

      fetchDashboardData();

    } catch (error) {

      console.log(error);

    }

  };

  // USE EFFECT
  useEffect(() => {

    fetchDashboardData();

  }, []);

  // FILTERED ORDERS
  const filteredOrders = orders.filter((order) => {

    const customerName =
      order.user?.name?.toLowerCase() || "";

    const productName =
      order.items[0]?.name?.toLowerCase() || "";

    const matchesSearch =

      customerName.includes(
        search.toLowerCase()
      ) ||

      productName.includes(
        search.toLowerCase()
      );

    const matchesStatus =

      statusFilter === "All" ||

      order.status === statusFilter;

    return matchesSearch && matchesStatus;

  });

  // FILTERED PRODUCTS
  const filteredProducts = [...products]

    // SEARCH
    .filter((product) => {

      const searchText =
        productSearch.toLowerCase();

      return (

        product.name
          ?.toLowerCase()
          .includes(searchText)

        ||

        product.category
          ?.toLowerCase()
          .includes(searchText)

      );

    })

    // FILTER
    .filter((product) => {

      if (stockFilter === "All")
        return true;

      if (stockFilter === "In Stock")
        return product.stock > 5;

      if (stockFilter === "Low Stock")
        return product.stock <= 5;

      return true;

    })

    // SORT
    .sort((a, b) => {

      if (sortOption === "LowToHigh") {

        return a.price - b.price;

      }

      if (sortOption === "HighToLow") {

        return b.price - a.price;

      }

      return (
        new Date(b.createdAt) -
        new Date(a.createdAt)
      );

    });

  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 7000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 9000 },
    { month: "May", sales: 12000 }
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-black"
      }`}
    >

      {/* Navbar */}
      <Navbar
        cart={cart}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Header */}
      <div className="p-8 flex flex-col md:flex-row justify-between items-center">

        <div>

          <h1 className="text-5xl font-bold mb-2">
            Vendor Dashboard 👨‍🌾
          </h1>

          <p className="text-gray-500">
            Manage your store like a professional marketplace seller
          </p>

        </div>

        <div className="flex gap-4 mt-4 md:mt-0">

          <button
            onClick={() => navigate("/vendor-products")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            My Products
          </button>

          <button
            onClick={() => navigate("/vendor/orders")}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition"
          >
            Orders
          </button>

          <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition">
            Export Reports
          </button>

        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8">

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-6 rounded-2xl shadow-lg ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          }`}
        >

          <h2 className="text-xl font-bold">
            Total Products
          </h2>

          <p className="text-3xl mt-2">
            {products.length}
          </p>

        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-green-500 text-white p-6 rounded-2xl shadow-lg"
        >

          {/* ✅ FIXED: "Orders Today" → "Total Orders" */}
          <h2 className="text-xl font-bold">
            Total Orders
          </h2>

          <p className="text-3xl mt-2">
            {analytics?.totalOrders || 0}
          </p>

        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-purple-500 text-white p-6 rounded-2xl shadow-lg"
        >

          <h2 className="text-xl font-bold">
            Revenue
          </h2>

          <p className="text-3xl mt-2">
            ₹{analytics?.totalRevenue || 0}
          </p>

        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-orange-500 text-white p-6 rounded-2xl shadow-lg"
        >

          <h2 className="text-xl font-bold">
            Pending Orders
          </h2>

          <p className="text-3xl mt-2">
            {analytics?.pendingOrders || 0}
          </p>

        </motion.div>

      </div>

      {/* Sales Analytics */}
      <div className="px-8 mt-10">

        <h2 className="text-3xl font-bold mb-4">
          Sales Analytics 📈
        </h2>

        <div
          className={`p-6 rounded-2xl ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >

          <ResponsiveContainer width="100%" height={300}>

            <LineChart data={salesData}>

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#9333ea"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* RECENT ORDERS */}
      <div
        className="card border-0 shadow-lg mt-5 mx-8"
        style={{
          borderRadius: "20px",
        }}
      >

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

            <h3 className="fw-bold">
              Recent Orders
            </h3>

            <div className="d-flex gap-3">

              <input
                type="text"
                placeholder="Search orders..."
                className="form-control"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                style={{
                  borderRadius: "12px",
                  width: "250px",
                }}
              />

              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                style={{
                  borderRadius: "12px",
                  width: "180px",
                }}
              >

                <option value="All">
                  All Orders
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

              </select>

            </div>

          </div>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>

                  <th>Customer</th>
                  <th>Product</th>
                  <th>Total</th>
                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {filteredOrders.map((order) => (

                  <tr key={order._id}>

                    <td className="fw-semibold">
                      {order.user?.name}
                    </td>

                    <td>
                      {order.items[0]?.name}
                    </td>

                    <td className="fw-bold">
                      ₹{order.totalPrice}
                    </td>

                    <td>

                      <div className="d-flex align-items-center gap-3">

                        <span
                          className="badge"
                          style={{

                            background:

                              order.status === "Pending"
                                ? "#facc15"

                                : order.status === "Processing"
                                ? "#fb923c"

                                : order.status === "Shipped"
                                ? "#3b82f6"

                                : "#22c55e",

                            color:
                              order.status === "Pending"
                                ? "black"
                                : "white",

                            padding: "10px 18px",

                            borderRadius: "30px",

                            fontSize: "14px",

                            fontWeight: "600",

                            minWidth: "110px",

                            textAlign: "center",

                          }}
                        >

                          {order.status}

                        </span>

                        <select
                          className="form-select"
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(
                              order._id,
                              e.target.value
                            )
                          }

                          style={{
                            borderRadius: "12px",
                            fontWeight: "600",
                            width: "170px",
                          }}
                        >

                          <option>Pending</option>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>

                        </select>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* RECENT ACTIVITY FEED */}

      <div
        className="card border-0 shadow-lg mt-5 mb-5 mx-8"
        style={{
          borderRadius: "20px",
        }}
      >

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h3 className="fw-bold">
              Recent Activity
            </h3>

          </div>

          <div className="d-flex flex-column gap-3">

            {activities.map((activity, index) => (

              <div
                key={index}

                className="d-flex justify-content-between align-items-center p-3"

                style={{
                  background: "#f9fafb",
                  borderRadius: "14px",
                }}
              >

                <div className="d-flex align-items-center gap-3">

                  {/* ICON */}

                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",

                      background:

                        activity.type === "order"
                          ? "#3b82f6"
                          : "#ef4444",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                      color: "white",
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >

                    {activity.type === "order"
                      ? "🛒"
                      : "⚠️"}

                  </div>

                  {/* MESSAGE */}

                  <div>

                    <h6 className="mb-1 fw-bold">

                      {activity.message}

                    </h6>

                    <small style={{ color: "gray" }}>

                      {activity.time}

                    </small>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* PRODUCT ANALYTICS */}
      <div className="row g-4 mt-2 mb-5 mx-4">

        {/* TOP PRODUCT */}
        <div className="col-md-3">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#6366f1,#8b5cf6)",
              color: "white",
            }}
          >

            <h6>Top Product</h6>

            <h4 className="fw-bold mt-3">

              {topProduct?.name || "No Product"}

            </h4>

            <p className="mt-2">

              ₹{topProduct?.price || 0}

            </p>

          </div>

        </div>

        {/* LOW STOCK */}
        <div className="col-md-3">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#ef4444,#f97316)",
              color: "white",
            }}
          >

            <h6>Low Stock Products</h6>

            <h2 className="fw-bold mt-3">

              {lowStockCount}

            </h2>

          </div>

        </div>

        {/* LATEST PRODUCT */}
        <div className="col-md-3">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#06b6d4,#3b82f6)",
              color: "white",
            }}
          >

            <h6>Latest Product</h6>

            <h4 className="fw-bold mt-3">

              {latestProduct?.name || "No Product"}

            </h4>

          </div>

        </div>

        {/* TOTAL INVENTORY */}
        <div className="col-md-3">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#22c55e,#14b8a6)",
              color: "white",
            }}
          >

            <h6>Total Inventory</h6>

            <h2 className="fw-bold mt-3">

              {totalInventory}

            </h2>

          </div>

        </div>

      </div>

      {/* PRODUCT MANAGEMENT */}
      <div
        className="card border-0 shadow-lg mt-5 mx-8"
        style={{
          borderRadius: "20px",
        }}
      >

        <div className="card-body p-4">

          <div className="flex justify-between items-center mb-8">

            <h1 className="text-3xl font-bold">

              Product Management

            </h1>

            <button
              onClick={() => navigate("/add-product")}
              className="
                bg-purple-600
                hover:bg-purple-700
                text-white
                px-6 py-3
                rounded-2xl
                font-semibold
              "
            >

              + Add Product

            </button>

          </div>

          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

            <div className="d-flex gap-3 flex-wrap">

              <input
                type="text"
                placeholder="Search products..."
                className="form-control"
                value={productSearch}
                onChange={(e) =>
                  setProductSearch(
                    e.target.value
                  )
                }

                style={{
                  width: "240px",
                  borderRadius: "12px",
                }}
              />

              <select
                className="form-select"
                value={stockFilter}
                onChange={(e) =>
                  setStockFilter(
                    e.target.value
                  )
                }

                style={{
                  width: "180px",
                  borderRadius: "12px",
                }}
              >

                <option value="All">
                  All Products
                </option>

                <option value="In Stock">
                  In Stock
                </option>

                <option value="Low Stock">
                  Low Stock
                </option>

              </select>

              <select
                className="form-select"
                value={sortOption}
                onChange={(e) =>
                  setSortOption(
                    e.target.value
                  )
                }

                style={{
                  width: "200px",
                  borderRadius: "12px",
                }}
              >

                <option value="Newest">
                  Newest
                </option>

                <option value="LowToHigh">
                  Price Low → High
                </option>

                <option value="HighToLow">
                  Price High → Low
                </option>

              </select>

            </div>

          </div>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>

                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredProducts.map((product) => (

                  <tr key={product._id}>

                    <td className="fw-semibold">
                      {product.name}
                    </td>

                    <td className="fw-bold">
                      ₹{product.price}
                    </td>

                    <td>
                      {product.stock}
                    </td>

                    <td>

                      <span
                        className="badge"
                        style={{

                          background:
                            product.stock <= 5
                              ? "#ef4444"
                              : "#22c55e",

                          color: "white",

                          padding: "10px 18px",

                          borderRadius: "30px",

                          fontSize: "13px",

                        }}
                      >

                        {product.stock <= 5
                          ? "Low Stock"
                          : "In Stock"}

                      </span>

                    </td>

                    <td>

                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-primary rounded-4"
                          onClick={() =>
                            openEditModal(product)
                          }
                        >

                          Edit

                        </button>

                        <button
                          className="btn btn-danger rounded-4"
                          onClick={() =>
                            deleteProduct(product._id)
                          }
                        >

                          Delete

                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* ✅ EDIT PRODUCT MODAL */}
      {
        showModal && (

          <div
            className="
              fixed inset-0
              bg-black/50
              flex justify-center
              items-center
              z-50
            "
          >

            <div
              className="
                bg-white
                w-full
                max-w-2xl
                rounded-3xl
                p-8
                shadow-2xl
                relative
              "
            >

              {/* CLOSE BUTTON */}

              <button

                onClick={() =>
                  setShowModal(false)
                }

                className="
                  absolute
                  top-4
                  right-4
                  text-2xl
                "
              >

                ✕

              </button>

              <h1 className="text-3xl font-bold mb-8">

                Edit Product ✏️

              </h1>

              <div className="space-y-5">

                <input
                  type="text"
                  value={editName}
                  onChange={(e) =>
                    setEditName(e.target.value)
                  }

                  placeholder="Product Name"

                  className="
                    w-full border
                    p-4 rounded-2xl
                  "
                />

                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) =>
                    setEditPrice(e.target.value)
                  }

                  placeholder="Price"

                  className="
                    w-full border
                    p-4 rounded-2xl
                  "
                />

                <input
                  type="number"
                  value={editStock}
                  onChange={(e) =>
                    setEditStock(e.target.value)
                  }

                  placeholder="Stock"

                  className="
                    w-full border
                    p-4 rounded-2xl
                  "
                />

                <input
                  type="text"
                  value={editCategory}
                  onChange={(e) =>
                    setEditCategory(
                      e.target.value
                    )
                  }

                  placeholder="Category"

                  className="
                    w-full border
                    p-4 rounded-2xl
                  "
                />

                <input
                  type="text"
                  value={editImage}
                  onChange={(e) =>
                    setEditImage(
                      e.target.value
                    )
                  }

                  placeholder="Image URL"

                  className="
                    w-full border
                    p-4 rounded-2xl
                  "
                />

                <button

                  onClick={updateProduct}

                  className="
                    w-full
                    bg-purple-600
                    hover:bg-purple-700
                    text-white
                    py-4
                    rounded-2xl
                    font-bold
                  "
                >

                  Update Product

                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>
  );
}