INSERT INTO favorite_tracks(userid, track_id)
VALUES($1, $2)
RETURNING *;