import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function OrderTracking({ cart }) {
  const steps = [
    "Order Confirmed",
    "Packed",
    "Out for Delivery",
    "Delivered"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-purple-100">
      <Navbar cart={cart} />

      <div className="max-w-4xl mx-auto p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Track Your Order 🚚
        </h1>

        <p className="text-gray-600 mb-10">
          Your fresh groceries are on the way!
        </p>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.4 }}
              className={`p-5 rounded-xl shadow-lg ${
                index < 2
                  ? "bg-green-500 text-white"
                  : "bg-white"
              }`}
            >
              {step}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-2">
            Delivery Partner
          </h2>

          <p>Rahul Kumar 🚴</p>
          <p>Arriving in 15 mins</p>
        </div>
      </div>
    </div>
  );
}