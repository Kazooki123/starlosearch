<?php
    $db_file = 'users.db';

    try {
        $pdo = new PDO("sqlite:$db_file");

        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        return $pdo;
    } catch (PDOException $e) {
        echo 'Connection to SQLite database failed: '.$e->getMessage().'('.$e->getCode().')';

        return null;
    }
?>