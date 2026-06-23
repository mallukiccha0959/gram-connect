import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Checkout({ cart, setCart }) {

  const navigate = useNavigate();

  const [address, setAddress] = useState("");

  const total = cart.reduce(

    (acc, item) => acc + item.price * item.quantity,

    0

  );


  const placeOrder = async () => {

    try {

      // CREATE PAYMENT ORDER

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(

        "https://gram-connect-ten.vercel.app/api/orders/create-payment-order",

        {
          amount: total,
        },

        config

      );

      // RAZORPAY OPTIONS

      const options = {

        key:
          "rzp_test_SrucnuSWMcxhk5",

        amount: data.amount,

        currency: data.currency,

        name: "Gram Connect",

        description:
          "Order Payment",

        order_id: data.id,

        handler: async function (
          response
        ) {

          try {

            console.log(response);

            // DEBUG
            console.log(cart);

            await axios.post(

              "https://gram-connect-ten.vercel.app/api/orders",

              {

                items: cart.map((item) => ({
                  product: item._id,

                  name: item.name,

                  image: item.image,

                  price: item.price,

                  quantity: item.quantity,
                })),

                shippingAddress: address,

                totalPrice: total,

              },

              {

                headers: {

                  Authorization: `Bearer ${userInfo.token}`,

                },

              }

            );

            alert(
              "Payment Successful 🚀"
            );

            setCart([]);

            navigate("/tracking");

          }

          catch (error) {

            console.log(error);

            alert("Failed to place order");

          }

        },

        prefill: {

          name: "Test User",

          email:
            "test@test.com",

          contact:
            "9999999999",

        },

        method: {

          upi: true,
          card: true,
          netbanking: true,
          wallet: true,

        },

        theme: {
          color: "#6366f1",
        },

      };

      // OPEN PAYMENT POPUP

      const razor = new window.Razorpay(
        options
      );

      razor.open();

    }

    catch (error) {

      console.log(error);

      alert("Failed to initiate payment");

    }

  };

  // DEMO PAYMENT
  const demoPayment = async () => {

    try {

      const userInfo = JSON.parse(

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

      // SAVE ORDER

      await axios.post(

        "https://gram-connect-ten.vercel.app/api/orders",

        {

          items: cart.map((item) => ({
            product: item._id,

            name: item.name,

            image: item.image,

            price: item.price,

            quantity: item.quantity,
          })),

          shippingAddress: address,

          totalPrice: total,

        },

        config

      );

      // CLEAR CART

      localStorage.removeItem(
        "cartItems"
      );

      alert(
        "Demo Payment Successful"
      );

      navigate("/my-orders");

    } catch (error) {

      console.log(error);

      alert(
        "Demo Payment Failed"
      );

    }

  };


  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold mb-8">

          Checkout 🛒

        </h1>


        {/* Products */}

        <div className="space-y-5">

          {cart.map((item) => (

            <div

              key={item._id}

              className="flex justify-between items-center border-b pb-4"

            >

              <div>

                <h2 className="text-xl font-bold">

                  {item.name}

                </h2>

                <p>

                  Quantity: {item.quantity}

                </p>

              </div>


              <h2 className="text-2xl font-bold">

                ₹ {item.price * item.quantity}

              </h2>

            </div>

          ))}

        </div>


        {/* Address */}

        <div className="mt-8">

          <h2 className="text-2xl font-bold mb-3">

            Shipping Address

          </h2>


          <textarea

            value={address}

            onChange={(e) => setAddress(e.target.value)}

            placeholder="Enter delivery address"

            className="w-full h-32 p-4 border rounded-2xl outline-none"

          />

        </div>


        {/* Total */}

        <div className="mt-8 flex justify-between items-center">

          <h1 className="text-3xl font-bold">

            Total:

          </h1>


          <h1 className="text-4xl font-bold text-purple-600">

            ₹ {total}

          </h1>

        </div>


        {/* Button */}

        <button

          onClick={placeOrder}

          className="w-full mt-8 bg-black text-white py-4 rounded-2xl text-xl font-bold hover:bg-gray-800 transition"

        >

          Place Order

        </button>

        <button

          onClick={demoPayment}

          className="
            w-full
            bg-green-600
            text-white
            py-3
            rounded-xl
            mt-4
            font-bold
          "

        >

          Demo Payment Success

        </button>

      </div>

    </div>

  );

}