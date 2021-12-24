// import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";

import preloader from "./assets/Infinity-1s-200px.gif";
import Navigation from "./Navigation";
import Card from "./Card";

function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const getUsers = () => {
    setData([]);
    setLoading(true);
    setTimeout(() => {
      fetch("https://reqres.in/api/users?page=1")
        .then((res) => res.json())
        .then((result) => {
          setData(result.data);
          console.log(result.data);
          setLoading(false);
        });
    }, 3000);
  };
  return (
    <div className="App">
      <div className="container">
        <Navigation getUsers={getUsers} />

        {loading == true ? (
          <div className="loading">
            <img src={preloader} />
          </div>
        ) : null}
        <div className="main">
          {data.map((item, index) => {
            return (
              <Card
                key={index}
                first_name={item.first_name}
                last_name={item.last_name}
                avatar={item.avatar}
                email={item.email}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
