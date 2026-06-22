import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function CartPage({
  cart,
  setCart,
  darkMode,
  setDarkMode
}) {

  const navigate = useNavigate();

  // INCREASE QTY
  const increaseQty = (id) => {

    const updatedCart = cart.map((item) =>

      item._id === id

        ? {
            ...item,
            quantity: (item.quantity || 1) + 1
          }

        : item

    );

    setCart(updatedCart);

  };

  // DECREASE QTY
  const decreaseQty = (id) => {

    const updatedCart = cart.map((item) =>

      item._id === id

        ? {
            ...item,
            quantity:
              (item.quantity || 1) > 1
                ? (item.quantity || 1) - 1
                : 1
          }

        : item

    );

    setCart(updatedCart);

  };

  // REMOVE ITEM
  const removeItem = (id) => {

    const updatedCart = cart.filter(
      (item) => item._id !== id
    );

    setCart(updatedCart);

  };

  // TOTAL
  const subtotal = cart.reduce(
    (acc, item) =>
      acc + item.price * (item.quantity || 1),
    0
  );

  const delivery = subtotal > 1000 ? 0 : 50;

  const total = subtotal + delivery;

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

      <Navbar
        cart={cart}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-5xl font-bold mb-10">
          Shopping Cart 🛒
        </h1>

        {cart.length === 0 ? (

          <div
            className="
              bg-white
              rounded-3xl
              p-20
              text-center
              shadow-xl
            "
          >

            <h2 className="text-4xl font-bold">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-4">
              Add products to continue shopping
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-10">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {cart.map((item) => (

                <div
                  key={item._id}
                  className="
                    bg-white
                    rounded-3xl
                    p-5
                    shadow-md
                    flex
                    gap-5
                  "
                >

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-40
                      h-40
                      object-cover
                      rounded-2xl
                    "
                  />

                  {/* DETAILS */}
                  <div className="flex-1">

                    <h2 className="text-3xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      {item.description}
                    </p>

                    <h3 className="text-4xl font-bold mt-4">
                      ₹ {item.price}
                    </h3>

                    {/* QUANTITY */}
                    <div className="flex items-center gap-4 mt-5">

                      <button
                        onClick={() =>
                          decreaseQty(item._id)
                        }
                        className="
                          bg-gray-200
                          px-4
                          py-2
                          rounded-xl
                          text-xl
                        "
                      >
                        -
                      </button>

                      <span className="text-2xl font-bold">
                        {item.quantity || 1}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item._id)
                        }
                        className="
                          bg-gray-200
                          px-4
                          py-2
                          rounded-xl
                          text-xl
                        "
                      >
                        +
                      </button>

                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() =>
                        removeItem(item._id)
                      }
                      className="
                        mt-5
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        px-6
                        py-2
                        rounded-xl
                        transition
                      "
                    >
                      Remove
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* RIGHT SUMMARY */}
            <div
              className="
                bg-white
                rounded-3xl
                shadow-xl
                p-8
                h-fit
              "
            >

              <h2 className="text-3xl font-bold mb-8">
                Order Summary
              </h2>

              <div className="space-y-5 text-lg">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹ {subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {delivery === 0
                      ? "FREE"
                      : `₹ ${delivery}`}
                  </span>
                </div>

                <div className="border-t pt-5 flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span>₹ {total}</span>
                </div>

              </div>

              <button

                onClick={() => {

                  console.log("Checkout clicked");

                  navigate("/checkout");

                }}

                className="
                  w-full
                  mt-10
                  bg-black
                  hover:bg-gray-900
                  text-white
                  py-4
                  rounded-2xl
                  text-xl
                  font-semibold
                  transition
                "
              >

                Proceed to Checkout

              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}