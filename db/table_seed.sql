
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    auth_id TEXT NOT NULL,
    profile_pic TEXT,
    user_name VARCHAR(60)
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
    user_id INTEGER REFERENCES users(user_id),
    playlist_name VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS playlist_tracks (
    playlist_id INTEGER REFERENCES playlist_data(playlist_id),
    track_id INTEGER REFERENCES song_data(track_id)
);

CREATE TABLE IF NOT EXISTS favorite_tracks(
    user_id INTEGER REFERENCES users(user_id),
    track_id INTEGER REFERENCES song_data(track_id)
);