
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
    artist_name VARCHAR(60) NOT NULL,
    track_name VARCHAR(60) NOT NULL,
    BPM INTEGER NOT NULL,
    track_genre VARCHAR(25),
    preview_url TEXT
);

CREATE TABLE IF NOT EXISTS playlist_data (
    playlist_id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(userid),
    playlist_name VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS playlist_tracks (
    playlist_id INTEGER REFERENCES playlist_data(playlist_id),
    track_id INTEGER REFERENCES song_data(track_id)
);

CREATE TABLE IF NOT EXISTS favorite_tracks(
    userid INTEGER REFERENCES users(userid),
    track_id INTEGER REFERENCES song_data(track_id)
);

CREATE TABLE IF NOT EXISTS genre_preferences(
    userid INTEGER REFERENCES users(userid),
    genre_name VARCHAR(25) NOT NULL
);

--------------- RESET

DROP TABLE favorite_tracks;
DROP TABLE playlist_tracks;
DROP TABLE playlist_data;
DROP TABLE users;

