import Navbar from "../../components/Navbar";

export default function Wishlist({
  wishlist,
  setWishlist,
  cart,
  setCart,
  darkMode,
  setDarkMode
}) {
  const removeFromWishlist = (index) => {
    const updated = wishlist.filter((_, i) => i !== index);
    setWishlist(updated);
  };

  const moveToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-black text-white"
          : "bg-gradient-to-br from-gray-100 to-purple-100"
      }`}
    >
      {/* Navbar */}
      <Navbar
        cart={cart}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="max-w-5xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-8">
          My Wishlist ❤️
        </h1>

        {wishlist.length === 0 ? (
          <h2 className={darkMode ? "text-gray-300" : "text-gray-500"}>
            No wishlist items yet
          </h2>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl shadow-lg ${
                  darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-white"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-xl"
                />

                <h2 className="text-xl font-bold mt-4">
                  {item.name}
                </h2>

                <p className={darkMode ? "text-gray-300" : "text-gray-500"}>
                  ₹{item.price}
                </p>

                <button
                  onClick={() => moveToCart(item)}
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition"
                >
                  Move to Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(index)}
                  className="mt-2 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}