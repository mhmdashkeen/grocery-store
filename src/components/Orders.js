import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../slice/Order";
import ScreenLoader from "./ScreenLoader";

const Orders = () => {
  const orders = useSelector((state) => state.orders);
  const [ordersArray, setOrdersArray] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders())
      .unwrap()
      .then(() => {})
      .catch((e) => {
        console.log("E", e);
      });
  }, []);
  useEffect(() => {
    const { orderLists } = orders;
    if (orderLists) {
      // setOrdersArray(orderLists.orders);
      const allOrders = orderLists.map((o) => o.orders);
      //    console.log("ALL", allOrders.flat());
      setOrdersArray(allOrders.flat());
    }
  }, [orders.orderLists]);
  console.log("ORDERS", orders.orderLists);
  if (orders.orderLists?.length === 0)
    return (
      <div className="container">
        <h3>My Orders</h3>
        <div>No orders</div>
      </div>
    );
  return (
    <>
      <h3>My Orders</h3>
      {orders.loading && <ScreenLoader inline="inline" />}
      {ordersArray.map((order) => (
        <div key={order.id}>
          <div
            style={{
              padding: "10px",
              boxShadow: "1px 1px 7px #d3d3d3",
              marginBottom: "16px",
              borderRadius: "4px"
            }}
          >
            <div style={{ display: "flex" }}>
              {order.thumbnail && (
                <div style={{ marginRight: "10px" }}>
                  <img
                    style={{
                      width: "80px",
                      height: "80px",
                      border: "1px solid #eee",
                      borderRadius: "2px"
                    }}
                    src={order.thumbnail}
                  />
                </div>
              )}
              <div>
                <div>
                  <b>{order.name}</b>
                </div>
                <div>Price: ${order.price}</div>
              </div>
            </div>
            <div>
              <div>Quantity: {order.quantity}</div>
              <div>Total: ${order.quantity * order.price}</div>
              <Link
                to={`/products/${order.id}`}
                state={{ product: order }}
                style={{ width: "100%" }}
                className="btn btn-primary  mt-3"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Orders;
