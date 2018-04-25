INSERT INTO users
(user_name, profile_pic, auth_id)
VALUES
($1, $2, $3)
RETURNING *;