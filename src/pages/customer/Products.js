import React, { useEffect, useState } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://gram-connect-ten.vercel.app/api/products");

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>All Products 🛒</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <img
              src={product.image}
              alt=""
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />

            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h3>₹ {product.price}</h3>

            <p>Category: {product.category}</p>

            <p>Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;