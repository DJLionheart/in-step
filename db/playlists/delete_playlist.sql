DELETE FROM playlist_tracks
WHERE playlist_id = $1;

DELETE FROM playlist_data
WHERE playlist_id = $1;