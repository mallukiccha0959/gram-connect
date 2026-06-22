import { motion } from "framer-motion";

export default function CartSidebar({ cart, setCart, isOpen, setIsOpen }) {

  const removeItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 right-0 w-80 h-full bg-white z-50 shadow-xl p-5"
      >
        <h2 className="text-xl font-bold mb-4">🛒 Cart</h2>

        {cart.length === 0 ? (
          <p>Empty cart</p>
        ) : (
          <>
            <div className="space-y-3">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between items-center">

                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>

                  <button
                    onClick={() => removeItem(i)}
                    className="text-red-500"
                  >
                    ❌
                  </button>

                </div>
              ))}
            </div>

            <div className="mt-6 font-bold">
              Total: ₹{total}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}