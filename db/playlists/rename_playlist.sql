UPDATE playlist_data
SET playlist_name = $1
WHERE playlist_id = $2;
RETURNING *;