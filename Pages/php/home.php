<?php
session_start();

include 'database.php';

$id = $_SESSION['id'];

$sql = $pdo->prepare('SELECT * FROM users WHERE id = :id');
$sql->execute(array('id' => $id));

$user = $sql->fetch();

if ($user) {
    echo '<h2>Welcome to Starlosearch</h2>';
    echo '<p><b>Welcome</b>'.$user['username'].', You are now logged in.</p>';
    echo '<p>Username: '.$user['username'].'</p>';
    echo '<p>Email:'.$user['email'].'</p>';
    echo '<p>First Name:'.$user['fname'].'</p>';
    echo '<p>Last Name:'.$user['lname'].'</p>';
    echo '<p>Mobile:'.$user['mobile'].'</p>';
    echo '<p>Address:'.$user['address'].'</p>';
    echo '<p>Country:'.$user['country'].'</p>';
    echo '<div class="text-center">Want to leave the page? <br><a href="logout.php">Logout</a></div>';
} else {
    echo '<p>No user found with id:'.$id.'</p>';
}
?>