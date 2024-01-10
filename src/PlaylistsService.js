const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  getPlaylist = async (playlistId) => {
    const songQuery = {
      text: `SELECT songs.id, songs.title, songs.performer FROM playlist_songs
      LEFT JOIN songs ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };
    const songs = await this._pool.query(songQuery);

    const playlistQuery = {
      text: `SELECT playlists.id, playlists.name FROM playlists
      WHERE playlists.id = $1`,
      values: [playlistId],
    };
    const playlistResult = await this._pool.query(playlistQuery);
    return {
      ...playlistResult.rows[0],
      songs: songs.rows,
    };
  };
}

module.exports = PlaylistsService;
