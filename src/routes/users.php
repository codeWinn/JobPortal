<?php

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;

use Slim\Http\UploadedFile;

$app = new \Slim\App;
$container = $app->getContainer();
$container['upload_directory'] = __DIR__ . '/upload/';
include "recruiter.php";

$app->get('/', function (Request $request, Response $reponse) {
    echo 'home user working';
});

//Super Admin

//make a super_admin register request
$app->post('/users/register', function (Request $request, Response $reponse, array $args) {
    $name = $request->getParam('name');
    $mobileno = $request->getParam('mobile_no');
    $email = $request->getParam('email');
    $password = $request->getParam('passwd');
    $md_password = md5($password);
    $usertype = $request->getParam('user_type');
    $status = $request->getParam('status');
    $updatedat = $request->getParam('updated_at');
    $address = $request->getParam('address');
    $pincode = $request->getParam('pincode');
    $profileimage = $request->getParam('profile_image');
    try {
        //get db object
        $db = new db();
        //conncect
        $pdo = $db->connect();
        $date = date('Y-m-d h:i:s');
        $querylogin = "SELECT * FROM super_admin WHERE mobile_no='$mobileno'";
        $stmt = $pdo->prepare($querylogin);
        $stmt->execute();
        $login = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $sql = "INSERT INTO super_admin(name,mobile_no,email,passwd,md_password,user_type,status,created_at,updated_at,address,pincode,profile_image)
                    VALUES('$name','$mobileno','$email','$password','$md_password','$usertype','$status','$date','$updatedat','$address','$pincode','$profileimage')";
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
$app->post('/users/otp', function (Request $request, Response $reponse, array $args) {
    $admin_mobileno = $request->getParam('mobile_no');
    $otp = rand(100000, 999999);
    try {
        //get db object 
        $db = new db();
        //create a db connection
        $pdo = $db->connect();

		$querySelect = "SELECT * FROM super_admin WHERE mobile_no='$admin_mobileno'";
		$stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $recruiterDetails = array();
		$count = $stmt->fetch(PDO::FETCH_ASSOC);
		$queryUpdate = "UPDATE super_admin SET otp='$otp' WHERE mobile_no='$admin_mobileno'";
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


//make a super_admin login request
$app->post('/users/login_otp', function (Request $request, Response $reponse, array $args) {
    $admin_mobileno = $request->getParam('mobile_no');
    $otp = $request->getParam('otp');

    try {
        //get db object
        $db = new db();
        //conncect
        $pdo = $db->connect();
        $querylogin = "SELECT * FROM super_admin WHERE mobile_no ='$admin_mobileno' AND otp ='$otp'";
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

//make a superadmin single view data request
$app->get('/users/view/{id}', function (Request $request, Response $reponse, array $args) {
    $userid = $request->getAttribute('id');

    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();

        $queryShowDetails = "SELECT * FROM super_admin WHERE id='$userid'";
        $stmt = $pdo->prepare($queryShowDetails);
        $stmt->execute();
        $emplist = array();

        $count = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($count);

        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a update super admin profile request

$app->post('/users/update', function (Request $request, Response $reponse, array $args) {
    $userid = $request->getParam('id');
    $name = $request->getParam('name');
    $mobile_no = $request->getParam('mobile_no');
    $email = $request->getParam('email');
    $address = $request->getParam('address');
    // $pincode = $request->getParam('pincode');

    try {
        //get db object 
        $db = new db();
        //create a db connection
        $pdo = $db->connect();

        $queryUpdate = "UPDATE super_admin SET name='$name',mobile_no='$mobile_no',email='$email',address='$address' WHERE id='$userid'";

        $stmt = $pdo->prepare($queryUpdate);
        $stmt->execute();
        $status = '1';
        $updatedEmp["status"] = $status;
        $updatedEmp["message"] = 'Updated Successful';

        echo json_encode($updatedEmp);
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


//Employee 

//make a add employee request

$app->post('/employee/add', function (Request $request, Response $reponse, array $args) {
    $name = $request->getParam('name');
    $contact_number = $request->getParam('contact_no');
    $email = $request->getParam('email');
    $local_address = $request->getParam('local_address');
    $permanent_address = $request->getParam('permanent_address');
    $pincode = $request->getParam('pincode');
    //$profileimage = $request->getParam('profile_image');

    try {
        // get db object
        $db = new db();
        //connect
        $pdo = $db->connect();
        $queryCheck = "SELECT * FROM employee WHERE name='$name' AND email='$email'";
        $stmt = $pdo->prepare($queryCheck);
        $stmt->execute();
        $emplist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $queryEmp = "INSERT INTO employee(name,contact_no,email,local_address,permanent_address,pincode)
                VALUES('$name','$contact_number','$email','$local_address','$permanent_address','$pincode')";
            $stmt = $pdo->prepare($queryEmp);
            $stmt->execute();
            $emplist['message'] = 'Employee Added';
        } else {
            $emplist['message'] = 'Employee Already Added';
        }

        echo json_encode($emplist);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


//make a single update employee with image request

$app->post('/employee/update/{id}', function (Request $request, Response $reponse, array $args) {
    $userid = $request->getParam('id');
    $name = $request->getParam('name');
    $contact_number = $request->getParam('contact_no');
    $email = $request->getParam('email');
    $local_address = $request->getParam('local_address');
    $permanent_address = $request->getParam('permanent_address');
    $pincode = $request->getParam('pincode');
    $profileimage = $request->getParam('profile_image');

    try {
        //get db object 
        $db = new db();
        //create a db connection
        $pdo = $db->connect();

        $queryUpdate = "UPDATE employee SET name='$name',contact_no='$contact_number',email='$email',
        local_address='$local_address',permanent_address='$permanent_address',pincode='$pincode',
        profile_image='$profileimage' WHERE id='$userid'";

        $stmt = $pdo->prepare($queryUpdate);
        $stmt->execute();
        $status = '1';
        $updatedEmp["status"] = $status;
        $updatedEmp["message"] = 'Updated Successful';

        echo json_encode($updatedEmp);
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a update employee request

$app->post('/employee/update', function (Request $request, Response $reponse, array $args) {
    $userid = $request->getParam('id');
    $name = $request->getParam('name');
    $contact_number = $request->getParam('contact_no');
    $email = $request->getParam('email');
    $local_address = $request->getParam('local_address');
    $permanent_address = $request->getParam('permanent_address');
    $pincode = $request->getParam('pincode');
    // $profileimage = $request->getParam('profile_image');

    try {
        //get db object 
        $db = new db();
        //create a db connection
        $pdo = $db->connect();

        $queryUpdate = "UPDATE employee SET name='$name',contact_no='$contact_number',email='$email',
        local_address='$local_address',permanent_address='$permanent_address',pincode='$pincode' WHERE id='$userid'";

        $stmt = $pdo->prepare($queryUpdate);
        $stmt->execute();
        $status = '1';
        $updatedEmp["status"] = $status;
        $updatedEmp["message"] = 'Updated Successful';

        echo json_encode($updatedEmp);
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


//make a view employee details request

$app->get('/employee/view', function (Request $request, Response $reponse, array $args) {

    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();

        $queryShowDetails = "SELECT * FROM employee";
        $stmt = $pdo->prepare($queryShowDetails);
        $stmt->execute();
        $emplist = array();

        $count = $stmt->fetchAll(PDO::FETCH_OBJ);

        echo '{"result": ' . json_encode($count) . '}';

        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a single employee details views
$app->get('/employee/view/{id}', function (Request $request, Response $reponse, array $args) {
    $userid = $request->getAttribute('id');

    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();

        $queryShowDetails = "SELECT * FROM employee WHERE id='$userid'";
        $stmt = $pdo->prepare($queryShowDetails);
        $stmt->execute();
        $emplist = array();

        $count = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($count);

        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete employee details request

$app->get('/employee/empDetails/{id}', function (Request $request, Response $reponse, array $args) {
    $userid = $request->getAttribute('id');
    try {
        //db object created
        $db = new db();
        //connect
        $pdo = $db->connect();
        $queryAlldata = "SELECT * FROM employee WHERE id='$userid'";
        $stmt = $pdo->prepare($queryAlldata);
        $stmt->execute();
        $data = array();
        $querydelete = "DELETE FROM employee WHERE id='$userid'";
        $stmt = $pdo->prepare($querydelete);
        $stmt->execute();
        $data['message'] = 'Remove the Data Successfully';
        echo '{"result": ' . json_encode($data) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// update category using id
$app->get('/employee/updateEmployee/{id}', function (Request $request, Response $reponse, array $args) {
    $employee_id = $request->getAttribute('id');

    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM employee WHERE id='$employee_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $industrylist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update status a employee 
$app->get('/employee/status/{id}', function (Request $request, Response $reponse, array $args) {
    $employee_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM employee WHERE id='$employee_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $employee_status = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['status'] == "enable") {
            $queryUpdate_Employee = "UPDATE employee SET status='disable' WHERE id='$employee_id'";
            $stmt = $pdo->prepare($queryUpdate_Employee);
            $stmt->execute();
            $status = '0';
            $employee_status['status'] = $status;
            $employee_status['message'] = 'Status Disable';
        } else {
            $queryUpdate_Employee = "UPDATE employee SET status='enable' WHERE id='$employee_id'";
            $stmt = $pdo->prepare($queryUpdate_Employee);
            $stmt->execute();
            $status = '1';
            $employee_status['status'] = $status;
            $employee_status['message'] = 'Status Enable';
        }
        echo json_encode($employee_status);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


// Job Category

// make a add job category request

$app->post('/job_category/add', function (Request $request, Response $reponse, array $args) {
    $category_name = $request->getParam('category_name');

    try {
        //create db object
        $db = new db();
        //connect
        $pdo = $db->connect();
        $queryJob = "INSERT INTO job_category(category_name) VALUES('$category_name')";
        $stmt = $pdo->prepare($queryJob);
        $stmt->execute();
        $joblist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        $joblist['message'] = 'Job Added Success';
        echo json_encode($joblist);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


// make a update job category request

$app->post('/job_category/update', function (Request $request, Response $reponse, array $args) {
    $job_id = $request->getParam('id');
    $category_name = $request->getParam('category_name');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $queryUpdate_job = "UPDATE job_category SET category_name='$category_name' WHERE id='$job_id'";
        $stmt = $pdo->prepare($queryUpdate_job);
        $stmt->execute();
        $status = '1';
        $job_update['status'] = $status;
        $job_update['message'] = 'Job Updated Successfully';

        echo '{"result": ' . json_encode($job_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view single job category request
$app->get('/job_category/view_job/{id}', function (Request $request, Response $reponse, array $args) {
    $job_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM job_category WHERE id='$job_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $joblist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        if (empty($count)) {
            $joblist['message'] = 'No Data Exit';
        }
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view single job and name column category request
$app->get('/category/view', function (Request $request, Response $reponse, array $args) {
    //$job_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT designation.*, job_category.category_name FROM designation LEFT JOIN job_category ON designation.department_id=job_category.id";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $joblist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        if (empty($count)) {
            $joblist['message'] = 'No Data Exit';
        }
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});



// make a view job category request
$app->get('/job_category/view_job', function (Request $request, Response $reponse, array $args) {
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM job_category";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $joblist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        if (empty($count)) {
            $joblist['message'] = 'No Data Exit';
        }
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete job category request

$app->get('/job_category/delete_job/{id}', function (Request $request, Response $reponse, array $args) {
    $job_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelectjob = "SELECT * FROM job_category WHERE id='$job_id'";
        $stmt = $pdo->prepare($querySelectjob);
        $stmt->execute();
        $joblist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $joblist['message'] = 'No More data';
        } else {
            $queryDelete_job = "DELETE FROM job_category WHERE id='$job_id'";
            $stmt = $pdo->prepare($queryDelete_job);
            $stmt->execute();
            $joblist['message'] = 'Remove the data Successfully';
        }
        echo '{"result": ' . json_encode($joblist) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a category status request

$app->get('/job_category/status/{id}', function (Request $request, Response $reponse, array $args) {
    $job_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM job_category WHERE id='$job_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $job_update = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['category_status'] == "enable") {
            $queryUpdate_job = "UPDATE job_category SET category_status='disable' WHERE id='$job_id'";
            $stmt = $pdo->prepare($queryUpdate_job);
            $stmt->execute();
            $status = '0';
            $job_update['status'] = $status;
            $job_update['message'] = 'Status Disable';
        } else {
            $queryUpdate_job = "UPDATE job_category SET category_status='enable' WHERE id='$job_id'";
            $stmt = $pdo->prepare($queryUpdate_job);
            $stmt->execute();
            $status = '1';
            $job_update['status'] = $status;
            $job_update['message'] = 'Status Enable';
        }
        echo json_encode($job_update);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


//Industry

// make a add industry request

$app->post('/industry/add', function (Request $request, Response $reponse, array $args) {
    $industry_name = $request->getParam('industry_name');
    

    try {
        //db object create 
        $db = new db();
        //connect the db
        $pdo = $db->connect();
        $queryAdd_Industry  = "SELECT * FROM industry WHERE industry_name='$industry_name'";
        $stmt = $pdo->prepare($queryAdd_Industry);
        $stmt->execute();
        $industrylist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $queryInsert_Industry = "INSERT INTO industry(industry_name) VALUES('$industry_name')";
            $stmt = $pdo->prepare($queryInsert_Industry);
            $stmt->execute();

            $industrylist['message'] = 'Industry Added Success';
        } else {
            $industrylist['message'] = 'Industry Already Add';
        }
        echo '{"result": ' . json_encode($industrylist) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a update industry request

$app->post('/industry/update', function (Request $request, Response $reponse, array $args) {
    $industry_id = $request->getParam('id');
    $industry_name = $request->getParam('industry_name');
    $created_date = date('Y-m-d h:i:s');
    $updated_date = $request->getParam('update_date');
    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $queryUpdate_Industry = "UPDATE industry SET industry_name='$industry_name',
        created_date='$created_date' WHERE id='$industry_id'";
        $stmt = $pdo->prepare($queryUpdate_Industry);
        $stmt->execute();
        $status = '1';
        $industry_update['status'] = $status;
        $industry_update['message'] = 'Job Updated Successfully';

        echo '{"result": ' . json_encode($industry_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view industry request
$app->get('/industry/view_industry', function (Request $request, Response $reponse, array $args) {
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM industry";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $industrylist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        if (empty($count)) {
            $industrylist['message'] = 'No Data Exit';
        }
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a single view industry request
$app->get('/industry/view_industry/{id}', function (Request $request, Response $reponse, array $args) {
    $industry_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM industry WHERE id='$industry_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $industrylist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete industry request

$app->get('/industry/delete_industry/{id}', function (Request $request, Response $reponse, array $args) {
    $industry_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelectjob = "SELECT * FROM industry WHERE id='$industry_id'";
        $stmt = $pdo->prepare($querySelectjob);
        $stmt->execute();
        $industrylist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $industrylist['message'] = 'No More data';
        } else {
            $queryDelete_industry = "DELETE FROM industry WHERE id='$industry_id'";
            $stmt = $pdo->prepare($queryDelete_industry);
            $stmt->execute();
            $industrylist['message'] = 'Remove the data Successfully';
        }
        echo '{"result": ' . json_encode($industrylist) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update status a industry 

$app->get('/industry/status/{id}', function (Request $request, Response $reponse, array $args) {
    $industry_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM industry WHERE id='$industry_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $indus_update = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['industry_status'] == "enable") {
            $queryUpdate_Indus = "UPDATE industry SET industry_status='disable' WHERE id='$industry_id'";
            $stmt = $pdo->prepare($queryUpdate_Indus);
            $stmt->execute();
            $status = '0';
            $indus_update['status'] = $status;
            $indus_update['message'] = 'Status Disable';
        } else {
            $queryUpdate_Indus = "UPDATE industry SET industry_status='enable' WHERE id='$industry_id'";
            $stmt = $pdo->prepare($queryUpdate_Indus);
            $stmt->execute();
            $status = '1';
            $indus_update['status'] = $status;
            $indus_update['message'] = 'Status Enable';
        }
        echo json_encode($indus_update);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// update category using id
$app->get('/category/updateCategory/{id}', function (Request $request, Response $reponse, array $args) {
    $category_id = $request->getAttribute('id');

    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM job_category WHERE id='$category_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $industrylist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


// Designation

// make a add designation request

$app->post('/designation/add', function (Request $request, Response $reponse, array $args) {
    $department_id = $request->getParam('department_id');
    $desi_name = $request->getParam('designation_name');
    // $created_date = date('Y-m-d h:i:s');
    try {
        //db object create 
        $db = new db();
        //connect the db
        $pdo = $db->connect();
        $designationlist = array();
        $queryInsert_Designation = "INSERT INTO designation(department_id,designation_name)
            VALUES('$department_id','$desi_name')";
        $stmt = $pdo->prepare($queryInsert_Designation);
        $stmt->execute();

        $designationlist['message'] = 'Added Success';
        echo json_encode($designationlist);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a update designation request

$app->post('/designation/update', function (Request $request, Response $reponse, array $args) {
    $designation_id = $request->getParam('id');
    $department_id = $request->getParam('department_id');
    $desi_name = $request->getParam('designation_name');
    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $queryUpdate_Designation = "UPDATE designation SET department_id='$department_id', designation_name='$desi_name' WHERE id='$designation_id'";
        $stmt = $pdo->prepare($queryUpdate_Designation);
        $stmt->execute();
        $status = '1';
        $designation_update['status'] = $status;
        $designation_update['message'] = 'Updated Successfully';

        echo '{"result": ' . json_encode($designation_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view designation request

$app->get('/designation/view', function (Request $request, Response $reponse, array $args) {
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM designation";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $designationlist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        if (empty($count)) {
            $designationlist['message'] = 'No Data Exit';
        }
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a single view designation request
$app->get('/designation/view/{id}', function (Request $request, Response $reponse, array $args) {
    $designation_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM designation WHERE id='$designation_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $designationlist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete designation request

$app->get('/designation/delete/{id}', function (Request $request, Response $reponse, array $args) {
    $designation_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM designation WHERE id='$designation_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $designationlist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $designationlist['message'] = 'No More data';
        } else {
            $queryDelete = "DELETE FROM designation WHERE id='$designation_id'";
            $stmt = $pdo->prepare($queryDelete);
            $stmt->execute();
            $designationlist['message'] = 'Remove the data Successfully';
        }
        echo json_encode($designationlist);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update status a designation 
$app->get('/designation/status/{id}', function (Request $request, Response $reponse, array $args) {
    $designation_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM designation WHERE id='$designation_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $designation_status = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['status'] == "enable") {
            $queryUpdate_Designation = "UPDATE designation SET status='disable' WHERE id='$designation_id'";
            $stmt = $pdo->prepare($queryUpdate_Designation);
            $stmt->execute();
            $status = '0';
            $designation_status['status'] = $status;
            $designation_status['message'] = 'Status Disable';
        } else {
            $queryUpdate_Designation = "UPDATE designation SET status='enable' WHERE id='$designation_id'";
            $stmt = $pdo->prepare($queryUpdate_Designation);
            $stmt->execute();
            $status = '1';
            $designation_status['status'] = $status;
            $designation_status['message'] = 'Status Enable';
        }
        echo json_encode($designation_status);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});



// Job Posting Category

// make a add job_posting_category request

$app->post('/jobposting/add', function (Request $request, Response $response, array $args) {
    $designation_id = $request->getParam('designation_id');
    $age = $request->getParam('age');
    $gender = $request->getParam('gender');
    $department_id = $request->getParam('department_id');
    $total_exp = $request->getParam('total_experience');
    $expected_salary = $request->getParam('expected_salary');
    $qualification = $request->getParam('qualification');
    $industry_id = $request->getParam('industry_id');
    $location = $request->getParam('location');
    $state = $request->getParam('state');

    try {
        //get db object
        $db = new db();
        //conncect
        $pdo = $db->connect();
        $jobposting = array();
        $queryInsert_JobPosting = "INSERT INTO job_posting_category(designation_id,age,gender,department_id,total_experience,expected_salary,qualification,industry_id,location,state)
                    VALUES('$designation_id','$age','$gender','$department_id','$total_exp','$expected_salary','$qualification','$industry_id','$location','$state')";
        $stmt = $pdo->prepare($queryInsert_JobPosting);
        $stmt->execute();
        $jobposting["message"] = 'Success';
        echo  json_encode($jobposting);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view job_posting_category request using other tables

$app->get('/jobposting/view', function (Request $request, Response $response, array $args) {
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT job_posting_category.*, designation.designation_name,job_category.category_name, industry.industry_name 
        FROM job_posting_category 
        LEFT JOIN designation ON job_posting_category.designation_id = designation.id  
        LEFT JOIN job_category ON job_posting_category.department_id = job_category.id
        LEFT JOIN industry ON job_posting_category.industry_id = industry.id";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $designationlist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        if (empty($count)) {
            $designationlist['message'] = 'No Data Exit';
        }
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view single job_posting_category request

$app->get('/jobposting/view/{id}', function (Request $request, Response $response, array $args) {
    $jobposting_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM job_posting_category WHERE id='$jobposting_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $designationlist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});



// make a update job_posting_category request 

$app->post('/jobposting/update', function (Request $request, Response $response, array $args) {
    $jobposting_id = $request->getParam('id');
    $designation_id = $request->getParam('designation_id');
    $age = $request->getParam('age');
    $gender = $request->getParam('gender');
    $department_id = $request->getParam('department_id');
    $total_exp = $request->getParam('total_experience');
    $expected_salary = $request->getParam('expected_salary');
    $qualification = $request->getParam('qualification');
    $industry_id = $request->getParam('industry_id');
    $location = $request->getParam('location');
    $state = $request->getParam('state');

    try {
        //get db object
        $db = new db();
        //conncect
        $pdo = $db->connect();
        $jobposting = array();
        $queryUpdate_JobPosting = "UPDATE job_posting_category SET designation_id='$designation_id',
        age='$age',gender='$gender',department_id='$department_id',total_experience='$total_exp',
        expected_salary='$expected_salary',qualification='$qualification',industry_id='$industry_id',
        location='$location',state='$state' WHERE id='$jobposting_id'";
        $stmt = $pdo->prepare($queryUpdate_JobPosting);
        $stmt->execute();
        $jobposting["message"] = 'Update Successfully';
        echo  json_encode($jobposting);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a DELETE job_posting_category request 

$app->get('/jobposting/delete/{id}', function (Request $request, Response $response, array $args) {
    $jobposting_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM job_posting_category WHERE id='$jobposting_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $jobposting = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $designationlist['message'] = 'No More data';
        } else {
            $queryDelete = "DELETE FROM job_posting_category WHERE id='$jobposting_id'";
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


// make a job_posting_category update status request 

$app->get('/jobposting/status/{id}', function (Request $request, Response $reponse, array $args) {
    $jobposting_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM job_posting_category WHERE id='$jobposting_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $jobposting_status = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        echo $count['posting_status'];

        if ($count['posting_status'] == "enable") {
            $queryUpdate_JobPosting = "UPDATE job_posting_category SET posting_status='disable' WHERE id='$jobposting_id'";
            $stmt = $pdo->prepare($queryUpdate_JobPosting);
            $stmt->execute();
            $status = '0';
            $jobposting_status['status'] = $status;
            $jobposting_status['message'] = 'Status Disable';
        } else {
            $queryUpdate_JobPosting = "UPDATE job_posting_category SET posting_status='enable' WHERE id='$jobposting_id'";
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



// Image Upload Create API

$app->post('/image/upload', function (Request $request, Response $reponse, array $args) {
    $profileimage = $request->getParam('profile_image');

    try {
        // get db object
        $db = new db();
        //connect
        $pdo = $db->connect();

        $directory = $this->get('upload_directory');
        $uploadedFiles = $request->getUploadedFiles();
        $uploadedFile = $uploadedFiles['profile_image'];
        $uploadedFile5 = $uploadedFiles['profile_image'];
        if ($uploadedFile5->getError() === UPLOAD_ERR_OK) {

            $uploadedFile = moveUploadedFile5($directory, $uploadedFile5);
        }
        $imglist = array();
        $queryImage = "INSERT INTO image_upload(profile_image) VALUES('$uploadedFile')";
        $stmt = $pdo->prepare($queryImage);
        $stmt->execute();
        $imglist['message'] = 'Employee Added';

        echo json_encode($imglist);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//Gender 

//make a add gender request
$app->post('/gender/add', function (Request $request, Response $reponse, array $args) {
    $gender = $request->getParam('gender');
    
    try {
        //db object create 
        $db = new db();
        //connect the db
        $pdo = $db->connect();
        $queryInsert_Gender = "INSERT INTO gender(gender) VALUES('$gender')";
        $stmt = $pdo->prepare($queryInsert_Gender);
        $stmt->execute();

        $genderlist['message'] = 'Added Success';
        echo '{"result": ' . json_encode($genderlist) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a update gender request
$app->post('/gender/update', function (Request $request, Response $reponse, array $args) {
    $gender_id = $request->getParam('id');
    $gender = $request->getParam('gender');
    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $queryUpdate_Gender = "UPDATE gender SET gender='$gender' WHERE id='$gender_id'";
        $stmt = $pdo->prepare($queryUpdate_Gender);
        $stmt->execute();
        $status = '1';
        $gender_update['status'] = $status;
        $gender_update['message'] = 'Updated Successfully';

        echo '{"result": ' . json_encode($gender_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view gender request
$app->get('/gender/view', function (Request $request, Response $reponse, array $args) {
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM gender";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $genderlist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a single view gender request
$app->get('/gender/view/{id}', function (Request $request, Response $reponse, array $args) {
    $gender_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM gender WHERE id='$gender_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $genderlist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete gender request

$app->get('/gender/delete/{id}', function (Request $request, Response $reponse, array $args) {
    $gender_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM gender WHERE id='$gender_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $genderlist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $genderlist['message'] = 'No More data';
        } else {
            $queryDelete_gender = "DELETE FROM gender WHERE id='$gender_id'";
            $stmt = $pdo->prepare($queryDelete_gender);
            $stmt->execute();
            $genderlist['message'] = 'Remove the data Successfully';
        }
        echo '{"result": ' . json_encode($genderlist) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update status a gender 

$app->get('/gender/status/{id}', function (Request $request, Response $reponse, array $args) {
    $gender_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM gender WHERE id='$gender_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $gender_update = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['gender_status'] == "enable") {
            $queryUpdate_Gender = "UPDATE gender SET gender_status='disable' WHERE id='$gender_id'";
            $stmt = $pdo->prepare($queryUpdate_Gender);
            $stmt->execute();
            $status = '0';
            $gender_update['status'] = $status;
            $gender_update['message'] = 'Status Disable';
        } else {
            $queryUpdate_Gender = "UPDATE gender SET gender_status='enable' WHERE id='$gender_id'";
            $stmt = $pdo->prepare($queryUpdate_Gender);
            $stmt->execute();
            $status = '1';
            $gender_update['status'] = $status;
            $gender_update['message'] = 'Status Enable';
        }
        echo json_encode($gender_update);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


// Total Experience

//make a add total_experience request
$app->post('/total_experience/add', function (Request $request, Response $reponse, array $args) {
    $total_exp = $request->getParam('experience');
    
    try {
        //db object create 
        $db = new db();
        //connect the db
        $pdo = $db->connect();
        $queryAdd_Exp  = "SELECT * FROM total_experience WHERE experience='$total_exp'";
        $stmt = $pdo->prepare($queryAdd_Exp);
        $stmt->execute();
        $experiencelist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $queryInsert_Exp = "INSERT INTO total_experience(experience) VALUES('$total_exp')";
            $stmt = $pdo->prepare($queryInsert_Exp);
            $stmt->execute();

            $experiencelist['message'] = 'Added Success';
        } else {
            $experiencelist['message'] = 'Already Add';
        }
        echo '{"result": ' . json_encode($experiencelist) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a update total_experience request

$app->post('/total_experience/update', function (Request $request, Response $reponse, array $args) {
    $experience_id = $request->getParam('id');
    $total_exp = $request->getParam('experience');
    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $queryUpdate_Exp = "UPDATE total_experience SET experience='$total_exp' WHERE id='$experience_id'";
        $stmt = $pdo->prepare($queryUpdate_Exp);
        $stmt->execute();
        $status = '1';
        $experience_update['status'] = $status;
        $experience_update['message'] = 'Updated Successfully';

        echo '{"result": ' . json_encode($experience_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view total_experience request

$app->get('/total_experience/view', function (Request $request, Response $reponse, array $args) {
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM total_experience";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $explist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a single view total_experience request

$app->get('/total_experience/view/{id}', function (Request $request, Response $reponse, array $args) {
    $experience_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM total_experience WHERE id='$experience_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $explist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete total_experience request

$app->get('/total_experience/delete/{id}', function (Request $request, Response $reponse, array $args) {
    $experience_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM total_experience WHERE id='$experience_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $experience_list = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $experience_list['message'] = 'No More data';
        } else {
            $queryDelete_EXP = "DELETE FROM total_experience WHERE id='$experience_id'";
            $stmt = $pdo->prepare($queryDelete_EXP);
            $stmt->execute();
            $experience_list['message'] = 'Remove the data Successfully';
        }
        echo '{"result": ' . json_encode($experience_list) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update status a total_experience 

$app->get('/total_experience/status/{id}', function (Request $request, Response $reponse, array $args) {
    $experience_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM total_experience WHERE id='$experience_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $exp_update = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['exp_status'] == "enable") {
            $queryUpdate_Exp = "UPDATE total_experience SET exp_status='disable' WHERE id='$experience_id'";
            $stmt = $pdo->prepare($queryUpdate_Exp);
            $stmt->execute();
            $status = '0';
            $exp_update['status'] = $status;
            $exp_update['message'] = 'Status Disable';
        } else {
            $queryUpdate_Exp = "UPDATE total_experience SET exp_status='enable' WHERE id='$experience_id'";
            $stmt = $pdo->prepare($queryUpdate_Exp);
            $stmt->execute();
            $status = '1';
            $exp_update['status'] = $status;
            $exp_update['message'] = 'Status Enable';
        }
        echo json_encode($exp_update);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// Current Salary

//make a add current_salary request
$app->post('/current_salary/add', function (Request $request, Response $reponse, array $args) {
    $cur_salary = $request->getParam('current_salary');
    
    try {
        //db object create 
        $db = new db();
        //connect the db
        $pdo = $db->connect();
        $queryCurrent_Salary  = "SELECT * FROM current_salary WHERE current_salary='$cur_salary'";
        $stmt = $pdo->prepare($queryCurrent_Salary);
        $stmt->execute();
        $salary_update = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $insertSalary = "INSERT INTO current_salary(current_salary) VALUES('$cur_salary')";
            $stmt = $pdo->prepare($insertSalary);
            $stmt->execute();

            $salary_update['message'] = 'Added Success';
        } else {
            $salary_update['message'] = 'Already Add';
        }
        echo '{"result": ' . json_encode($salary_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});


// make a update current_salary request

$app->post('/current_salary/update', function (Request $request, Response $reponse, array $args) {
    $salary_id = $request->getParam('id');
    $cur_salary = $request->getParam('current_salary');
    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $current_salary_Update = "UPDATE current_salary SET current_salary='$cur_salary' WHERE id='$salary_id'";
        $stmt = $pdo->prepare($current_salary_Update);
        $stmt->execute();
        $status = '1';
        $salary_update['status'] = $status;
        $salary_update['message'] = 'Updated Successfully';

        echo '{"result": ' . json_encode($salary_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view current_salary request

$app->get('/current_salary/view', function (Request $request, Response $reponse, array $args) {
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM current_salary";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $explist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a single view current_salary request

$app->get('/current_salary/view/{id}', function (Request $request, Response $reponse, array $args) {
    $salary_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $selectSalary = "SELECT * FROM current_salary WHERE id='$salary_id'";
        $stmt = $pdo->prepare($selectSalary);
        $stmt->execute();
        $salarylist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete current_salary request

$app->get('/current_salary/delete/{id}', function (Request $request, Response $reponse, array $args) {
    $salary_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM current_salary WHERE id='$salary_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $salary_list = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $salary_list['message'] = 'No More data';
        } else {
            $queryDelete_Salary = "DELETE FROM current_salary WHERE id='$salary_id'";
            $stmt = $pdo->prepare($queryDelete_Salary);
            $stmt->execute();
            $salary_list['message'] = 'Remove the data Successfully';
        }
        echo '{"result": ' . json_encode($salary_list) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update status a current_salary 

$app->get('/current_salary/status/{id}', function (Request $request, Response $reponse, array $args) {
    $salary_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM current_salary WHERE id='$salary_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $salary_update = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['salary_status'] == "enable") {
            $queryUpdate_salary = "UPDATE current_salary SET salary_status='disable' WHERE id='$salary_id'";
            $stmt = $pdo->prepare($queryUpdate_salary);
            $stmt->execute();
            $status = '0';
            $salary_update['status'] = $status;
            $salary_update['message'] = 'Status Disable';
        } else {
            $queryUpdate_salary = "UPDATE current_salary SET salary_status='enable' WHERE id='$salary_id'";
            $stmt = $pdo->prepare($queryUpdate_salary);
            $stmt->execute();
            $status = '1';
            $salary_update['status'] = $status;
            $salary_update['message'] = 'Status Enable';
        }
        echo json_encode($salary_update);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// Expected Salary

//make a add expected salary request
$app->post('/expectedsalary/add', function (Request $request, Response $reponse, array $args) {
    $exp_salary = $request->getParam('expected_salary');
    
    try {
        //db object create 
        $db = new db();
        //connect the db
        $pdo = $db->connect();
        $queryExpected_Salary  = "SELECT * FROM expected_salary WHERE expected_salary='$exp_salary'";
        $stmt = $pdo->prepare($queryExpected_Salary);
        $stmt->execute();
        $expected_salary = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $insertSalary = "INSERT INTO expected_salary(expected_salary) VALUES('$exp_salary')";
            $stmt = $pdo->prepare($insertSalary);
            $stmt->execute();

            $expected_salary['message'] = 'Added Success';
        } else {
            $expected_salary['message'] = 'Already Add';
        }
        echo '{"result": ' . json_encode($expected_salary) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a update expected salary request

$app->post('/expectedsalary/update', function (Request $request, Response $reponse, array $args) {
    $salary_id = $request->getParam('id');
    $exp_salary = $request->getParam('expected_salary');
    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $expected_salary_Update = "UPDATE expected_salary SET expected_salary='$exp_salary' WHERE id='$salary_id'";
        $stmt = $pdo->prepare($expected_salary_Update);
        $stmt->execute();
        $status = '1';
        $salary_update['status'] = $status;
        $salary_update['message'] = 'Updated Successfully';

        echo '{"result": ' . json_encode($salary_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view expected salary request

$app->get('/expectedsalary/view', function (Request $request, Response $reponse, array $args) {
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM expected_salary";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $explist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a single view expected salary request

$app->get('/expectedsalary/view/{id}', function (Request $request, Response $reponse, array $args) {
    $salary_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $selectSalary = "SELECT * FROM expected_salary WHERE id='$salary_id'";
        $stmt = $pdo->prepare($selectSalary);
        $stmt->execute();
        $salarylist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete expected salary request

$app->get('/expectedsalary/delete/{id}', function (Request $request, Response $reponse, array $args) {
    $salary_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM expected_salary WHERE id='$salary_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $salary_list = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $salary_list['message'] = 'No More data';
        } else {
            $queryDelete_Salary = "DELETE FROM expected_salary WHERE id='$salary_id'";
            $stmt = $pdo->prepare($queryDelete_Salary);
            $stmt->execute();
            $salary_list['message'] = 'Remove the data Successfully';
        }
        echo '{"result": ' . json_encode($salary_list) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update status a expected salary request 

$app->get('/expectedsalary/status/{id}', function (Request $request, Response $reponse, array $args) {
    $salary_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM expected_salary WHERE id='$salary_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $salary_update = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['salary_status'] == "enable") {
            $queryUpdate_salary = "UPDATE expected_salary SET salary_status='disable' WHERE id='$salary_id'";
            $stmt = $pdo->prepare($queryUpdate_salary);
            $stmt->execute();
            $status = '0';
            $salary_update['status'] = $status;
            $salary_update['message'] = 'Status Disable';
        } else {
            $queryUpdate_salary = "UPDATE expected_salary SET salary_status='enable' WHERE id='$salary_id'";
            $stmt = $pdo->prepare($queryUpdate_salary);
            $stmt->execute();
            $status = '1';
            $salary_update['status'] = $status;
            $salary_update['message'] = 'Status Enable';
        }
        echo json_encode($salary_update);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//High Qualification

//make a add high qualification request
$app->post('/qualification/add', function (Request $request, Response $reponse, array $args) {
    $qualification = $request->getParam('high_qualification');
    
    try {
        //db object create 
        $db = new db();
        //connect the db
        $pdo = $db->connect();
        $insertQualification = "INSERT INTO qualification(high_qualification) VALUES('$qualification')";
        $stmt = $pdo->prepare($insertQualification);
        $stmt->execute();
        $quali = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        $quali['message'] = 'Added Success';
        echo '{"result": ' . json_encode($quali) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a update high qualification request

$app->post('/qualification/update', function (Request $request, Response $reponse, array $args) {
    $qualification_id = $request->getParam('id');
    $qualification = $request->getParam('high_qualification');
    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $qualification_update = "UPDATE qualification SET high_qualification='$qualification' WHERE id='$qualification_id'";
        $stmt = $pdo->prepare($qualification_update);
        $stmt->execute();
        $status = '1';
        $quali_update['status'] = $status;
        $quali_update['message'] = 'Updated Successfully';

        echo '{"result": ' . json_encode($quali_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view high qualification request

$app->get('/qualification/view', function (Request $request, Response $reponse, array $args) {
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM qualification";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $explist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a single view high qualification request

$app->get('/qualification/view/{id}', function (Request $request, Response $reponse, array $args) {
    $qualification_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $selectQualification = "SELECT * FROM qualification WHERE id='$qualification_id'";
        $stmt = $pdo->prepare($selectQualification);
        $stmt->execute();
        $salarylist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete high qualification request

$app->get('/qualification/delete/{id}', function (Request $request, Response $reponse, array $args) {
    $qualification_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM qualification WHERE id='$qualification_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $qualification_list = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $qualification_list['message'] = 'No More data';
        } else {
            $qualificationDelete = "DELETE FROM qualification WHERE id='$qualification_id'";
            $stmt = $pdo->prepare($qualificationDelete);
            $stmt->execute();
            $qualification_list['message'] = 'Remove the data Successfully';
        }
        echo '{"result": ' . json_encode($qualification_list) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update status a high qualification request 

$app->get('/qualification/status/{id}', function (Request $request, Response $reponse, array $args) {
    $qualification_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM qualification WHERE id='$qualification_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $qualification = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['qualification_status'] == "enable") {
            $queryUpdate_Qualification = "UPDATE qualification SET qualification_status='disable' WHERE id='$qualification_id'";
            $stmt = $pdo->prepare($queryUpdate_Qualification);
            $stmt->execute();
            $status = '0';
            $qualification['status'] = $status;
            $qualification['message'] = 'Status Disable';
        } else {
            $queryUpdate_Qualification = "UPDATE qualification SET qualification_status='enable' WHERE id='$qualification_id'";
            $stmt = $pdo->prepare($queryUpdate_Qualification);
            $stmt->execute();
            $status = '1';
            $qualification['status'] = $status;
            $qualification['message'] = 'Status Enable';
        }
        echo json_encode($qualification);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//Notice Period

//make a add notice period request
$app->post('/noticeperiod/add', function (Request $request, Response $reponse, array $args) {
    $notice_period = $request->getParam('notice_period');
    
    try {
        //db object create 
        $db = new db();
        //connect the db
        $pdo = $db->connect();
        $insertNotice_Period = "INSERT INTO notice_period(notice_period) VALUES('$notice_period')";
        $stmt = $pdo->prepare($insertNotice_Period);
        $stmt->execute();
        $noticelist['message'] = 'Added Success';
        $noticelist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // if (empty($count)) {
            
        // } else {
        //     $noticelist['message'] = 'Already Add';
        // }
        echo '{"result": ' . json_encode($noticelist) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a update notice period request

$app->post('/noticeperiod/update', function (Request $request, Response $reponse, array $args) {
    $notice_period_id = $request->getParam('id');
    $notice_period = $request->getParam('notice_period');
    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $noticeUpdate = "UPDATE notice_period SET notice_period='$notice_period' WHERE id='$notice_period_id'";
        $stmt = $pdo->prepare($noticeUpdate);
        $stmt->execute();
        $status = '1';
        $notice_update['status'] = $status;
        $notice_update['message'] = 'Updated Successfully';

        echo '{"result": ' . json_encode($notice_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view notice period request

$app->get('/noticeperiod/view', function (Request $request, Response $reponse, array $args) {
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM notice_period";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $noticelist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a single view notice period request

$app->get('/noticeperiod/view/{id}', function (Request $request, Response $reponse, array $args) {
    $notice_period_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $selectNotice = "SELECT * FROM notice_period WHERE id='$notice_period_id'";
        $stmt = $pdo->prepare($selectNotice);
        $stmt->execute();
        $noticelist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete notice period request

$app->get('/noticeperiod/delete/{id}', function (Request $request, Response $reponse, array $args) {
    $notice_period_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM notice_period WHERE id='$notice_period_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $notice_list = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $notice_list['message'] = 'No More data';
        } else {
            $noticeDelete = "DELETE FROM notice_period WHERE id='$notice_period_id'";
            $stmt = $pdo->prepare($noticeDelete);
            $stmt->execute();
            $notice_list['message'] = 'Remove the data Successfully';
        }
        echo '{"result": ' . json_encode($notice_list) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update status a notice period request 

$app->get('/noticeperiod/status/{id}', function (Request $request, Response $reponse, array $args) {
    $notice_period_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM notice_period WHERE id='$notice_period_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $notice_list = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['notice_status'] == "enable") {
            $queryUpdate_Notice = "UPDATE notice_period SET notice_status='disable' WHERE id='$notice_period_id'";
            $stmt = $pdo->prepare($queryUpdate_Notice);
            $stmt->execute();
            $status = '0';
            $notice_list['status'] = $status;
            $notice_list['message'] = 'Status Disable';
        } else {
            $queryUpdate_Notice = "UPDATE notice_period SET notice_status='enable' WHERE id='$notice_period_id'";
            $stmt = $pdo->prepare($queryUpdate_Notice);
            $stmt->execute();
            $status = '1';
            $notice_list['status'] = $status;
            $notice_list['message'] = 'Status Enable';
        }
        echo json_encode($notice_list);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// Preferred Location

//make a add preferred location request
$app->post('/location/add', function (Request $request, Response $reponse, array $args) {
    $pre_location = $request->getParam('location');
    
    try {
        //db object create 
        $db = new db();
        //connect the db
        $pdo = $db->connect();
        $queryPre_Location  = "SELECT * FROM preferred_location WHERE location='$pre_location'";
        $stmt = $pdo->prepare($queryPre_Location);
        $stmt->execute();
        $locationlist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $insertPreLocation = "INSERT INTO preferred_location(location) VALUES('$pre_location')";
            $stmt = $pdo->prepare($insertPreLocation);
            $stmt->execute();

            $locationlist['message'] = 'Added Success';
        } else {
            $locationlist['message'] = 'Already Add';
        }
        echo '{"result": ' . json_encode($locationlist) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a update preferred location request

$app->post('/location/update', function (Request $request, Response $reponse, array $args) {
    $pre_location_id = $request->getParam('id');
    $pre_location = $request->getParam('location');
    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $locationUpdate = "UPDATE preferred_location SET location='$pre_location' WHERE id='$pre_location_id'";
        $stmt = $pdo->prepare($locationUpdate);
        $stmt->execute();
        $status = '1';
        $location_update['status'] = $status;
        $location_update['message'] = 'Updated Successfully';

        echo '{"result": ' . json_encode($location_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view preferred location request

$app->get('/location/view', function (Request $request, Response $reponse, array $args) {
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM preferred_location";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $locationlist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a single view preferred location request

$app->get('/location/view/{id}', function (Request $request, Response $reponse, array $args) {
    $pre_location_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $selectLocation = "SELECT * FROM preferred_location WHERE id='$pre_location_id'";
        $stmt = $pdo->prepare($selectLocation);
        $stmt->execute();
        $locationlist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete preferred location request

$app->get('/location/delete/{id}', function (Request $request, Response $reponse, array $args) {
    $pre_location_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM preferred_location WHERE id='$pre_location_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $location_list = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $location_list['message'] = 'No More data';
        } else {
            $locationDelete = "DELETE FROM preferred_location WHERE id='$pre_location_id'";
            $stmt = $pdo->prepare($locationDelete);
            $stmt->execute();
            $location_list['message'] = 'Remove the data Successfully';
        }
        echo '{"result": ' . json_encode($location_list) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update status a preferred location request 

$app->get('/location/status/{id}', function (Request $request, Response $reponse, array $args) {
    $pre_location_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM preferred_location WHERE id='$pre_location_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $location_list = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['notice_status'] == "enable") {
            $queryUpdate_Location = "UPDATE preferred_location SET notice_status='disable' WHERE id='$pre_location_id'";
            $stmt = $pdo->prepare($queryUpdate_Location);
            $stmt->execute();
            $status = '0';
            $location_list['status'] = $status;
            $location_list['message'] = 'Status Disable';
        } else {
            $queryUpdate_Location = "UPDATE preferred_location SET notice_status='enable' WHERE id='$pre_location_id'";
            $stmt = $pdo->prepare($queryUpdate_Location);
            $stmt->execute();
            $status = '1';
            $location_list['status'] = $status;
            $location_list['message'] = 'Status Enable';
        }
        echo json_encode($location_list);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// Age Api

//make a add age request
$app->post('/age/add', function (Request $request, Response $reponse, array $args) {
    $age = $request->getParam('age');
    
    try {
        //db object create 
        $db = new db();
        //connect the db
        $pdo = $db->connect();
        $queryAge  = "SELECT * FROM age WHERE age='$age'";
        $stmt = $pdo->prepare($queryAge);
        $stmt->execute();
        $agelist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $insertAge = "INSERT INTO age(age) VALUES('$age')";
            $stmt = $pdo->prepare($insertAge);
            $stmt->execute();

            $agelist['message'] = 'Added Success';
        } else {
            $agelist['message'] = 'Already Add';
        }
        echo '{"result": ' . json_encode($agelist) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a update age request

$app->post('/age/update', function (Request $request, Response $reponse, array $args) {
    $age_id = $request->getParam('id');
    $age = $request->getParam('age');
    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $ageUpdate = "UPDATE age SET age='$age' WHERE id='$age_id'";
        $stmt = $pdo->prepare($ageUpdate);
        $stmt->execute();
        $status = '1';
        $age_update['status'] = $status;
        $age_update['message'] = 'Updated Successfully';

        echo '{"result": ' . json_encode($age_update) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a view age request

$app->get('/age/view', function (Request $request, Response $reponse, array $args) {
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM age";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $agelist = array();
        $count = $stmt->fetchAll(PDO::FETCH_OBJ);
        echo '{"result": ' . json_encode($count) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

// make a single view age request

$app->get('/age/view/{id}', function (Request $request, Response $reponse, array $args) {
    $age_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $selectQueryAge = "SELECT * FROM age WHERE id='$age_id'";
        $stmt = $pdo->prepare($selectQueryAge);
        $stmt->execute();
        $agelist = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($count);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make a delete age request

$app->get('/age/delete/{id}', function (Request $request, Response $reponse, array $args) {
    $age_id = $request->getAttribute('id');
    try {
        //db object create
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM age WHERE id='$age_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $age_list = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($count)) {
            $age_list['message'] = 'No More data';
        } else {
            $ageDelete = "DELETE FROM age WHERE id='$age_id'";
            $stmt = $pdo->prepare($ageDelete);
            $stmt->execute();
            $age_list['message'] = 'Remove the data Successfully';
        }
        echo '{"result": ' . json_encode($age_list) . '}';
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//make update status a age request 

$app->get('/age/status/{id}', function (Request $request, Response $reponse, array $args) {
    $age_id = $request->getAttribute('id');

    try {
        //create db object 
        $db = new db();
        //connect
        $pdo = $db->connect();
        $querySelect = "SELECT * FROM age WHERE id='$age_id'";
        $stmt = $pdo->prepare($querySelect);
        $stmt->execute();
        $age_list = array();
        $count = $stmt->fetch(PDO::FETCH_ASSOC);
        // echo $count['category_status'];

        if ($count['age_status'] == "enable") {
            $queryUpdate_Age = "UPDATE age SET age_status='disable' WHERE id='$age_id'";
            $stmt = $pdo->prepare($queryUpdate_Age);
            $stmt->execute();
            $status = '0';
            $age_list['status'] = $status;
            $age_list['message'] = 'Status Disable';
        } else {
            $queryUpdate_Age = "UPDATE age SET age_status='enable' WHERE id='$age_id'";
            $stmt = $pdo->prepare($queryUpdate_Age);
            $stmt->execute();
            $status = '1';
            $age_list['status'] = $status;
            $age_list['message'] = 'Status Enable';
        }
        echo json_encode($age_list);
        $pdo = null;
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

$app->run();