INSERT INTO users
(username, profile_pic, auth_id, profile_url, user_email, user_account)
VALUES
($1, $2, $3, $4, $5, $6)
RETURNING *;