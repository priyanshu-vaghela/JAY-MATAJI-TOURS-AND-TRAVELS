<?php
/**
 * Admin Account Seeder Script
 *
 * Usage:
 *   php server/scripts/seed-admin.php <username> <password>
 * Example:
 *   php server/scripts/seed-admin.php admin SecretPassword123
 */

require_once __DIR__ . '/../api/bootstrap.php';

$username = isset($argv[1]) ? trim($argv[1]) : 'admin';
$password = isset($argv[2]) ? (string) $argv[2] : 'JayMataji@2026';

if (empty($username) || empty($password)) {
    echo "Usage: php server/scripts/seed-admin.php <username> <password>\n";
    exit(1);
}

try {
    $db = getDatabaseConnection();

    // Ensure admins table exists
    $db->query("CREATE TABLE IF NOT EXISTS admins (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(120) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      last_login_at TIMESTAMP NULL DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    $hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $db->prepare("INSERT INTO admins (username, password_hash, is_active)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash), is_active = 1");
    $stmt->bind_param('ss', $username, $hash);
    $stmt->execute();

    echo "Successfully seeded admin account:\n";
    echo "  Username: {$username}\n";
    echo "  Password: {$password}\n";
    echo "Sign in at: /admin\n";
} catch (Throwable $e) {
    echo "Error seeding admin: " . $e->getMessage() . "\n";
    exit(1);
}
