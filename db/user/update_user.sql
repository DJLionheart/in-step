UPDATE users
SET access_token = $2,
refresh_token = $3
WHERE auth_id = $1;