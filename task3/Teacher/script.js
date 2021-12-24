// getting the hamburger menu
let menuBtn = document.getElementById("menu");
let sidebar = document.querySelector(".sidebar");

// getting components
let add_new_subject = document.getElementById("add_new_subject");
let add_result = document.getElementById("add_result");
let edit_result = document.getElementById("edit_result");

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
  if (location == 2) {
    getCourses();
  }
  if (location == 1) {
    getResults();
  }
}
display(1);

function showAddNewSubjectDisplay() {
  add_new_subject.classList.toggle("active");
}

function showAddResult() {
  add_result.classList.toggle("active");
}

function showEditResult() {
  edit_result.classList.toggle("active");
}

// function to add new course
function addNewCourse() {
  event.preventDefault();
  let formData = new FormData(document.getElementById("add_new_subject_form"));
  let data = {
    addNewCourse: true,
    course_code: formData.get("course_code"),
    course_name: formData.get("course_name"),
    pre_requisites: formData.get("pre_requisites"),
    t_marks: formData.get("t_marks"),
    p_marks: formData.get("p_marks"),
    credits: formData.get("credits"),
  };
  $.ajax({
    type: "POST",
    url: "../backend/teacher.php",
    data: data,
  }).done((res) => {
    console.log(res);
    if (res == "true") {
      showAddNewSubjectDisplay();
      alert("Course successfully added");
      getCourses();
    } else {
      alert("Error occured plese try again");
    }
  });
  // alert("ah");
}

// function to get all the courses
function getCourses() {
  let course_list = document.getElementById("course_list");
  course_list.innerHTML = "";
  $.ajax({
    type: "GET",
    url: "../backend/teacher.php",
    data: "getCourses",
  }).done((res) => {
    res = JSON.parse(res);
    let i = 0;
    res.forEach((item) => {
      let tr = document.createElement("tr");
      let status_class =
        item.status == "Approved" ? "s_status_registered" : "s_status_pending";
      i++;
      tr.innerHTML = ` <tr>
                  <th scope="row">${i}</th>
                  <td>${item.course_code}</td>
                  <td>${item.course_name}</td>
                  <td>${item.pre_requisites}</td>
                  <td>${item.credits}</td>
                  <td class="c_status">
                    <span class=${status_class}>${item.status}</span>
                  </td>
                  <td><i class="fas fa-trash" onclick="deleteCourse('${item.course_code}')"></i></td>`;
      course_list.appendChild(tr);
    });
    // console.log(res);
  });
}

function deleteCourse(course_code) {
  $.ajax({
    type: "GET",
    url: "../backend/teacher.php",
    data: {
      delete_course_code: true,
      course_code: course_code,
    },
  }).done((res) => {
    console.log(res);
    if (res == "false") alert("Error occured while deleting course");
    getCourses();
  });
  // alert(delete_course_code);
}

// function to get results of each student
function getResults() {
  let student_result_list = document.getElementById("student_result_list");
  student_result_list.innerHTML = "";
  $.ajax({
    type: "GET",
    url: "../backend/teacher.php",
    data: { getResults: true },
  }).done((res) => {
    res = JSON.parse(res);
    res.forEach((item) => {
      let tr = document.createElement("tr");
      let scored_total = parseInt(item.p_marks) + parseInt(item.t_marks);
      let total_marks = parseInt(item.p_total) + parseInt(item.t_total);
      let percentage = parseFloat((scored_total * 100) / total_marks).toFixed(
        2
      );
      let pass_fail =
        percentage > 40
          ? "<span class='r_pass'>Pass</span>"
          : "<span class='r_fail'>Fail</span>";
      tr.innerHTML = `<td>${item.enroll_no}</td>
                    <td>${item.name}</td>
                    <td>${pass_fail}</td>
                    <td>${scored_total} / ${total_marks}</td>
                    <td>${percentage}</td>
                    <td>
                      <button class="edit_btn" onclick="showEditResult()">
                        Edit
                      </button>
                    </td>`;
      student_result_list.appendChild(tr);
      // console.log(item);
    });
    // console.log(res);
  });
}

// function to get courses of given enrollnment number
function getCoursesOfEnrollment() {
  let enroll_no = document.getElementById("enroll_no").value;
  let courses_form = document.getElementById("form_result_subjects");
  let result_subjects_list = document.getElementById("result_subjects_list");
  if (enroll_no.length > 0) {
    let formData = {
      getCoursesOfEnrollment: enroll_no,
    };
    document.getElementById("enroll_no").disabled = true;
    $.ajax({
      type: "GET",
      url: "../backend/teacher.php",
      data: formData,
    }).done((res) => {
      res = JSON.parse(res);
      res.forEach((item) => {
        let tr = document.createElement("tr");
        let disabled1 = item.p_marks == 0 ? "value='0'" : "value='30'";
        let disabled2 = item.t_marks == 0 ? "value='0'" : "value='20'";
        tr.innerHTML = `<td scope="row">${item.course_code}</td>
                        <td>${item.course_name}</td>
                        <td>
                          <input
                            type="text"
                            name="p_marks"
                            placeholder="Max ${item.p_marks}"
                            class="form_input"
                            ${disabled1}
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="t_marks"
                            placeholder="Max ${item.t_marks}"
                            class="form_input"
                            ${disabled2}
                            required
                          />
                        </td>`;
        // console.log(item);
        result_subjects_list.appendChild(tr);
      });
      courses_form.style.display = "block";
    });
  } else {
    alert("Please enter enrollment number");
  }
}

// fucntion to add result
function addResult() {
  event.preventDefault();
  let result_form = document.getElementById("result_form");
  let formData = new FormData(result_form);
  let p_marks_array = [];
  let t_marks_array = [];
  for (var pair of formData.entries()) {
    if (pair[0] == "p_marks") {
      p_marks_array.push(pair[1]);
    } else {
      t_marks_array.push(pair[1]);
    }
    // total_marks += parseInt(pair[1]);
  }
  let marks = {
    addResult: true,
    enroll_no: document.getElementById("enroll_no").value,
    p_marks_array: p_marks_array,
    t_marks_array: t_marks_array,
  };
  console.log(marks);
  // let data = new FormData(marks);
  $.ajax({
    type: "POST",
    url: "../backend/teacher.php",
    data: marks,
  }).done((res) => {
    if (res == "true") {
      alert("Result successfully added");
    } else {
      alert("Error occured plese try again");
    }

    showAddResult();
    getResults();
    // res = JSON.parse(res);
    console.log(res);
  });
}
