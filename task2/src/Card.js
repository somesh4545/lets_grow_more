import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

export default function Card(props) {
  const styles = {
    card: {
      width: "280px",
      height: "220px",
      display: "flex",
      margin: "20px",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backdropFilter: " blur(25px) saturate(185%)",
      backgroundColor: " rgba(255, 255, 255, 0.48)",
      borderRadius: " 12px",
      border: "1px solid rgba(255, 255, 255, 0.125)",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    img: {
      width: "100px",
      height: "100px",
      borderRadius: "300px",
      boxShadow:
        "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
    },
    name: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: "22px",
      margin: "10px 0px",
    },
    email: {
      color: "#fff",
      fontWeight: "400",
      fontSize: "18px",
      margin: "0px !important",
    },
  };
  return (
    <div style={styles.card} data-aos="zoom-in">
      <img style={styles.img} src={props.avatar} />
      <h4 style={styles.name}>
        {props.first_name} {props.last_name}
      </h4>
      <h4 style={styles.email}>{props.email}</h4>
    </div>
  );
}
