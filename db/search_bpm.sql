SELECT * FROM song_data
WHERE bpm BETWEEN $1 AND $2
ORDER BY track_name;