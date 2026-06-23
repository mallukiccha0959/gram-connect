import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import LiveTrackingMap from "../components/LiveTrackingMap";

export default function DeliveryDashboard({
  cart,
  wishlist,
  darkMode,
  setDarkMode
}) {

  const [orders, setOrders] =
    useState([]);

  const [analytics, setAnalytics] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchDashboard();

  }, []);


  const fetchDashboard = async () => {

    try {

      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

      const config = {

        headers: {

          Authorization:
            `Bearer ${userInfo.token}`,

        },

      };

      // GET ORDERS
      const ordersRes =
        await axios.get(

          "https://gram-connect-ten.vercel.app/api/delivery/orders",

          config

        );

      // GET ANALYTICS
      const analyticsRes =
        await axios.get(

          "https://gram-connect-ten.vercel.app/api/delivery/analytics",

          config

        );

      setOrders(
        ordersRes.data
      );

      setAnalytics(
        analyticsRes.data
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

    }

  };


  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

      const config = {

        headers: {

          Authorization:
            `Bearer ${userInfo.token}`,

        },

      };

      await axios.put(

        `https://gram-connect-ten.vercel.app/api/delivery/orders/${id}/status`,

        { status },

        config

      );

      fetchDashboard();

    } catch (error) {

      console.log(error);

    }

  };


  const acceptDelivery =
    async (id) => {

      try {

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        await axios.put(

          `https://gram-connect-ten.vercel.app/api/delivery/orders/${id}/accept`,

          {},

          {
            headers: {

              Authorization:
                `Bearer ${userInfo.token}`,

            },
          }

        );

        fetchDashboard();

      } catch (error) {

        console.log(error);

      }

    };


  const rejectDelivery =
    async (id) => {

      try {

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        await axios.put(

          `https://gram-connect-ten.vercel.app/api/delivery/orders/${id}/reject`,

          {},

          {
            headers: {

              Authorization:
                `Bearer ${userInfo.token}`,

            },
          }

        );

        fetchDashboard();

      } catch (error) {

        console.log(error);

      }

    };


  if (loading) {

    return (
      <div className="p-10 text-3xl font-bold">
        Loading...
      </div>
    );

  }


  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-black text-white"
          : "bg-gradient-to-br from-gray-100 to-purple-100"
      }`}
    >
      <Navbar
        cart={cart}
        wishlist={wishlist}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="p-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-6xl font-extrabold">
            Delivery Partner Dashboard 🚴
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Manage deliveries and earnings efficiently
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">

          <div className="bg-green-500 text-white p-6 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold">
              Earnings Today
            </h2>

            <p className="text-5xl mt-4 font-extrabold">
              ₹{analytics.earnings || 0}
            </p>
          </div>

          <div className="bg-blue-500 text-white p-6 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold">
              Active Deliveries
            </h2>

            <p className="text-5xl mt-4 font-extrabold">
              {analytics.activeOrders || 0}
            </p>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold">
              Rating
            </h2>

            <p className="text-5xl mt-4 font-extrabold">
              ⭐ 4.9
            </p>
          </div>

          <div className="bg-orange-500 text-white p-6 rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold">
              Performance
            </h2>

            <p className="text-5xl mt-4 font-extrabold">
              96%
            </p>
          </div>

        </div>

        {/* Online Toggle */}
        <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold">
              Availability Status
            </h2>

            <p className="text-gray-500">
              Accept or pause new delivery requests
            </p>
          </div>

          <button className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold">
            Online
          </button>

        </div>

        {/* Delivery Requests */}
        <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg">

          <h2 className="text-3xl font-bold mb-6">
            Active Deliveries 📦
          </h2>

          <div className="space-y-5">

            {orders.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-5 rounded-2xl"
              >

                <div>
                  <h3 className="text-xl font-bold">
                    {item.user?.name}
                  </h3>

                  <p className="text-gray-500">
                    Delivery Address
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    ₹{item.totalPrice}
                  </p>

                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
                    {item.deliveryStatus}
                  </span>

                  <div className="flex gap-2 mt-3">

                    {

                      item.deliveryStatus ===
                      "Assigned" && (

                        <>

                          <button

                            onClick={() =>
                              acceptDelivery(
                                item._id
                              )
                            }

                            className="
                              bg-green-500
                              text-white
                              px-3 py-1
                              rounded-lg
                              text-sm
                            "
                          >

                            Accept

                          </button>

                          <button

                            onClick={() =>
                              rejectDelivery(
                                item._id
                              )
                            }

                            className="
                              bg-red-500
                              text-white
                              px-3 py-1
                              rounded-lg
                              text-sm
                            "
                          >

                            Reject

                          </button>

                        </>

                      )

                    }

                  </div>

                  {

                    item.deliveryStatus !==
                    "Assigned" &&

                    item.deliveryStatus !==
                    "Rejected" && (

                      <div className="flex gap-2 mt-3">

                        <button
                          onClick={() =>
                            updateStatus(
                              item._id,
                              "Picked Up"
                            )
                          }
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Picked
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              item._id,
                              "On The Way"
                            )
                          }
                          className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          On Way
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(
                              item._id,
                              "Delivered"
                            )
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                        >
                          Delivered
                        </button>

                      </div>

                    )

                  }

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Weekly Earnings */}
        <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg">

          <h2 className="text-3xl font-bold mb-6">
            Weekly Earnings 💰
          </h2>

          <div className="grid grid-cols-7 gap-4">

            {[40, 60, 30, 80, 55, 90, 70].map((height, index) => (
              <div key={index} className="flex flex-col items-center">

                <div
                  className="bg-gradient-to-t from-purple-500 to-pink-500 w-12 rounded-t-xl"
                  style={{ height: `${height * 2}px` }}
                />

                <p className="mt-2 text-sm">
                  Day {index + 1}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Live Tracking Map */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold mb-6">
            Live Delivery Tracking 🗺️
          </h2>

          <LiveTrackingMap />
        </div>

      </div>
    </div>
  );
}