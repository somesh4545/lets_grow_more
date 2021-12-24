// getting the hamburger menu
let menuBtn = document.getElementById("menu");
let sidebar = document.querySelector(".sidebar");

menuBtn.onclick = () => {
  sidebar.classList.toggle("active");
};

var navLink = document.querySelectorAll(".nav_list li");
var components = document.querySelectorAll("#component");

function display(location) {
  for (var i = 0; i < navLink.length - 1; i++) {
    navLink[i].classList.remove("active_link");
    components[i].style.display = "none";
    if (i == location) {
      navLink[i].classList.add("active_link");
      components[i].style.display = "block";
    }
  }
  if (location == 1) {
    getCureentYearResult();
  }
  if (location == 2) {
    getCourses();
  }
}

display(1);

// function to get information about current user login
function getUserDetails() {
  // console.log("getUserDetails");
  let user_box = document.querySelector(".d_user_box");
  $.ajax({
    type: "POST",
    url: "../backend/student.php",
    data: "get_user_details",
  }).done((data) => {
    data = JSON.parse(data);
    // console.log(data);
    user_box.innerHTML = `<img
              src=${data.img_url}
              class="d_user_img"
              alt=""
            />
            <div class="d_user_info">
              <div class="d_user_name">${data.name}</div>
              <div class="d_user_email">
                <i class="fas fa-envelope"></i> ${data.email}
              </div>
              <div class="d_user_phone">
                <i class="fas fa-phone-alt"></i> ${data.phone_no}
              </div>
            </div>`;
  });
}

// function to get the events of the clg
function getEvents() {
  let d_events_container = document.querySelector(".d_events_container");
  d_events_container.innerHTML = "";
  $.ajax({
    type: "GET",
    url: "../backend/student.php",
    data: "events",
  }).done((data) => {
    data = JSON.parse(data);
    data.forEach((item) => {
      let card = document.createElement("div");
      card.className = "d_events_card";
      card.innerHTML = `<div class="d_e_card_left">
              <img
                class="d_e_img"
                src=${item.img_url}
                alt=""
              />
              <div class="d_e_info">
                <span class="d_e_card_title"
                  >${item.title}</span>
                <span class="d_e_card_count"
                  >${item.count} students attending</span
                >
              </div>
            </div>
            <div class="">
              <span class="d_e_time">${item.date}</span>
            </div>`;
      d_events_container.appendChild(card);
    });
  });
}

// function to get year result of the student

function getCureentYearResult() {
  let r_name = document.getElementById("r_name");
  let r_semester = document.getElementById("r_semester");
  let result_current_year_list = document.getElementById(
    "result_current_year_list"
  );
  $.ajax({
    type: "GET",
    url: "../backend/student.php",
    data: { getCureentYearResult: true },
  }).done((res) => {
    res = JSON.parse(res);
    r_name.innerHTML = `Enroll No: ${res[0].enroll_no}`;
    r_semester.innerHTML = `${res[0].semester}`;
    var i = 0;
    res.forEach((item) => {
      i++;
      let tr = document.createElement("tr");
      let scored_total =
        parseInt(item.p_marks_scored) + parseInt(item.t_marks_scored);
      var total_marks = parseInt(item.p_marks) + parseInt(item.t_marks);
      if (item.t_marks == 0) {
        total_marks = 50;
      }
      let percentage = parseFloat((scored_total * 100) / total_marks).toFixed(
        2
      );
      let pass_fail =
        percentage > 40
          ? "<span class='r_pass'>Pass</span>"
          : "<span class='r_fail'>Fail</span>";
      var grade = '<span class="r_grade_exellent">Excellent</span>';
      if (percentage > 80) {
        grade = '<span class="r_grade_exellent">Excellent</span>';
      } else if (percentage < 80 || percentage > 60) {
        grade = '<span class="r_grade_average">Good</span>';
      } else {
        grade = '<span class="r_grade_poor">Poor</span>';
      }
      tr.innerHTML = `<th scope="row">${i}</th>
                    <td>${item.course_code}</td>
                    <td>${item.course_name}</td>
                    <td>${pass_fail}</td>
                    <td>${item.p_marks}</td>
                    <td>${item.t_marks}</td>
                    <td>${scored_total} / ${total_marks}</td>
                    <td>${grade}</td>`;
      result_current_year_list.appendChild(tr);
      console.log(item);
    });
    // console.log(res);
  });
}

// function to get current users all the subjects
function getCourses() {
  let courses_list = document.getElementById("courses_list");
  courses_list.innerHTML = "";
  $.ajax({
    type: "GET",
    url: "../backend/student.php",
    data: "getCourses",
  }).done((res) => {
    res = JSON.parse(res);
    let i = 0;
    res.forEach((item) => {
      let tr = document.createElement("tr");
      let status_class =
        item.registered == true ? "s_status_registered" : "s_status_pending";
      let status_content =
        item.registered == true
          ? `<span class=${status_class}>Registered</span>`
          : `<span class=${status_class} onclick="registerCourse('${item.course_code}')">Register <i class='fas fa-arrow-right'></i></span>`;
      i++;
      tr.innerHTML = `<th scope="row">${i}</th>
                  <td>${item.course_code}</td>
                  <td>${item.course_name}</td>
                  <td>${item.pre_requisites}</td>
                  <td>${item.credits}</td>
                  <td>${status_content}</td>`;
      courses_list.appendChild(tr);
      // console.log(item);
    });
    // console.log(res);
  });
}

// function to register the course
function registerCourse(course_code) {
  $.ajax({
    type: "GET",
    url: "../backend/student.php",
    data: { registerCourse: course_code },
  }).done((res) => {
    if (res == "true") {
      getCourses();
    } else {
      alert("Error occured please try again");
    }
    console.log(res);
  });
}
