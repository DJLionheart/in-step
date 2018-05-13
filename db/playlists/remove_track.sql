DELETE FROM playlist_tracks
WHERE playlist_id = $1 AND track_num = $2;