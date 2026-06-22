import { useEffect, useState } from "react";

import axios from "axios";

export default function VendorOrders() {

  const [orders, setOrders] = useState([]);

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

        `http://localhost:5000/api/orders/${id}`,

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

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">

        Vendor Orders 📦

      </h1>


      <div className="space-y-8">

        {orders.map((order) => (

          <div
            key={order._id}
            className="bg-white p-8 rounded-3xl shadow-lg"
          >

            <h3 className="text-2xl font-bold mb-5">

              Customer: {order.user?.name}

            </h3>


            {(order.orderItems || []).map((item) => (

              <div
                key={item._id}
                className="border-b pb-4 mb-4"
              >

                <p className="text-xl font-bold">

                  {item.name}

                </p>

                <p>

                  Qty: {item.quantity}

                </p>

                <p className="text-lg font-semibold">

                  ₹ {item.price}

                </p>

              </div>

            ))}


            <p className="mt-5 text-lg font-bold">

              Status: {order.status}

            </p>


            {/* Status Buttons */}

            <div className="mt-8 flex flex-wrap gap-4">

              <button

                onClick={() =>
                  updateStatus(order._id, "Packed")
                }

                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition"

              >

                Packed

              </button>


              <button

                onClick={() =>
                  updateStatus(order._id, "Out for Delivery")
                }

                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition"

              >

                Out for Delivery

              </button>


              <button

                onClick={() =>
                  updateStatus(order._id, "Delivered")
                }

                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition"

              >

                Delivered

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}