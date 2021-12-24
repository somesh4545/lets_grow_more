import React from "react";

import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

export default function Navigation(props) {
  const styles = {
    navigation_bar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 100px",
      backgroundColor: "#000",
      backdropFilter: " blur(25px) saturate(185%)",
      backgroundColor: " rgba(255, 255, 255, 0.48)",
      //   borderRadius: " 12px",
      border: "1px solid rgba(255, 255, 255, 0.125)",
    },
    navigation_title: {
      color: "#fff",
      fontSize: 20,
    },
    navigation_button: {
      border: "none",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100px",
      height: "35px",
      borderRadius: "5px",
      fontWeight: "bold",
      fontSize: 15,
      color: "#000",
      backgroundColor: "#fff",
      boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
    },
  };
  return (
    <div style={styles.navigation_bar} data-aos="fade-down">
      <h4 style={styles.navigation_title}>Admin</h4>
      <button style={styles.navigation_button} onClick={() => props.getUsers()}>
        Get users
      </button>
    </div>
  );
}
