<?php

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

use Slim\Http\UploadedFile;
$app = new \Slim\App;
$container = $app->getContainer();
$container['upload_directory'] = __DIR__ . '/uploads';
// include "candidate.php";

$app->get('/recruiter/', function (Request $request, Response $reponse) {
    echo 'home recruiter working';
});


$app->post('/recruiter/register', function (Request $request, Response $reponse, array $args) {
    $name = $request->getParam('name');
    $mobileno = $request->getParam('mobile_no');
    $email = $request->getParam('email');
    $password = $request->getParam('passwd');
    $md_password = md5($password);
    $address = $request->getParam('address');
    $pincode = $request->getParam('pincode');
    $profileimage = $request->getParam('profile_image');
    $category = $request->getParam('category');
    try {
        //get db object
        $db = new db();
        //conncect
        $pdo = $db->connect();
        $date = date('Y-m-d h:i:s');
        $querylogin = "SELECT * FROM recruiter WHERE email='$email'";
        $stmt = $pdo->prepare($querylogin);
        $stmt->execute();
        $login = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $sql = "INSERT INTO recruiter(name,mobile_no,email,passwd,md_password,address,pincode,profile_image,category)
                    VALUES('$name','$mobileno','$email','$password','$md_password','$address','$pincode','$profileimage','$category')";
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            $login["message"] = 'Success';
        } else {
            $login["message"] = 'Already registered';
        }
        echo  json_encode($login);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


//make a login otp request
$app->post('/recruiter/otp', function (Request $request, Response $reponse, array $args) {
    $mobileno = $request->getParam('mobile_no');
    $otp = rand(100000, 999999);
    try {
        //get db object 
        $db = new db();
        //create a db connection
        $pdo = $db->connect();

		$querySelect = "SELECT * FROM recruiter WHERE mobile_no='$mobileno'";
		$stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $recruiterDetails = array();
		$count = $stmt->fetch(PDO::FETCH_ASSOC);
		$queryUpdate = "UPDATE recruiter SET otp='$otp' WHERE mobile_no='$mobileno'";
		$stmt = $pdo->prepare($queryUpdate);
		$stmt->execute();
		$status = '1';
		$updatedEmp["status"] = $status;
		$updatedEmp['detalis'] = $count;
		$updatedEmp["message"] = 'OTP Send Successfully';
        echo json_encode($count);
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


//make a recruiter login request
$app->post('/recruiter/login_otp', function (Request $request, Response $reponse, array $args) {
    $mobileno = $request->getParam('mobile_no');
    $otp = $request->getParam('otp');

    try {
        //get db object
        $db = new db();
        //conncect
        $pdo = $db->connect();
        $querylogin = "SELECT * FROM recruiter WHERE mobile_no ='$mobileno' AND otp ='$otp'";
        $stmt = $pdo->prepare($querylogin);
        $stmt->execute();
        $login = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if(empty($count)){
            $status="0";
            $login["status"]=$status;
            echo '{"resp": ' . json_encode($login) . '}';
        } else{  
            $status="1";
            $login["status"]=$status;
            $login["details"]=$count;
            echo '{"resp": ' . json_encode($login) . '}';
          }
        
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

$app->post('/recruiter/updateProfile', function (Request $request, Response $reponse, array $args) {
    $recruiter_id = $request->getParam('id');
    $name = $request->getParam('name');
    $mobileno = $request->getParam('mobile_no');
    $email = $request->getParam('email');
    $address = $request->getParam('address');
    $pincode = $request->getParam('pincode');
    $category = $request->getParam('category');
    $company_name = $request->getParam('company_name');
    $designation = $request->getParam('designation');
    $gst_no = $request->getParam('gst_no');
    $pan_no = $request->getParam('pan_no');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $recuterUpdate = "UPDATE recruiter SET name='$name',mobile_no='$mobileno',email='$email',address='$address',pincode='$pincode',category='$category',
        company_name='$company_name',designation='$designation',gst_no='$gst_no',pan_no='$pan_no'  WHERE id='$recruiter_id'";
        $stmt = $pdo->prepare($recuterUpdate);
        $stmt->execute();
        $status = '1';
        $reu_update['status'] = $status;
        $reu_update['message'] = 'Updated Successfully';

        echo '{"result": ' . json_encode($reu_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


//make a view recurter request
$app->get("/recruiter/views", function(Request $request, Response $response, array $args){
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $selectRecuriter = "SELECT * FROM recruiter";
        $stmt = $pdo->prepare($selectRecuriter);
        $stmt->execute();
        $recurtlist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


//make a view sigle recurter details request
$app->get("/recruiter/views/{id}", function(Request $request, Response $response, array $args){
    $recruiter_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $selectRecuriter = "SELECT * FROM recruiter WHERE id='$recruiter_id'";
        $stmt = $pdo->prepare($selectRecuriter);
        $stmt->execute();
        $recurtlist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete recurter request
$app->get('/recruiter/delete/{id}', function (Request $request, Response $reponse, array $args) {
    $recruiter_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM recruiter WHERE id='$recruiter_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $recurter_list = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $recurter_list['message'] = 'No More data';
        } else {
            $ageDelete = "DELETE FROM recruiter WHERE id='$recruiter_id'";
            $stmt = $pdo->prepare($ageDelete);
            $stmt->execute();
            $recurter_list['message'] = 'Remove the data Successfully';
        }
        echo '{"result": ' . json_encode($recurter_list) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


// Make a View Recruiter request

$app->get('/recruiter/view', function (Request $request, Response $reponse, array $args) {
    try {
        //get db object 
        $db = new db();
        //Connect
        $pdo = $db->connect();
        $queryViewDetails = "SELECT recruiter.*, job_category.category_name FROM recruiter LEFT JOIN job_category ON recruiter.id=job_category.id";
        //$queryViewDetails = "SELECT * FROM recruiter";
        $stmt = $pdo->prepare($queryViewDetails);
        $stmt->execute();
        // $recruiterlist = array();

        $count = $stmt->fetchAll(PDO::FETCH_OBJ);

        echo '{"result": ' . json_encode($count) . '}';

        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


//make update status a Recruiter 
$app->get('/recruiter/status/{id}', function (Request $request, Response $reponse, array $args) {
    $recruiter_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM recruiter WHERE id='$recruiter_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $recruiter_status = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['recruiter_status'] == "enable") {
            $queryUpdate_Recruiter = "UPDATE recruiter SET recruiter_status='disable' WHERE id='$recruiter_id'";
            $stmt = $pdo->prepare($queryUpdate_Recruiter);
            $stmt->execute();
            $recruiter_status['message'] = 'Status Disable';
        } else {
            $queryUpdate_Recruiter = "UPDATE recruiter SET recruiter_status='enable' WHERE id='$recruiter_id'";
            $stmt = $pdo->prepare($queryUpdate_Recruiter);
            $stmt->execute();
            $recruiter_status['message'] = 'Status Enable';
        }
        echo json_encode($recruiter_status);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update job status approval a Recruiter 
$app->get('/recruiter/approval/{id}', function (Request $request, Response $reponse, array $args) {
    $recruiter_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM recruiter WHERE id='$recruiter_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $recruiter_status = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['job_status'] == "approval") {
            $queryUpdate_Recruiter = "UPDATE recruiter SET job_status='rejected' WHERE id='$recruiter_id'";
            $stmt = $pdo->prepare($queryUpdate_Recruiter);
            $stmt->execute();
            $status = '0';
            $recruiter_status['status'] = $status;
            $recruiter_status['message'] = 'Job Status Rejected';
        } else {
            $queryUpdate_Recruiter = "UPDATE recruiter SET job_status='approval' WHERE id='$recruiter_id'";
            $stmt = $pdo->prepare($queryUpdate_Recruiter);
            $stmt->execute();
            $status = '1';
            $recruiter_status['status'] = $status;
            $recruiter_status['message'] = 'Job Status Approval';
        }
        echo json_encode($recruiter_status);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


//Recruter Job Posting API

//Make recruiter job posting request

$app->post('/job_posting/add', function (Request $request, Response $response, array $args) {
    $designation_id = $request->getParam('designation_id');
    $gender = $request->getParam('gender');
    $department_id = $request->getParam('department_id');
    $total_experience = $request->getParam('total_experience');
    $expected_salary = $request->getParam('expected_salary');
    $qualification = $request->getParam('qualification');
    $industry_id = $request->getParam('industry_id');
    $location = $request->getParam('location');
    $state = $request->getParam('state');
    $role_responsliblity = $request->getParam('role_responsliblity');
    $company_name = $request->getParam('company_name');
    $application_alert = $request->getParam('application_alert');
    $interviewer_name = $request->getParam('interviewer_name');
    $contact_no = $request->getParam('contact_no');
    $interview_type = $request->getParam('interview_type');
    $interview_day = $request->getParam('interview_day');
    $interview_time = $request->getParam('interview_time');
    $contact_view = $request->getParam('contact_view');
    $google_location = $request->getParam('google_location');
    $interview_address = $request->getParam('interview_address');
    $reminder = $request->getParam('reminder');
    $paid_response = $request->getParam('paid_response');
    $recuriter_id = $request->getParam('recruiter_id');

    try {
        // create db object
        $db = new db();
        //db connection
        $pdo = $db->connect();

        $job_posting_list = array();
        $insertJob_Posting = "INSERT INTO job_posting_recruiter(designation_id,gender,department_id,total_experience,expected_salary,qualification,
      industry_id,location,state,role_responsliblity,company_name,application_alert,interviewer_name,contact_no,interview_type,
      interview_day,interview_time,contact_view,google_location,interview_address,reminder,paid_response,recruiter_id) 
        VALUES('$designation_id','$gender','$department_id','$total_experience','$expected_salary','$qualification','$industry_id','$location','$state',
        '$role_responsliblity','$company_name','$application_alert','$interviewer_name','$contact_no','$interview_type','$interview_day','$interview_time','$contact_view',
        '$google_location','$interview_address','$reminder','$paid_response','$recuriter_id')";
        $stmt = $pdo->prepare($insertJob_Posting);
        $stmt->execute();

        $job_posting_list['message'] = 'Added Success';
        echo json_encode($job_posting_list);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a job posting recruiter view request
$app->get('/job_posting/view/{id}', function (Request $request, Response $response, array $args) {
    $job_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //db connection
        $pdo = $db->connect();

        $querySelect =  "SELECT job_posting_recruiter.*, designation.designation_name,job_category.category_name, recruiter.name 
        FROM job_posting_recruiter 
        LEFT JOIN designation ON job_posting_recruiter.designation_id = designation.id  
        LEFT JOIN job_category ON job_posting_recruiter.department_id = job_category.id
        LEFT JOIN recruiter ON job_posting_recruiter.recruiter_id=recruiter.id 
        WHERE job_posting_recruiter.id='$job_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $joblist = array();
        $count =  $stmt->fetch(PDO::FETCH_ASSOC);

        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


$app->get('/job_posting/views/{id}', function (Request $request, Response $response, array $args) {
    $job_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //db connection
        $pdo = $db->connect();

        $querySelect =  "SELECT * FROM job_posting_recruiter WHERE id='$job_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $joblist = array();
        $count =  $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a all job posting recruiter view request

$app->get('/job_posting/view', function (Request $request, Response $response, array $args) {
    // $job_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //db connection
        $pdo = $db->connect();

        $querySelect =  "SELECT job_posting_recruiter.*, designation.designation_name,job_category.category_name, industry.industry_name 
        FROM job_posting_recruiter 
        LEFT JOIN designation ON job_posting_recruiter.designation_id = designation.id  
        LEFT JOIN job_category ON job_posting_recruiter.department_id = job_category.id
        LEFT JOIN industry ON job_posting_recruiter.industry_id = industry.id";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $joblist = array();
        $count =  $stmt->fetchAll(PDO::FETCH_OBJ);

        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


//make a job posting recruiter update request

$app->post('/job_posting/update', function (Request $request, Response $response, array $args) {
    $job_id = $request->getParam('id');
    $designation_id = $request->getParam('designation_id');
    $gender = $request->getParam('gender');
    $department_id = $request->getParam('department_id');
    $total_experience = $request->getParam('total_experience');
    $expected_salary = $request->getParam('expected_salary');
    $qualification = $request->getParam('qualification');
    $industry_id = $request->getParam('industry_id');
    $location = $request->getParam('location');
    $state = $request->getParam('state');
    $role_responsliblity = $request->getParam('role_responsliblity');
    $company_name = $request->getParam('company_name');
    $application_alert = $request->getParam('application_alert');
    $interviewer_name = $request->getParam('interviewer_name');
    $contact_no = $request->getParam('contact_no');
    $interview_type = $request->getParam('interview_type');
    $interview_day = $request->getParam('interview_day');
    $interview_time = $request->getParam('interview_time');
    $contact_view = $request->getParam('contact_view');
    $google_location = $request->getParam('google_location');
    $interview_address = $request->getParam('interview_address');
    $reminder = $request->getParam('reminder');
    $paid_response = $request->getParam('paid_response');

    try {
        // create db object
        $db = new db();
        //db connection
        $pdo = $db->connect();

        $job_posting_list = array();
         
        $queryUpdate_JobPosting = "UPDATE job_posting_recruiter SET designation_id='$designation_id',gender='$gender',
        department_id='$department_id',total_experience='$total_experience',role_responsliblity='$role_responsliblity',total_experience='$total_experience',
        expected_salary='$expected_salary',qualification='$qualification',industry_id='$industry_id',company_name='$company_name',
        location='$location',state='$state',application_alert='$application_alert',interviewer_name='$interviewer_name',contact_no='$contact_no',interview_type='$interview_type'
        ,interview_day='$interview_day',interview_time='$interview_time',contact_view='$contact_view',google_location='$google_location',interview_address='$interview_address',reminder='$reminder',
        paid_response='$paid_response' WHERE id='$job_id'";
        $stmt = $pdo->prepare($queryUpdate_JobPosting);
        $stmt->execute();
        $job_posting_list['message'] = 'Update Success';
        echo json_encode($job_posting_list);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a DELETE job posting recruter request 

$app->get('/job_posting/delete/{id}', function (Request $request, Response $response, array $args) {
    $jobposting_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM job_posting_recruiter WHERE id='$jobposting_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $jobposting = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $designationlist['message'] = 'No More data';
        } else {
            $queryDelete = "DELETE FROM job_posting_recruiter WHERE id='$jobposting_id'";
            $stmt = $pdo->prepare($queryDelete);
            $stmt->execute();
            $jobposting['message'] = 'Remove the data Successfully';
        }
        echo json_encode($jobposting);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


// make a job posting recruiter update status request 

$app->get('/job_posting/status/{id}', function (Request $request, Response $reponse, array $args) {
    $jobposting_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM job_posting_recruiter WHERE id='$jobposting_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $jobposting_status = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        //echo $count['posting_status'];

        if ($count['status'] == "enable") {
            $queryUpdate_JobPosting = "UPDATE job_posting_recruiter SET status='disable' WHERE id='$jobposting_id'";
            $stmt = $pdo->prepare($queryUpdate_JobPosting);
            $stmt->execute();
            $status = '0';
            $jobposting_status['status'] = $status;
            $jobposting_status['message'] = 'Status Disable';
        } else {
            $queryUpdate_JobPosting = "UPDATE job_posting_recruiter SET status='enable' WHERE id='$jobposting_id'";
            $stmt = $pdo->prepare($queryUpdate_JobPosting);
            $stmt->execute();
            $status = '1';
            $jobposting_status['status'] = $status;
            $jobposting_status['message'] = 'Status Enable';
        }
        echo json_encode($jobposting_status);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update job status approval a Recruiter 
$app->get('/job_posting/approval/{id}', function (Request $request, Response $reponse, array $args) {
    $job_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM job_posting_recruiter WHERE id='$job_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $jobpostingrecruter_status = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['job_status'] == "approval") {
            $queryUpdate_Recruiter = "UPDATE job_posting_recruiter SET job_status='rejected' WHERE id='$job_id'";
            $stmt = $pdo->prepare($queryUpdate_Recruiter);
            $stmt->execute();
            $status = '0';
            $jobpostingrecruter_status['status'] = $status;
            $jobpostingrecruter_status['message'] = 'Job Status Rejected';
        } else {
            $queryUpdate_Recruiter = "UPDATE job_posting_recruiter SET job_status='approval' WHERE id='$job_id'";
            $stmt = $pdo->prepare($queryUpdate_Recruiter);
            $stmt->execute();
            $status = '1';
            $jobpostingrecruter_status['status'] = $status;
            $jobpostingrecruter_status['message'] = 'Job Status Approval';
        }
        echo json_encode($jobpostingrecruter_status);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


// Make a View job posting recruiter request

$app->get('/recruiterandjobpost/view', function (Request $request, Response $reponse, array $args) {
    try {
        //get db object 
        $db = new db();
        //Connect
        $pdo = $db->connect();
        $queryViewDetails = "SELECT job_posting_recruiter.*,recruiter.name,designation.designation_name,industry.industry_name,job_category.category_name
        FROM job_posting_recruiter 
        LEFT JOIN recruiter ON job_posting_recruiter.recruiter_id=recruiter.id
        LEFT JOIN designation ON job_posting_recruiter.designation_id = designation.id 
        LEFT JOIN job_category ON job_posting_recruiter.department_id = job_category.id
        LEFT JOIN industry ON job_posting_recruiter.industry_id = industry.id";
        $stmt = $pdo->prepare($queryViewDetails);
        $stmt->execute();

        $count = $stmt->fetchAll(PDO::FETCH_OBJ);

        echo '{"result": ' . json_encode($count) . '}';

        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


?>