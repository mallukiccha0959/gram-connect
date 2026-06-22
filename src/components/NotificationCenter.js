import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      type: "order",
      title: "New Order Received",
      desc: "Rahul placed an order for Tomatoes",
      time: "2 min ago",
      unread: true
    },
    {
      type: "delivery",
      title: "Delivery Delayed",
      desc: "Traffic detected in Bangalore zone",
      time: "10 min ago",
      unread: true
    },
    {
      type: "payment",
      title: "Payment Successful",
      desc: "₹2,450 credited successfully",
      time: "30 min ago",
      unread: false
    },
    {
      type: "vendor",
      title: "Vendor Approval Pending",
      desc: "Organic Farms awaiting approval",
      time: "1 hour ago",
      unread: false
    }
  ];

  return (
    <div className="relative">

      {/* Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative text-2xl"
      >
        🔔

        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          2
        </span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-0 mt-4 w-[400px] bg-white rounded-3xl shadow-2xl overflow-hidden z-50"
          >

            {/* Header */}
            <div className="p-5 border-b">
              <h2 className="text-2xl font-bold">
                Notifications
              </h2>
            </div>

            {/* Notifications List */}
            <div className="max-h-[500px] overflow-y-auto">

              {notifications.map((item, index) => (
                <div
                  key={index}
                  className={`p-5 border-b hover:bg-gray-50 transition cursor-pointer ${
                    item.unread
                      ? "bg-purple-50"
                      : "bg-white"
                  }`}
                >

                  <div className="flex justify-between items-start">

                    <div>
                      <h3 className="font-bold text-lg">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-sm mt-1">
                        {item.desc}
                      </p>
                    </div>

                    {item.unread && (
                      <div className="w-3 h-3 bg-purple-600 rounded-full mt-2" />
                    )}

                  </div>

                  <p className="text-xs text-gray-400 mt-3">
                    {item.time}
                  </p>

                </div>
              ))}

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}