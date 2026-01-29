import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Header } from "../../components/Header";
import "./OrderPage.css";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error canceling order:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                    <button
                      className="cancel-order-button button-secondary"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    return (
                      <Fragment key={orderProduct.product.id}>
                        <div className="product-image-container">
                          <img src={orderProduct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                              "MMMM D",
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="images/icons/buy-again.png"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <a href="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </a>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
