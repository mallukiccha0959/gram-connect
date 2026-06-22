import { useEffect, useState } from "react";

import axios from "axios";

export default function MyOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);


  const fetchOrders = async () => {

    try {

      const userInfo = JSON.parse(
        localStorage.getItem("userInfo")
      );

      // DEBUG
      console.log(userInfo);

      const token = JSON.parse(
        localStorage.getItem("user")
      )?.token || userInfo?.token;

      const { data } = await axios.get(

        "http://localhost:5000/api/orders/my-orders",

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      setOrders(data);

      // DEBUG
      console.log(data);

    }

    catch (error) {

      console.log(error);

    }

  };


  return (

    <div
      style={{
        padding: "40px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >

      <h1
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          marginBottom: "40px",
        }}
      >
        My Orders 📦
      </h1>

      {orders.map((order) => (

        <div
          key={order._id}
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            marginBottom: "30px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >

          {(order.items || []).map((item) => (

            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "20px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "15px",
              }}
            >

              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />

              <div>

                <h3>{item.name}</h3>

                <p>
                  Quantity: {item.quantity}
                </p>

                <p
                  style={{
                    color: "#7c3aed",
                    fontWeight: "bold",
                  }}
                >
                  ₹ {item.price}
                </p>

              </div>

            </div>

          ))}

          <h3>
            Total: ₹ {order.totalPrice}
          </h3>

          <p
            style={{
              marginTop: "10px",
            }}
          >
            Address: {order.shippingAddress}
          </p>


          {/* ORDER TIMELINE */}
          <div className="mt-4">

            <h4 className="mb-4">
              Order Timeline
            </h4>

            <div className="position-relative d-flex justify-content-between align-items-center">

              {/* LINE */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "10%",
                  right: "10%",
                  height: "4px",
                  background: "#ddd",
                  zIndex: 0,
                }}
              />

              {/* ACTIVE PROGRESS LINE */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "10%",
                  height: "4px",
                  background: "green",
                  zIndex: 1,
                  transition: "0.5s",

                  width:
                    order.status === "Pending"
                      ? "0%"
                      : order.status === "Processing"
                      ? "30%"
                      : order.status === "Shipped"
                      ? "65%"
                      : "100%",
                }}
              />

              {/* PLACED */}
              <div className="text-center flex-fill position-relative">

                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: "green",
                    color: "white",
                    margin: "auto",
                    lineHeight: "45px",
                    fontWeight: "bold",
                    zIndex: 2,
                    position: "relative",
                  }}
                >
                  ✓
                </div>

                <p className="mt-2 fw-bold">
                  Placed
                </p>

              </div>

              {/* PROCESSING */}
              <div className="text-center flex-fill position-relative">

                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background:
                      ["Processing", "Shipped", "Delivered"].includes(order.status)
                        ? "green"
                        : "#ccc",
                    color: "white",
                    margin: "auto",
                    lineHeight: "45px",
                    fontWeight: "bold",
                    zIndex: 2,
                    position: "relative",
                  }}
                >
                  ✓
                </div>

                <p className="mt-2 fw-bold">
                  Processing
                </p>

              </div>

              {/* SHIPPED */}
              <div className="text-center flex-fill position-relative">

                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background:
                      ["Shipped", "Delivered"].includes(order.status)
                        ? "green"
                        : "#ccc",
                    color: "white",
                    margin: "auto",
                    lineHeight: "45px",
                    fontWeight: "bold",
                    zIndex: 2,
                    position: "relative",
                  }}
                >
                  ✓
                </div>

                <p className="mt-2 fw-bold">
                  Shipped
                </p>

              </div>

              {/* DELIVERED */}
              <div className="text-center flex-fill position-relative">

                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background:
                      order.status === "Delivered"
                        ? "green"
                        : "#ccc",
                    color: "white",
                    margin: "auto",
                    lineHeight: "45px",
                    fontWeight: "bold",
                    zIndex: 2,
                    position: "relative",
                  }}
                >
                  ✓
                </div>

                <p className="mt-2 fw-bold">
                  Delivered
                </p>

              </div>

            </div>

          </div>


          <button
            onClick={() =>
              alert(`Your order status is: ${order.status}`)
            }
            style={{
              marginTop: "20px",
              background: "black",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Track Order
          </button>

        </div>

      ))}

    </div>

  );

}