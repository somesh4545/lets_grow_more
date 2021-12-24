<?php
session_start();
include_once('../db.php');

// post request ot add new course/subject
if(isset($_POST['addNewCourse'])){
    $course_code = $_POST['course_code'];
    $course_name = $_POST['course_name'];
    $pre_requisites = $_POST['pre_requisites'];
    $t_marks = $_POST['t_marks'];
    $p_marks = $_POST['p_marks'];
    $credits = $_POST['credits'];
    
    $sql = "INSERT INTO `courses`(`course_code`, `course_name`, `pre_requisites`, `p_marks`, `t_marks`, `Credits`, `status`) 
            VALUES ('$course_code','$course_name','$pre_requisites','$p_marks','$t_marks','$credits','Waiting for approval')";
    $result = mysqli_query($con, $sql);
    echo json_encode($result);
}

// get functon to fetch courses
if(isset($_GET['getCourses'])){
    $res = [];
    $sql = "SELECT * FROM courses";
    $result = mysqli_query($con, $sql);
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
            array_push($res, $row);
        }
    }
    // $result = mysqli_fetch_array($result);
    echo json_encode($res);
}

// function to delete the course
if(isset($_GET['delete_course_code'])){
    $id = $_GET['course_code'];
    $sql = "DELETE FROM courses WHERE course_code='$id'";
    $result = mysqli_query($con, $sql);

    echo json_encode($result);
}


// function to get registered courses of the enrolled number
if(isset($_GET['getCoursesOfEnrollment'])){
    $res = [];
    $enroll_no = $_GET['getCoursesOfEnrollment'];
    $sql = "SELECT * FROM courses_taken inner join courses on courses_taken.course_code=courses.course_code where enroll_no='$enroll_no'";
    $result = mysqli_query($con, $sql);
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
            array_push($res, $row);
        }
    }
    // $result = mysqli_fetch_assoc($result);
    echo json_encode($res);
}

// function to retrieve result
if(isset($_GET['getResults'])){
    $res = [];
    $sql = "SELECT *, sum(results.p_marks) as p_marks, sum(results.t_marks) as t_marks, 
            sum(courses.p_marks) as p_total, sum(courses.t_marks) as t_total 
            FROM `students` inner join results on students.enroll_no=results.enroll_no 
            inner join courses on results.course_code=courses.course_code
            GROUP BY results.enroll_no";
    $result = mysqli_query($con, $sql);
    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_array($result)){
            array_push($res, $row);
        }
    }
    echo json_encode($res);
}

// function to add reuslt 
if(isset($_POST['addResult'])){
    // $res = [];
    $p_marks = $_POST['p_marks_array'];
    $t_marks = $_POST['t_marks_array'];
    $enroll_no = $_POST['enroll_no'];
    $sql = "SELECT * FROM courses_taken inner join courses on courses_taken.course_code=courses.course_code where enroll_no='$enroll_no'";
    $result = mysqli_query($con, $sql);
    if(mysqli_num_rows($result) > 0){
        $i=0;
        while($row = mysqli_fetch_array($result)){
            // $row['p_marks_scored'] = (int)$p_marks[$i];
            // $row['t_marks_scored'] = (int)$t_marks[$i];
            $course_code = $row['course_code'];
            $semester = $row['semester'];
            $p_final_marks = $p_marks[$i];
            $t_final_marks = $t_marks[$i];
            // array_push($res, $p_final_marks);
            $add_result_sql = "INSERT INTO `results`( `enroll_no`, `course_code`, `semester`, `p_marks`, `t_marks`)
                                            VALUES ('$enroll_no','$course_code','$semester','$p_final_marks','$t_final_marks')";
            $add_result_run = mysqli_query($con, $add_result_sql);
            // echo json_encode($row." ".$p_marks[$i]);
            $i++;
        }
        echo json_encode(true);
    }
}
?>