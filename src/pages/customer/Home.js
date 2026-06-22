import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

export default function Home({
  cart,
  setCart,
  wishlist,
  setWishlist,
  darkMode,
  setDarkMode
}) {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ADD TO CART
  const addToCart = (product) => {

    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {

      const updatedCart = cart.map((item) =>

        item._id === product._id

          ? {
              ...item,
              quantity: item.quantity + 1
            }

          : item

      );

      setCart(updatedCart);

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

    }

  };

  // ADD TO WISHLIST
  const addToWishlist = (product) => {
    setWishlist([...wishlist, product]);
  };

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/products"
        );

        setProducts(res.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${
        darkMode
          ? "bg-black text-white"
          : "bg-gradient-to-br from-gray-100 to-purple-100"
      }`}
    >

      {/* Navbar */}
      <Navbar
        cart={cart}
        setCart={setCart}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Hero Section */}
      <div className="text-center mt-16">

        <h1 className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Fresh Products from Local Vendors 🌾
        </h1>

        <p className="mt-4 text-lg">
          Support farmers. Buy local. Live healthy.
        </p>

        <button className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full shadow-xl hover:scale-110 transition">
          Explore Now
        </button>

      </div>

      {/* Location */}
      <div className="text-center mt-6">
        <p>
          📍 Delivering to: Bangalore
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-10">

        {["All", "Vegetables", "Fruits", "Dairy", "Grains"].map((cat) => (

          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full shadow-md border transition hover:scale-105 ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                : "bg-white/40 text-gray-700"
            }`}
          >
            {cat}
          </button>

        ))}

      </div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-8 px-6">

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded-xl border w-full md:w-96 shadow-md text-black"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-3 rounded-xl border shadow-md text-black"
        >
          <option value="">Sort By</option>
          <option value="low">Price Low to High</option>
          <option value="high">Price High to Low</option>
        </select>

      </div>

      {/* Products Grid */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
          px-8
          py-10
        "
      >

        {loading ? (

          <h1 className="text-3xl text-center">
            Loading Products...
          </h1>

        ) : (

          products
            .filter((product) =>
              selectedCategory === "All"
                ? true
                : product.category === selectedCategory
            )
            .filter((product) =>
              product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {

              if (sortOption === "low")
                return a.price - b.price;

              if (sortOption === "high")
                return b.price - a.price;

              return 0;

            })
            .map((product) => (

              <ProductCard
                key={product._id}
                product={product}
                addToCart={addToCart}
                addToWishlist={addToWishlist}
              />

            ))

        )}

      </div>

      {/* AI Recommendation Section */}
      <div className="px-10 pb-16">

        <h2 className="text-3xl font-bold mb-6">
          AI Personalized Recommendations 🤖
        </h2>

        <p className="mb-8">
          Based on your shopping behavior
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            {
              name: "Fresh Apples",
              price: 120,
              image:
                "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
            },
            {
              name: "Bread",
              price: 45,
              image:
                "https://images.unsplash.com/photo-1563636619-e9143da7973b",
            },
            {
              name: "Organic Milk",
              price: 60,
              image:
                "https://images.unsplash.com/photo-1550583724-b2692b85b150",
            },
            {
              name: "Farm Eggs",
              price: 90,
              image:
                "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
            },
          ].map((item, index) => (

            <div
              key={index}
              className="bg-white text-black p-6 rounded-2xl shadow-lg hover:shadow-2xl transition"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-xl"
              />

              <h3 className="mt-4 font-bold text-xl">
                {item.name}
              </h3>

              <p>
                ₹{item.price}
              </p>

              <button
                onClick={() => setCart([...cart, item])}
                className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-xl hover:scale-105 transition"
              >
                Add to Cart
              </button>

            </div>

          ))}

        </div>

      </div>

    </motion.div>
  );
}