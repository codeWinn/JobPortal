<?php

use \Psr\Http\Message\ResponseInterface as Response;
use \Psr\Http\Message\ServerRequestInterface as Request;


use Slim\Http\UploadedFile;
$app = new \Slim\App;
$container = $app->getContainer();
$container['upload_directory'] = __DIR__ . '/upload';


$app->get('/', function (Request $request, Response $reponse) {
    echo 'upload user working ';
});



//make a super_admin register request

// add seller product
$app->post('/upload', function (Request $request, Response $reponse, array $args) {
    $seller_no = $request->getParam('seller_no');
  
    try {
        //get db object
        $db = new db();
        //conncect
        $pdo = $db->connect();
         $directory = $this->get('upload_directory');
        
            $uploadedFiles = $request->getUploadedFiles();
         // handle single input with single file upload
            $uploadedFile4 = $uploadedFiles['profile_image'];
            
            if ($uploadedFile4->getError() === UPLOAD_ERR_OK) {
                $filename4 = moveUploadedFile4($directory, $uploadedFile4);
            }
                    $status="1";
                    $uploadImg["status"]=$status;
                    $uploadImg["message"]='uploaded Added';
                    echo '{"resp": ' . json_encode($uploadImg) . '}';
    } catch (\PDOException $e) {
        echo '{"error": {"text": ' . $e->getMessage() . '}}';
    }
});

//move image function for registration
function moveUploadedFile4($directory, UploadedFile $uploadedFile4)
{
    $extension = pathinfo($uploadedFile4->getClientFilename(), PATHINFO_EXTENSION);
    $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
    $filename4= sprintf('%s.%0.8s', $basename, $extension);

    $uploadedFile4->moveTo($directory . DIRECTORY_SEPARATOR . $filename4);

    return $filename4;
}
//get product info using fld_seo_url 

$app->run();
