import React, { useState } from "react";
import "./App.css";

function orderCoffee(size, name, type, cb) {
  fetch(`/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `mutation {
        orderCoffee(size: ${size}, name: "${name}", type: ${type}) {
          id
          name
          type
          size
        }
      }`,
    }),
  })
    .then((res) => res.json())
    .then((res) => cb(res.data))
    .catch(console.error);
}

function App() {
  const [myOrders, setMyOrders] = useState([]);

  function onSubmitOrderForm(order) {
    orderCoffee(order.size, order.name, order.type, ({ orderCoffee }) => {
      setMyOrders([...myOrders, orderCoffee]);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <OrderForm onSubmit={onSubmitOrderForm} />
        <Orders orders={myOrders} />
      </header>
    </div>
  );
}

function OrderForm({ onSubmit }) {
  const [order, setOrder] = useState({
    size: "SMALL",
    type: "FLAT_WHITE",
    name: "",
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(order);
        setOrder({ ...order, name: "" });
      }}
      className="Form"
    >
      <label>
        <span>Size:</span>
        <select
          onChange={({ target }) => setOrder({ ...order, size: target.value })}
        >
          <option value="SMALL" defaultValue>
            Small
          </option>
          <option value="REGULAR">Regular</option>
        </select>
      </label>
      <label>
        <span>Name:</span>
        <input
          value={order.name}
          type="text"
          onChange={({ target }) => setOrder({ ...order, name: target.value })}
        />
      </label>
      <label>
        <span>Type:</span>
        <select
          onChange={({ target }) => setOrder({ ...order, type: target.value })}
        >
          <option value="FLAT_WHITE" defaultValue>
            Flat White
          </option>
          <option value="ESPRESSO">Espresso</option>
        </select>
      </label>
      <input type="submit" disabled={order.name === ""} value="Order Coffee" />
    </form>
  );
}

function Orders({ orders }) {
  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.name} - {order.size.toLowerCase()}{" "}
          {order.type.split("_").join(" ").toLowerCase()}
        </li>
      ))}
    </ul>
  );
}

export default App;
