import { useState } from "react";
import { useMusic } from "../contexts/MusicContext";

export const Playlists = () => {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    playlists,
    createPlaylist,
    allSongs,
    addSongToPlaylist,
    songIndex,
    handlePlaySong,
    deletePlaylist,
  } = useMusic();

  const HandleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName);
      setNewPlaylistName("");
    }
  };

  const filteredSongs = allSongs.filter((song) => {
    const matched =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());

    const alreadyInPlaylist = selectedPlaylist?.songs.some(
      (s) => s.id === song.id,
    );

    return matched && !alreadyInPlaylist;
  });

  const handleAddSongToPlayList = (song) => {
    if (selectedPlaylist) {
      addSongToPlaylist(song, selectedPlaylist.id);
      setSearchQuery("");
      setShowDropdown(false);
    }
  };

  const handlePlaySongFromPlaylist = (song) => {
    const songIndex = allSongs.findIndex((s) => s.id === song.id);
    handlePlaySong(song, songIndex);
  };

  const deletePlaylistConfirmation = (playlist) => {
    if (window.confirm(`Are you sure you want delete this ${playlist.name}`)) {
      deletePlaylist(playlist.id);
    }
  };

  return (
    <div className="playlists">
      <h2>Playlists</h2>

      {/* Create a playlist section */}
      <div className="create-playlist">
        <h3>Create a Playlist</h3>

        <div className="playlist-form">
          <input
            type="text"
            placeholder="Playlist Name..."
            onChange={(e) => setNewPlaylistName(e.target.value)}
            value={newPlaylistName}
            className="playlist-input"
          />

          <button className="create-btn" onClick={HandleCreatePlaylist}>
            Create Playlist
          </button>
        </div>
      </div>

      {/* Display existing playlists */}
      <div className="playlist-list">
        {playlists.length === 0 ? (
          <p className="empty-message">No playlists created yet.</p>
        ) : (
          playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-item">
              <div className="playlist-header">
                <h3>{playlist.name}</h3>

                <div className="playlist-actions">
                  <button
                    className="delete-playlist-btn"
                    onClick={() => deletePlaylistConfirmation(playlist)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Add song search */}
              <div className="add-song-section">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search songs..."
                    value={
                      selectedPlaylist?.id === playlist.id ? searchQuery : ""
                    }
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedPlaylist(playlist);
                      setShowDropdown(e.target.value.length > 0);
                    }}
                    onFocus={(e) => {
                      setSelectedPlaylist(playlist);
                      setShowDropdown(e.target.value.length > 0);
                    }}
                    className="song-search-input"
                  />
                </div>
              </div>

              {/* Dropdown */}
              {showDropdown && selectedPlaylist?.id === playlist.id && (
                <div className="dropdown">
                  {filteredSongs.length === 0 ? (
                    <div className="dropdown-item no-results">
                      No songs found.
                    </div>
                  ) : (
                    filteredSongs.slice(0, 5).map((song) => (
                      <div
                        key={song.id}
                        className="dropdown-item"
                        onClick={() => handleAddSongToPlayList(song, playlist)}
                      >
                        <span className="song-title">{song.title}</span>

                        <span className="song-artist">{song.artist}</span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Display songs in the playlist */}
              <div className="playlist-songs">
                {playlist.songs.length === 0 ? (
                  <p className="empty-message">No songs in this playlist.</p>
                ) : (
                  playlist.songs.map((song, key) => (
                    <div
                      key={key}
                      className={`playlist-song ${songIndex === allSongs.findIndex((s) => s.id === song.id) ? "active" : ""}`}
                      onClick={() => handlePlaySongFromPlaylist(song)}
                    >
                      <div className="song-info">
                        <span className="song-title">{song.title}</span>
                        <span className="song-artist">{song.artist}</span>
                      </div>
                      <span className="song-duration">{song.duration}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
