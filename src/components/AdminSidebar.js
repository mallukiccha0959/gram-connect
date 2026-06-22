import { FaUsers, FaStore, FaBox, FaChartLine, FaCog } from "react-icons/fa";

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white fixed left-0 top-0 p-6">
      <h1 className="text-2xl font-bold mb-10 text-purple-400">
        Admin Panel
      </h1>

      <div className="space-y-6">
        <div className="flex items-center gap-3 cursor-pointer hover:text-purple-400">
          <FaUsers /> Users
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-purple-400">
          <FaStore /> Vendors
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-purple-400">
          <FaBox /> Orders
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-purple-400">
          <FaChartLine /> Analytics
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-purple-400">
          <FaCog /> Settings
        </div>
      </div>
    </div>
  );
}