<?php
session_start();
include_once('../db.php');

//login status 
if(isset($_POST['login_status'])){
    if(isset($_SESSION['type'])){
        echo $_SESSION['type'];
    }else{
        echo json_encode(false);
    }
}

// login function  for students
if(isset($_POST['enroll_no'])){
    $enroll_no = $_POST['enroll_no'];
    $s_password = $_POST['s_password'];
    // echo " ".$enroll_no ." ".$s_password;
    // echo "<script>console.log($s_password)</script>";
    $sql = "SELECT count(*) as total FROM students where enroll_no='$enroll_no' AND password='$s_password' limit 1";
    $result = mysqli_query($con, $sql);
    $data = mysqli_fetch_assoc($result);
    $count = $data['total'];
    if($count == 1){
        // echo "count: ".$count;
        $_SESSION['enroll_no'] = $enroll_no;
        $_SESSION['type'] = 'student';
        echo json_encode(true);
    }else{
        echo json_encode(false);
    }
}

// login function  for teachers
if(isset($_POST['t_id'])){
    $t_id = $_POST['t_id'];
    $t_password = $_POST['t_password'];

    $sql = "SELECT count(*) AS count FROM teachers WHERE t_id='$t_id' AND password='$t_password'";
    $result = mysqli_query($con, $sql);
    $data = mysqli_fetch_assoc($result);
    $count = $data['count'];
    if($count == 1){
        $_SESSION['t_id'] = $t_id;
        $_SESSION['type'] = 'teacher';
        echo json_encode(true);
    }else{
        echo json_encode(false);
    }
}

//function for logout
if(isset($_POST['logout'])){
    session_unset();
    session_destroy();
    echo json_encode(true);
}


?>