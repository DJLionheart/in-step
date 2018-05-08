SELECT pd.playlist_id, playlist_name, track_num, sd.track_id, artist_name, track_name, bpm, track_genre, track_year FROM playlist_data pd 
JOIN playlist_tracks pt
ON pd.playlist_id = pt.playlist_id
JOIN song_data sd
ON sd.track_id = pt.track_id
WHERE userid = $1
ORDER BY pd.playlist_id, track_num;