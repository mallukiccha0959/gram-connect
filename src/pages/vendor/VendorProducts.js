import React, { useEffect, useState } from "react";
import axios from "axios";

function VendorProducts() {

  const [products, setProducts] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
  fetchVendorProducts();
}, [fetchVendorProducts]);

  const fetchVendorProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/products/vendor",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Product Deleted");

      fetchVendorProducts();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Products 📦
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (

          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg p-5"
          >

            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded-xl"
            />

            <h2 className="text-2xl font-bold mt-4">
              {product.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {product.description}
            </p>

            <p className="font-bold mt-2">
              ₹ {product.price}
            </p>

            <p>
              Category: {product.category}
            </p>

            <p>
              Stock: {product.stock}
            </p>

            <div className="flex gap-3 mt-5">

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default VendorProducts;