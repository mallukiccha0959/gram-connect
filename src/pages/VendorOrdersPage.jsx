import { useEffect, useState } from "react";

import axios from "axios";

import {
  Bar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function VendorOrders() {

  const [orders, setOrders] = useState([]);

  // ANALYTICS STATES
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [pendingOrders, setPendingOrders] = useState(0);

  const [deliveredOrders, setDeliveredOrders] = useState(0);

  // CHART DATA
  const chartData = {

    labels: [
      "Orders",
      "Pending",
      "Delivered",
    ],

    datasets: [
      {
        label: "Vendor Analytics",

        data: [
          orders.length,
          pendingOrders,
          deliveredOrders,
        ],

        backgroundColor: [
          "#667eea",
          "#f7971e",
          "#56ab2f",
        ],

        borderRadius: 10,
      },
    ],
  };

  useEffect(() => {

    fetchOrders();

  }, []);


  const fetchOrders = async () => {

    try {

      const token = JSON.parse(
        localStorage.getItem("userInfo")
      )?.token;

      const response = await axios.get(

        "http://localhost:5000/api/orders/vendor-orders",

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      console.log(response.data);

      setOrders(response.data);

      // ANALYTICS
      setTotalRevenue(

        response.data.reduce(
          (acc, order) => acc + order.totalPrice,
          0
        )

      );

      setPendingOrders(

        response.data.filter(
          (order) => order.status === "Pending"
        ).length

      );

      setDeliveredOrders(

        response.data.filter(
          (order) => order.status === "Delivered"
        ).length

      );

    }

    catch (error) {

      console.log(error);

    }

  };


  const updateStatus = async (id, status) => {

    try {

      const token = JSON.parse(
        localStorage.getItem("userInfo")
      )?.token;

      await axios.put(

        `http://localhost:5000/api/orders/${id}/status`,

        { status },

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );


      alert("Order Updated 🚀");

      fetchOrders();

    }

    catch (error) {

      console.log(error);

    }

  };


  return (

    <div
      className="container-fluid py-4"
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >

      {/* PAGE TITLE */}
      <div className="mb-5">

        <h1
          className="fw-bold"
          style={{
            fontSize: "40px",
          }}
        >
          Vendor Dashboard
        </h1>

        <p
          style={{
            color: "gray",
            fontSize: "18px",
          }}
        >
          Manage orders and track business analytics
        </p>

      </div>

      {/* ANALYTICS CARDS */}
      <div className="row g-4 mb-5">

        {/* TOTAL ORDERS */}
        <div className="col-md-3">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#667eea,#764ba2)",
              color: "white",
            }}
          >

            <h6>Total Orders</h6>

            <h2 className="fw-bold">
              {orders.length}
            </h2>

          </div>

        </div>

        {/* REVENUE */}
        <div className="col-md-3">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#11998e,#38ef7d)",
              color: "white",
            }}
          >

            <h6>Total Revenue</h6>

            <h2 className="fw-bold">
              ₹{totalRevenue}
            </h2>

          </div>

        </div>

        {/* PENDING */}
        <div className="col-md-3">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#f7971e,#ffd200)",
              color: "white",
            }}
          >

            <h6>Pending Orders</h6>

            <h2 className="fw-bold">
              {pendingOrders}
            </h2>

          </div>

        </div>

        {/* DELIVERED */}
        <div className="col-md-3">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#56ab2f,#a8e063)",
              color: "white",
            }}
          >

            <h6>Delivered Orders</h6>

            <h2 className="fw-bold">
              {deliveredOrders}
            </h2>

          </div>

        </div>

      </div>


      {/* CHARTS SECTION */}
      <div className="row mb-5">

        <div className="col-lg-12">

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: "20px",
            }}
          >

            <h3 className="fw-bold mb-4">
              Revenue Analytics
            </h3>

            <Bar data={chartData} />

          </div>

        </div>

      </div>


      {/* ORDERS TABLE */}
      <div
        className="card border-0 shadow-lg"
        style={{
          borderRadius: "20px",
        }}
      >

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h3 className="fw-bold">
              Recent Orders
            </h3>

          </div>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr
                  style={{
                    color: "gray",
                    fontSize: "14px",
                  }}
                >

                  <th>Customer</th>
                  <th>Product</th>
                  <th>Total</th>
                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

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
                          padding: "10px",
                          fontWeight: "600",
                        }}
                      >

                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>

                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}