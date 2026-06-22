import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({
  product,
  addToCart,
  addToWishlist
}) {

  const navigate = useNavigate();

  return (

    <motion.div
      onClick={() => navigate(`/product/${product._id}`)}
      whileHover={{
        y: -8,
        scale: 1.02
      }}
      transition={{ duration: 0.2 }}
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-md
        hover:shadow-2xl
        transition
        duration-300
        border
        border-gray-100
        cursor-pointer
      "
    >

      {/* Product Image */}
      <div className="relative">

        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-64
            object-cover
          "
        />

        {/* Category Badge */}
        <div
          className="
            absolute
            top-3
            left-3
            bg-white/90
            backdrop-blur-md
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
            text-purple-600
            shadow
          "
        >
          {product.category}
        </div>

      </div>

      {/* Product Details */}
      <div className="p-5">

        {/* Product Name */}
        <h2
          className="
            text-2xl
            font-bold
            text-gray-800
            line-clamp-1
          "
        >
          {product.name}
        </h2>

        {/* Description */}
        <p
          className="
            text-gray-500
            mt-2
            text-sm
            line-clamp-2
            min-h-[40px]
          "
        >
          {product.description}
        </p>

        {/* Price + Stock */}
        <div className="mt-4 flex justify-between items-center">

          <div>

            <h3
              className="
                text-3xl
                font-extrabold
                text-black
              "
            >
              ₹ {product.price}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Stock: {product.stock}
            </p>

          </div>

          <div
            className="
              bg-green-100
              text-green-700
              px-3
              py-1
              rounded-full
              text-sm
              font-semibold
            "
          >
            In Stock
          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">

          {/* Add To Cart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="
              flex-1
              bg-black
              hover:bg-gray-900
              text-white
              py-3
              rounded-2xl
              font-semibold
              transition
            "
          >
            Add to Cart
          </button>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToWishlist(product);
            }}
            className="
              w-14
              flex
              items-center
              justify-center
              rounded-2xl
              bg-pink-500
              hover:bg-pink-600
              text-white
              transition
            "
          >
            <Heart size={22} />
          </button>

        </div>

      </div>

    </motion.div>

  );

}