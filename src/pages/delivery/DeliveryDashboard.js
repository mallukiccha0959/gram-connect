import { useEffect, useState } from "react";

import axios from "axios";

export default function DeliveryDashboard() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);



  const fetchOrders = async () => {

    try {

      const token = JSON.parse(
        localStorage.getItem("userInfo")
      )?.token;



      const res = await axios.get(

        "http://localhost:5000/api/orders/vendor/orders",

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );



      const deliveryOrders = res.data.filter(

        (order) => order.status === "Out for Delivery"

      );



      setOrders(deliveryOrders);

    }

    catch (error) {

      console.log(error);

    }

  };



  const markDelivered = async (id) => {

    try {

      const token = JSON.parse(
        localStorage.getItem("userInfo")
      )?.token;



      await axios.put(

        `http://localhost:5000/api/orders/${id}`,

        {

          status: "Delivered",

        },

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );



      alert("Order Delivered ✅");



      fetchOrders();

    }

    catch (error) {

      console.log(error);

    }

  };



  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">

        Delivery Dashboard 🚚

      </h1>



      <div className="space-y-8">

        {orders.map((order) => (

          <div

            key={order._id}

            className="bg-white p-8 rounded-3xl shadow-lg"

          >

            {/* Customer */}

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold">

                  Customer

                </h2>

                <p className="text-gray-600">

                  {order.customer?.name}

                </p>

              </div>



              <div>

                <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-bold">

                  {order.status}

                </span>

              </div>

            </div>



            {/* Products */}

            <div className="mt-8 space-y-5">

              {order.products.map((item) => (

                <div

                  key={item._id}

                  className="flex justify-between items-center border-b pb-4"

                >

                  <div className="flex items-center gap-5">

                    <img

                      src={item.product.image}

                      alt={item.product.name}

                      className="w-24 h-24 rounded-xl object-cover"

                    />



                    <div>

                      <h2 className="text-xl font-bold">

                        {item.product.name}

                      </h2>



                      <p>

                        Quantity: {item.quantity}

                      </p>

                    </div>

                  </div>



                  <h2 className="text-2xl font-bold">

                    ₹ {item.product.price}

                  </h2>

                </div>

              ))}

            </div>



            {/* Address */}

            <div className="mt-6">

              <h2 className="font-bold text-xl">

                Delivery Address

              </h2>

              <p className="text-gray-600">

                {order.shippingAddress}

              </p>

            </div>



            {/* Deliver Button */}

            <button

              onClick={() => markDelivered(order._id)}

              className="mt-8 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"

            >

              Mark Delivered

            </button>

          </div>

        ))}

      </div>

    </div>

  );

}