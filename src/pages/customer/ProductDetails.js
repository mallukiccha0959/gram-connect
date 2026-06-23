import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/Navbar";

export default function ProductDetails({
  cart,
  setCart,
  wishlist,
  setWishlist,
  darkMode,
  setDarkMode
}) {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const res = await axios.get(
          `https://gram-connect-ten.vercel.app/api/products/${id}`
        );

        setProduct(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchData();

  }, [id]);

  // ADD TO CART
  const addToCart = () => {

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

    alert("Added to cart 🛒");

  };

  // WISHLIST
  const addToWishlist = () => {

    setWishlist([...wishlist, product]);

    alert("Added to wishlist ❤️");

  };

  if (!product) {

    return (
      <h1 className="text-center mt-20 text-3xl">
        Loading...
      </h1>
    );

  }

  return (

    <div
      className={`
        min-h-screen
        ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-black"
        }
      `}
    >

      {/* Navbar */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Section */}
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-10
          grid
          md:grid-cols-2
          gap-10
        "
      >

        {/* LEFT IMAGE */}
        <div
          className="
            bg-white
            rounded-3xl
            p-5
            shadow-xl
          "
        >

          <img
            src={product.image}
            alt={product.name}
            className="
              w-full
              h-[500px]
              object-cover
              rounded-2xl
            "
          />

        </div>

        {/* RIGHT DETAILS */}
        <div>

          {/* Category */}
          <span
            className="
              bg-purple-100
              text-purple-600
              px-4
              py-2
              rounded-full
              text-sm
              font-semibold
            "
          >
            {product.category}
          </span>

          {/* Name */}
          <h1
            className="
              text-5xl
              font-bold
              mt-5
            "
          >
            {product.name}
          </h1>

          {/* Description */}
          <p
            className="
              text-gray-500
              mt-6
              text-lg
              leading-relaxed
            "
          >
            {product.description}
          </p>

          {/* Price */}
          <h2
            className="
              text-6xl
              font-extrabold
              mt-8
            "
          >
            ₹ {product.price}
          </h2>

          {/* Stock */}
          <p
            className="
              mt-4
              text-lg
              text-green-600
              font-semibold
            "
          >
            In Stock : {product.stock}
          </p>

          {/* Buttons */}
          <div className="flex gap-5 mt-10">

            <button
              onClick={addToCart}
              className="
                bg-black
                text-white
                px-10
                py-4
                rounded-2xl
                text-lg
                font-semibold
                hover:bg-gray-800
                transition
              "
            >
              Add to Cart
            </button>

            <button
              onClick={addToWishlist}
              className="
                bg-pink-500
                text-white
                px-10
                py-4
                rounded-2xl
                text-lg
                font-semibold
                hover:bg-pink-600
                transition
              "
            >
              Wishlist
            </button>

          </div>

          {/* Vendor Info */}
          <div
            className="
              mt-10
              bg-white
              rounded-2xl
              p-5
              shadow-md
            "
          >

            <h3 className="text-2xl font-bold">
              Vendor Information
            </h3>

            <p className="mt-3 text-gray-600">
              Sold by GramConnect Verified Vendor
            </p>

            <p className="text-green-600 font-semibold mt-2">
              Trusted Seller ✅
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}