SELECT * FROM playlist_data pd 
JOIN playlist_tracks pt
ON pd.playlist_id = pt.playlist_id
WHERE userid = $1;