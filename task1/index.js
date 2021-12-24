// chamgeimg the active color of the links
var navLink = document.querySelectorAll("#nav_link");

function navigateTo(location, event) {
  for (var i = 0; i < navLink.length; i++) {
    navLink[i].classList.remove("active");
  }
  event.target.classList.add("active");
}

// backgorund color to nav bar
window.addEventListener("scroll", () => {
  let y = 1 + (window.scrollY || window.pageYOffset) / 150;
  y = y < 1 ? 1 : y; // ensure y is always >= 1 (due to Safari's elastic scroll)
  if (y > 1.5) {
    document.querySelector(".navigation").style.background = "#fff";
    document.querySelector(".navigation").style.boxShadow =
      "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px";
    // document.querySelector(".navbar-brand").style.color = "#fff";
    // document.querySelector("ul li a").style.color = "#fff";
  } else {
    document.querySelector(".navigation").style.background = "transparent";
    document.querySelector(".navigation").style.boxShadow =
      "0px 0px 0px transparent ";
    // document.querySelector(".navbar-brand").style.color = "#000";
    // document.querySelector("ul li a").style.color = "#000";
  }
});
