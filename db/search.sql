SELECT * FROM song_data
WHERE LOWER($1) LIKE LOWER($2)
ORDER BY $1;