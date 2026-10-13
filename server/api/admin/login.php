<?php
require_once __DIR__ . '/../../lib/admin.php';
$input = requireJsonRequest(); $username = cleanText($input['username'] ?? '', 120); $password = (string) ($input['password'] ?? '');
if ($username === '' || $password === '') errorResponse(422, 'VALIDATION_ERROR', 'Enter your username and password.');
try { $db = getDatabaseConnection(); $s = $db->prepare('SELECT id, username, password_hash FROM admins WHERE username = ? AND is_active = 1 LIMIT 1'); $s->bind_param('s', $username); $s->execute(); $admin = $s->get_result()->fetch_assoc();
if (!$admin || !password_verify($password, $admin['password_hash'])) { usleep(300000); errorResponse(401, 'INVALID_CREDENTIALS', 'The username or password is not correct.'); }
adminSessionStart(); session_regenerate_id(true); $_SESSION['admin_id'] = (int) $admin['id']; $_SESSION['admin_username'] = $admin['username']; $csrf = adminCsrf(); $update=$db->prepare('UPDATE admins SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?'); $update->bind_param('i', $admin['id']); $update->execute(); successResponse(200, ['username' => $admin['username'], 'csrfToken' => $csrf]);
} catch (Throwable $e) { error_log('Admin login failed: '.$e->getMessage()); errorResponse(500, 'SERVICE_UNAVAILABLE', 'The service is temporarily unavailable.'); }
