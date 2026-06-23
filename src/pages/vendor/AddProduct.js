import React, { useState } from "react";
import axios from "axios";

function AddProduct() {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const res = await axios.post(
                "https://gram-connect-ten.vercel.app/api/products/add",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Product Added Successfully 🚀");

            console.log(res.data);

        } catch (error) {
            console.log(error);

            alert("Failed to add product");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(to right, #0f172a, #1e3a8a)",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    width: "400px",
                    background: "#1e293b",
                    padding: "40px",
                    borderRadius: "20px",
                    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
                }}
            >

                <h1
                    style={{
                        color: "white",
                        textAlign: "center",
                        marginBottom: "30px",
                    }}
                >
                    Add Product 📦
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    onChange={handleChange}
                    style={inputStyle}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "15px",
                        border: "none",
                        borderRadius: "10px",
                        background:
                            "linear-gradient(to right, #9333ea, #ec4899)",
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                >
                    Add Product
                </button>

            </form>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    backgroundColor: "#f8fafc",
    color: "#111",
};

export default AddProduct;