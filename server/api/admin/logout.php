<?php
require_once __DIR__ . '/../../lib/admin.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Allow: POST'); errorResponse(405, 'METHOD_NOT_ALLOWED', 'This request method is not allowed.'); }
requireAdmin(); requireCsrf(); $_SESSION=[]; session_destroy(); successResponse(200, ['loggedOut' => true]);
