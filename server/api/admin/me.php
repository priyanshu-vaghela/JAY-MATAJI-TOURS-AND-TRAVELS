<?php
require_once __DIR__ . '/../../lib/admin.php';
if ($_SERVER['REQUEST_METHOD'] !== 'GET') { header('Allow: GET'); errorResponse(405, 'METHOD_NOT_ALLOWED', 'This request method is not allowed.'); }
requireAdmin(); successResponse(200, ['username' => $_SESSION['admin_username'], 'csrfToken' => adminCsrf()]);
