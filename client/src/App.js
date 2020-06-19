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
  const [order, setOrder] = useState({
    size: "SMALL",
    type: "FLAT_WHITE",
    name: "",
  });

  function onSubmitOrderForm(e) {
    e.preventDefault();

    orderCoffee(order.size, order.name, order.type, ({ orderCoffee }) => {
      setMyOrders([...myOrders, orderCoffee]);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmitOrderForm}>
          <label>
            Size:
            <select
              onChange={({ target }) =>
                setOrder({ ...order, size: target.value })
              }
            >
              <option value="SMALL" defaultValue>
                Small
              </option>
              <option value="REGULAR">Regular</option>
            </select>
          </label>
          <label>
            Name:{" "}
            <input
              type="text"
              onChange={({ target }) =>
                setOrder({ ...order, name: target.value })
              }
            />
          </label>
          <label>
            <select
              onChange={({ target }) =>
                setOrder({ ...order, type: target.value })
              }
            >
              Type:
              <option value="FLAT_WHITE" defaultValue>
                Flat White
              </option>
              <option value="ESPRESSO">Espresso</option>
            </select>
          </label>
          <input type="submit" value="Order Coffee" />
        </form>
        <ul>
          {myOrders.map((order) => (
            <li id={order.id}>
              {order.name} - {order.size.toLowerCase()}{" "}
              {order.type.split("_").join(" ").toLowerCase()}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
