<?php
session_start();
include_once('../db.php');
if(isset($_POST['get_user_details'])){
    $enroll_no = $_SESSION['enroll_no'];
    // echo $enroll_no;
    $sql = "SELECT * FROM students where enroll_no=$enroll_no limit 1";
    $result = mysqli_query($con, $sql);
    $data = mysqli_fetch_assoc($result);
    echo json_encode($data);
}

// function to fetch evetns
if(isset($_GET['events'])){
    $sql = "SELECT * FROM events limit 3";
    $result = mysqli_query($con, $sql);
    $res = [];
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
            array_push($res, $row);
        }
    }
    // $data = mysqli_fetch_assoc($result);
    echo json_encode($res);
}

// function to get current year result
if(isset($_GET['getCureentYearResult'])){
    $res = [];
    $enroll_no = $_SESSION['enroll_no'];
    $student_details =mysqli_fetch_assoc(mysqli_query($con,  "SELECT * FROM students WHERE enroll_no='$enroll_no'"));
    $semester = $student_details['semester'];
    $sql = "SELECT *, results.p_marks as p_marks_scored, results.t_marks as t_marks_scored 
            FROM results inner join courses on results.course_code=courses.course_code 
            where results.enroll_no='$enroll_no' AND results.semester='$semester'";
    $result = mysqli_query($con, $sql);
    // $data = mysqli_fetch_assoc($result);
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
            array_push($res, $row);
        }
    }
    echo json_encode($res);
}

// function to get course
if(isset($_GET['getCourses'])){
    $res = [];
    $id = $_SESSION['enroll_no'];
    $student_sql = "SELECT * FROM students WHERE enroll_no='$id'";
    $student_result = mysqli_query($con, $student_sql);
    $student_data = mysqli_fetch_assoc($student_result);
    $semester = $student_data['semester'];

    $sql = "SELECT * FROM courses where semester='$semester'";
    $result = mysqli_query($con, $sql);
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
            $course_code = $row['course_code'];
            $check_registered = mysqli_query($con, "SELECT count(*) as count FROM courses_taken 
                                                    where course_code='$course_code' AND enroll_no=$id");
            $check_registered = mysqli_fetch_assoc($check_registered);
            if($check_registered['count'] == 1){
                $row['registered'] = true;
            }else{
                $row['registered'] = false;
            }
            array_push($res, $row);
        }
    }
    echo json_encode($res);
}

// function to register for the course
if(isset($_GET['registerCourse'])){
    $course_code = $_GET['registerCourse'];
    $enroll_no = $_SESSION['enroll_no'];
    $sql = "INSERT INTO `courses_taken`(`course_code`, `enroll_no`) VALUES ('$course_code', '$enroll_no')";
    $result = mysqli_query($con, $sql);
    echo json_encode($result);
}

?>