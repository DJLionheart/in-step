SELECT sd.track_id, artist_name, track_name, bpm, track_genre, track_year FROM song_data sd  
JOIN favorite_tracks ft
ON sd.track_id = ft.track_id
WHERE userid = $1
ORDER BY track_name;