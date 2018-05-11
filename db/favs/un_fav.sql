DELETE FROM favorite_tracks
WHERE userid = $1 AND track_id = $2;