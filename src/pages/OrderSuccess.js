import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-white">

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-white p-10 rounded-3xl shadow-xl text-center"
      >
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Your order has been sent to nearby vendors.
        </p>

        <button
          onClick={() => navigate("/tracking")}
          className="bg-purple-600 text-white px-6 py-3 rounded-xl"
        >
          Track Order
        </button>
      </motion.div>

    </div>
  );
}