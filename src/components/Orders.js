import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../slice/Order";
import ScreenLoader from "./ScreenLoader";
import { Day } from "../utils/helper";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
        <Link
          to={`/products/${order.id}`}
          state={{ product: order }}
          style={{ display: "block", color: "inherit", textDecoration: "none" }}
        >
          <div
            key={order.id}
            className="listing--container listing--container-cart"
          >
            <div style={{ display: "flex" }}>
              {order.thumbnail && (
                <LazyLoadImage
                  className="listing-card-image"
                  src={order.thumbnail}
                />
              )}
              <div>
                <div className="listing--name">{order.name}</div>
                <span
                  className="listing--price--discount"
                  style={{ marginLeft: "0" }}
                >
                  Arriving {new Date().getHours() < 20 ? "today" : "tomorrow"}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Orders;
