INSERT INTO playlist_data(userid, playlist_name)
VALUES( $1, $2)
RETURNING playlist_name, playlist_id;