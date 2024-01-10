const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  getPlaylist = async (playlistId) => {
    const query = {
      text: `SELECT playlists.*, users.username FROM playlists
      LEFT JOIN users ON users.id = playlists.owner
      WHERE playlists.id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  };
}

module.exports = PlaylistsService;
