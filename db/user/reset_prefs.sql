DELETE FROM genre_preferences
WHERE userid = $1;

DELETE FROM user_pace
WHERE userid = $1;