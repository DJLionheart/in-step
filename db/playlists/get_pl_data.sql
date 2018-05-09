SELECT * from playlist_data
WHERE userid = $1
ORDER BY playlist_id;