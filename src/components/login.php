<?php
header("Access-Control-Allow-Origin: *"); // أو حدد نطاق React: http://localhost:3000
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// الاتصال بقاعدة البيانات
$conn = new mysqli("myDB", "username", "password", "car_rental");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "Database connection failed"]);
    exit;
}

// قراءة البيانات القادمة من React
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(["message" => "Missing email or password"]);
    exit;
}

$email = $conn->real_escape_string($data->email);
$password = $data->password;

// الاستعلام عن المستخدم
$query = "SELECT * FROM username WHERE email = '$email'";
$result = $conn->query($query);

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    
    // تحقق من كلمة المرور
    if (password_verify($password, $username['password'])) {
        echo json_encode(["message" => "Login successful", "user_id" => $user['id']]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Invalid password"]);
    }
} else {
    http_response_code(401);
    echo json_encode(["message" => "User not found"]);
}

$conn->close();
?>