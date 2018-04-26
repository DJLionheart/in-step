UPDATE song_data
SET spotify_id = $2
WHERE track_id = $1;