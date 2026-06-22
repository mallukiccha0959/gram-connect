export default function AIInsights() {
  const insights = [
    {
      title: "Tomato Demand Surge 🍅",
      desc: "Tomato sales increased by 32% in Bangalore this week.",
      color: "bg-red-100 text-red-700"
    },
    {
      title: "Delivery Delay Alert 🚚",
      desc: "High delivery traffic detected in Hyderabad zone.",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      title: "Vendor Performance 📈",
      desc: "FreshFarm Vendor achieved 98% customer satisfaction.",
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Revenue Forecast 💰",
      desc: "Expected platform revenue growth: +18% next month.",
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Fraud Detection ⚠",
      desc: "Suspicious bulk order activity detected from 3 accounts.",
      color: "bg-orange-100 text-orange-700"
    },
    {
      title: "Peak Shopping Time ⏰",
      desc: "Most orders are placed between 7 PM - 9 PM.",
      color: "bg-blue-100 text-blue-700"
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">
      <h2 className="text-3xl font-bold mb-6">
        AI Business Insights 🤖
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {insights.map((item, index) => (
          <div
            key={index}
            className={`${item.color} p-5 rounded-2xl shadow-md`}
          >
            <h3 className="text-xl font-bold mb-2">
              {item.title}
            </h3>

            <p className="text-sm">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}