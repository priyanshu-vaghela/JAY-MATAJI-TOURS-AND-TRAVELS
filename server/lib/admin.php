<?php
require_once __DIR__ . '/../api/bootstrap.php';

function adminSessionStart() {
    if (session_status() === PHP_SESSION_NONE) {
        session_name('jay_mataji_admin');
        session_set_cookie_params(['httponly' => true, 'samesite' => 'Strict', 'secure' => (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')]);
        session_start();
    }
}
function requireAdmin() { adminSessionStart(); if (empty($_SESSION['admin_id'])) errorResponse(401, 'UNAUTHENTICATED', 'Please sign in to continue.'); return (int) $_SESSION['admin_id']; }
function adminCsrf() { adminSessionStart(); if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32)); return $_SESSION['csrf']; }
function requireCsrf() { adminSessionStart(); $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? ''; if (!hash_equals($_SESSION['csrf'] ?? '', $token)) errorResponse(403, 'CSRF_FAILED', 'Your session could not be verified. Please sign in again.'); }
