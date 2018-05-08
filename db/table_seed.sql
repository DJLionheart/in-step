
CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    auth_id INTEGER NOT NULL,
    profile_pic TEXT,
    username VARCHAR(60),
    profile_url TEXT,
    user_email VARCHAR(60),
    access_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS song_data (
    track_id SERIAL PRIMARY KEY,
    artist_name VARCHAR(100) NOT NULL,
    track_name VARCHAR(100) NOT NULL,
    track_mix VARCHAR(100),
    BPM INTEGER NOT NULL,
    track_genre VARCHAR(25),
    track_year INTEGER,
    spotify_id VARCHAR(60)
    
);

CREATE TABLE IF NOT EXISTS playlist_data (
    playlist_id SERIAL PRIMARY KEY,
    userid SERIAL REFERENCES users(userid),
    playlist_name VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS playlist_tracks (
    playlist_id SERIAL REFERENCES playlist_data(playlist_id),
    track_id SERIAL REFERENCES song_data(track_id)
);

CREATE TABLE IF NOT EXISTS favorite_tracks(
    userid SERIAL REFERENCES users(userid),
    track_id SERIAL REFERENCES song_data(track_id)
);

CREATE TABLE IF NOT EXISTS genre_preferences(
    userid SERIAL REFERENCES users(userid),
    genre_name VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS user_pace(
    userid SERIAL REFERENCES users(userid),
    pace VARCHAR(25) NOT NULL
);

--------------- RESET

DROP TABLE favorite_tracks;
DROP TABLE playlist_tracks;
DROP TABLE playlist_data;
DROP TABLE genre_preferences;
DROP TABLE users;

